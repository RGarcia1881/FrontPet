import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  FC,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login as apiLogin,
  register as apiRegister,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../api/auth";
// ⭐️ IMPORTAMOS LA NUEVA FUNCIÓN y tipo de datos de perfil desde user.ts
import { getUserById, UserProfileData, getCurrentUser } from "../api/users";
import { setAuthToken } from "../api/api";

// =========================================================================
// 1. TIPOS Y CONSTANTES
// =========================================================================

/**
 * Define la estructura del usuario logueado.
 */
export interface UserProfile extends UserProfileData {} // Usamos el tipo de user.ts

/**
 * Define la forma de los valores y funciones disponibles en el contexto.
 */
export interface IAuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

// Claves para almacenar los tokens.
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ID_KEY = "userId"; // ⭐️ Clave para guardar el ID del usuario

// Create the AuthContext
export const AuthContext = createContext<IAuthContextValue | undefined>(
  undefined
);

// =========================================================================
// 2. EL PROVEEDOR DE AUTENTICACIÓN (AuthProvider)
// =========================================================================

/**
 * Función auxiliar para parsear y dar formato a los mensajes de error del backend.
 */
// Reemplaza completamente la función parseAuthError:
const parseAuthError = (error: any): string => {
  console.log("Raw error in parseAuthError:", error);

  // Si ya es un string, devuélvelo
  if (typeof error === "string") {
    return error;
  }

  // Si es un objeto Error con message
  if (error instanceof Error) {
    // Intenta parsear el mensaje como JSON
    try {
      const errorData = JSON.parse(error.message);

      // Caso 1: El backend devolvió un objeto con campo 'error'
      if (errorData?.error) {
        return errorData.error;
      }

      // Caso 2: El backend devolvió errores de validación por campo
      // Ej: {"email": ["Este campo es requerido"]}
      for (const key in errorData) {
        if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
            errorData[key][0]
          }`;
        }
      }

      // Caso 3: El backend devolvió un mensaje en campo 'message'
      if (errorData?.message) {
        return errorData.message;
      }

      // Si no se pudo extraer un mensaje claro, devolver el stringify
      return JSON.stringify(errorData);
    } catch {
      // Si no es JSON, devolver el mensaje del error
      return error.message || "Error desconocido";
    }
  }

  // Si error.response existe (axios error)
  if (error.response) {
    const { data, status } = error.response;
    console.log("Axios error response:", { data, status });

    if (status === 401) {
      return "Credenciales inválidas. Verifica tu email y contraseña.";
    }

    if (status === 400) {
      // Intenta extraer mensajes de error del backend
      if (data?.error) return data.error;
      if (data?.message) return data.message;

      // Para errores de validación de Django/DRF
      if (typeof data === "object") {
        const messages: string[] = [];

        for (const key in data) {
          if (Array.isArray(data[key])) {
            messages.push(`${key}: ${data[key][0]}`);
          } else if (typeof data[key] === "string") {
            messages.push(data[key]);
          }
        }

        if (messages.length > 0) {
          return messages.join(", ");
        }
      }
    }

    if (status === 500) {
      return "Error interno del servidor. Intenta más tarde.";
    }

    if (status === 0 || !status) {
      return "No se pudo conectar con el servidor. Verifica tu conexión.";
    }

    return `Error ${status}: ${JSON.stringify(data)}`;
  }

  // Si error.request existe pero no hay response (problema de red)
  if (error.request) {
    console.log("Network error:", error.message);
    return "Error de conexión. Verifica tu red e intenta de nuevo.";
  }

  // Error genérico
  return "Error desconocido al procesar la solicitud.";
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error actualizando datos del usuario:", error);
    }
  };

  // --- Helpers ---

  /**
   * Helper para limpiar la sesión (tokens, ID y usuario)
   */
  const handleSignOut = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        USER_ID_KEY,
      ]);
      setAuthToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setUser(null);
    }
  }, []);

  /**
   * Helper para guardar tokens y el ID en almacenamiento y establecer el token en Axios.
   */
  const saveAndSetAuthData = async (
    accessToken: string,
    refreshToken: string,
    userId: number
  ) => {
    try {
      await AsyncStorage.multiSet([
        [ACCESS_TOKEN_KEY, accessToken],
        [REFRESH_TOKEN_KEY, refreshToken],
        [USER_ID_KEY, String(userId)], // Guardamos el ID como string
      ]);
      setAuthToken(accessToken);
    } catch (error) {
      console.error("Error al guardar datos de autenticación:", error);
      throw error;
    }
  };

  /**
   * Helper para obtener el perfil completo usando el ID del usuario.
   * @param userId El ID del usuario a buscar.
   */
  const fetchAndSetUserProfile = async (userId: number) => {
    try {
      // ⭐️ Utilizamos la función getUsersById que usa la ruta /users/{id}/
      const profile = await getUserById(userId);
      setUser(profile);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      // Si falla el perfil, limpiamos la sesión
      await handleSignOut();
      // Lanzamos un error más específico
      throw new Error(
        "Credenciales correctas, pero error al cargar el perfil del usuario. Por favor, intente de nuevo."
      );
    }
  };

  // --- Carga de Sesión ---

  // Carga la sesión al iniciar la aplicación
  const loadSession = useCallback(async () => {
    try {
      const authData = await AsyncStorage.multiGet([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        USER_ID_KEY, // Obtenemos el ID guardado
      ]);

      const accessToken = authData.find(
        ([key]) => key === ACCESS_TOKEN_KEY
      )?.[1];
      const userIdString = authData.find(([key]) => key === USER_ID_KEY)?.[1];
      const userId = userIdString ? parseInt(userIdString, 10) : null;

      if (accessToken && userId) {
        setAuthToken(accessToken);
        // ⭐️ Usamos el ID guardado para cargar el perfil
        await fetchAndSetUserProfile(userId);
      } else {
        await handleSignOut(); // Si falta algún dato, limpiamos
      }
    } catch (e) {
      console.error("Error al cargar la sesión:", e);
      await handleSignOut();
    } finally {
      setIsLoading(false);
    }
  }, [handleSignOut]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // --- Lógica de Autenticación (Login y Registro) ---

  const processAuthResponse = async ({
    access,
    refresh,
    user_id,
  }: AuthResponse) => {
    // 1. Guardar tokens y ID
    await saveAndSetAuthData(access, refresh, user_id);

    // 2. Obtener el perfil completo usando el ID
    await fetchAndSetUserProfile(user_id);
  };

  // --- Inicio de Sesión ---
  const signIn = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(credentials);
      await processAuthResponse(response);
    } catch (error: any) {
      // No hacemos signOut aquí para que el error de login se propague correctamente
      throw new Error(parseAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // --- Registro ---
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await apiRegister(data);
      await processAuthResponse(response);
    } catch (error: any) {
      // No hacemos signOut aquí para que el error de registro se propague correctamente
      throw new Error(parseAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // Memoización del valor del contexto
  const value = useMemo<IAuthContextValue>(
    () => ({
      user,
      // Consideramos autenticado si tenemos el objeto usuario y campos clave
      isAuthenticated: !!user && !!user.first_name,
      isLoading,
      signIn,
      signOut: handleSignOut,
      register,
      refreshUser,
    }),
    [user, isLoading, handleSignOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =========================================================================
// 3. EL HOOK CONSUMIDOR (useAuth)
// =========================================================================

/**
 * Hook para acceder a los valores del contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

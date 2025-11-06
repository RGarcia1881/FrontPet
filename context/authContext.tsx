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
import { getUserById, UserProfileData } from "../api/users";
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
const parseAuthError = (e: any): string => {
  try {
    // Si la respuesta es una instancia de Error pero contiene datos JSON
    const errorData = JSON.parse(e.message);

    if (errorData?.error) {
      return errorData.error;
    }

    // Busca errores a nivel de campo (ej: email: ["Este campo es requerido"])
    for (const key in errorData) {
      if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
        return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
          errorData[key][0]
        }`;
      }
    }

    return "Error desconocido al procesar la solicitud.";
  } catch {
    // Si no se pudo parsear el JSON
    return "Error de conexión o formato de respuesta inesperado.";
  }
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

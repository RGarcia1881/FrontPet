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
// Importaciones de las funciones de API y Axios Helper
import {
  login as apiLogin,
  register as apiRegister,
  LoginCredentials,
  RegisterData,
} from "../api/auth";
import { setAuthToken } from "../api/api";

// =========================================================================
// 1. TIPOS Y CONSTANTES
// =========================================================================

/**
 * Define la estructura del usuario logueado.
 */
export interface UserProfile {
  id: number; // Su backend devuelve user_id como número
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

/**
 * Define la forma de los valores y funciones disponibles en el contexto.
 */
export interface IAuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>; // Ajustamos para usar LoginCredentials
  signOut: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>; // Ajustamos para usar RegisterData
}

// Claves para almacenar los tokens.
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

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
    // Asumimos que los errores del backend vienen como JSON stringificado
    const errorData = JSON.parse(e.message);

    // Error de credenciales inválidas (login)
    if (errorData?.error) {
      return errorData.error;
    }

    // Errores de validación de campos (register)
    // Buscamos el primer error de cualquier campo conocido
    for (const key in errorData) {
      if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
        return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
          errorData[key][0]
        }`;
      }
    }

    return "Error desconocido al procesar la solicitud.";
  } catch {
    return "Error de conexión o formato de respuesta inesperado.";
  }
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper para guardar tokens en almacenamiento y en Axios
  const saveAndSetTokens = async (
    accessToken: string,
    refreshToken: string,
    userId: number,
    email: string
  ) => {
    try {
      await AsyncStorage.multiSet([
        [ACCESS_TOKEN_KEY, accessToken],
        [REFRESH_TOKEN_KEY, refreshToken],
      ]);
      // 🚨 IMPORTANTE: Establecer el token de acceso en Axios
      setAuthToken(accessToken);

      // Establecer el usuario logueado (solo con ID y email por ahora)
      setUser({ id: userId, email: email });
    } catch (error) {
      console.error("Error al guardar tokens:", error);
    }
  };

  // Carga la sesión al iniciar la aplicación (con useCallback para evitar re-render)
  const loadSession = useCallback(async () => {
    try {
      const tokens = await AsyncStorage.multiGet([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
      ]);
      const accessToken = tokens.find(([key]) => key === ACCESS_TOKEN_KEY)?.[1];

      if (accessToken) {
        // 🚨 IMPORTANTE: Establecer el token de acceso en Axios
        setAuthToken(accessToken);
        // NOTA: Como no podemos obtener el perfil completo, solo marcamos como logueado
        setUser({ id: -1, email: "Sesión cargada" });
      }
    } catch (e) {
      console.error("Error al cargar el token de autenticación:", e);
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencia vacía para que se ejecute solo una vez

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // --- Lógica de Inicio de Sesión (Conectado a la API) ---
  const signIn = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // 1. Llamada REAL a su backend
      const { access, refresh, user_id } = await apiLogin(credentials);

      // 2. Guardar tokens y establecer el estado del usuario
      await saveAndSetTokens(access, refresh, user_id, credentials.email);
    } catch (error: any) {
      // Manejo de errores de la API
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
      setAuthToken(null);
      setUser(null);
      // Lanzamos un error que el componente de Login pueda capturar
      throw new Error(parseAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // --- Lógica de Registro (Conectado a la API) ---
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // 1. Llamada REAL a su backend
      const { access, refresh, user_id } = await apiRegister(data);

      // 2. Guardar tokens y establecer el estado del usuario con la info completa
      await saveAndSetTokens(access, refresh, user_id, data.email);
      setUser({
        id: user_id,
        email: data.email,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    } catch (error: any) {
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
      setAuthToken(null);
      setUser(null);
      throw new Error(parseAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // --- Lógica de Cierre de Sesión ---
  const handleSignOut = async () => {
    try {
      // 1. Limpiar tokens y encabezado de Axios
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
      setAuthToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setUser(null);
    }
  };

  // Memoización del valor del contexto
  const value = useMemo<IAuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signOut: handleSignOut,
      register,
    }),
    [user, isLoading]
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

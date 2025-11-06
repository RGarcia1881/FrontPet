import API from './api';

// --- Definiciones de Tipos (TypeScript) ---

// ⭐️ NUEVA INTERFAZ: Los datos completos del perfil.
export interface UserProfileData {
    id: number; // El ID del usuario
    email: string;
    username?: string;
    first_name: string;
    last_name: string;
    image?: string | null; // URL de la imagen de perfil
}

// Tipo para la respuesta exitosa del servidor (SOLO TOKENS).
// ⭐️ MODIFICADO: Solo se esperan tokens y el ID del usuario.
export interface AuthResponse {
    user_id: number; 
    refresh: string;
    access: string;
}

// Interfaz para las credenciales básicas de Login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interfaz para los datos de Registro (coincidiendo con el modelo AbstractUser)
export interface RegisterData {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
}

// --- Funciones de API ---

/**
 * Endpoint para obtener el perfil completo del usuario autenticado.
 * ⭐️ NUEVA FUNCIÓN
 * @returns Promesa que resuelve en los datos completos del perfil.
 */
export const getProfile = async (): Promise<UserProfileData> => {
    // ⚠️ ATENCIÓN: Esta es una ruta común en Djoser o APIs REST.
    // Ajústela si su endpoint de perfil es diferente (ej: '/profile/')
    const res = await API.get('/users/me/'); 
    // DRF/Djoser a menudo devuelve el ID como 'id' aquí, no 'user_id'
    return res.data as UserProfileData;
}

/**
 * Llama al endpoint de Login para obtener los tokens de acceso.
 * @param credentials Email y contraseña del usuario.
 * @returns Promesa que resuelve en la respuesta (tokens y user_id).
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const res = await API.post('/auth/login/', credentials); 
  return res.data;
};

/**
 * Llama al endpoint de Registro.
 * @param data Todos los datos necesarios para crear un usuario.
 * @returns Promesa que resuelve en la respuesta (tokens y user_id).
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await API.post('/auth/register/', data);
  // Asumimos que el registro devuelve los tokens igual que el login
  return res.data; 
};

/**
 * Llama al endpoint para refrescar el token de acceso.
 * @param refresh_token El token de refresco guardado.
 * @returns Promesa que resuelve en un nuevo token de acceso.
 */
export const refreshToken = async (refresh: string): Promise<{ access: string }> => {
  const res = await API.post<{ access: string }>('/auth/token/refresh/', { refresh });
  return res.data;
};
import API from './api';

// --- Definiciones de Tipos (TypeScript) ---

// Tipo para la respuesta exitosa del servidor (incluye los tokens)
export interface AuthResponse {
    user_id: number; // Su vista de Django devuelve user_id
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
 * Llama al endpoint de Login para obtener los tokens de acceso.
 * [AJUSTE: Usamos '/auth/login/' en lugar de '/auth/token/']
 * @param credentials Email y contraseña del usuario.
 * @returns Promesa que resuelve en la respuesta completa (incluye tokens y user_id).
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // RUTA AJUSTADA para coincidir con el `LoginView` de Django
  const res = await API.post('/auth/login/', credentials); 
  return res.data;
};

/**
 * Llama al endpoint de Registro.
 * [AJUSTE: Usamos '/auth/register/' y los campos completos del usuario]
 * @param data Todos los datos necesarios para crear un usuario.
 * @returns Promesa que resuelve en la respuesta completa (incluye tokens y user_id).
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  // RUTA AJUSTADA para coincidir con el `RegisterView` de Django
  const res = await API.post('/auth/register/', data);
  return res.data; 
};

/**
 * Llama al endpoint para refrescar el token de acceso usando el token de refresco.
 * [AJUSTE: Si no está usando las URLs estándar de Simple JWT en Django, esta ruta debe ser revisada]
 * @param refresh_token El token de refresco guardado.
 * @returns Promesa que resuelve en un nuevo token de acceso.
 */
// **NOTA:** Si está usando Simple JWT para el refresh, la ruta `/auth/token/refresh/` es la estándar de Simple JWT. 
// Mantendremos esta ruta por ahora.
export const refreshToken = async (refresh: string): Promise<{ access: string }> => {
  const res = await API.post<{ access: string }>('/auth/token/refresh/', { refresh });
  return res.data;
};
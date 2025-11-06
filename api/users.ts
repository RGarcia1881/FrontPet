import API from './api';

// --- INTERFACES DE DATOS ---

/**
 * ⭐️ UserProfileData: La estructura de datos para el perfil completo.
 * Reemplaza 'RetrievedUser' para integrarse con AuthContext.
 * Si tu backend devuelve 'name' en lugar de 'first_name' y 'last_name',
 * deberás ajustar estos campos para que coincidan con la respuesta del servidor.
 */
export type UserProfileData = {
  id: number;
  email: string;
  username?: string; // Asegura que se incluya el username
  first_name: string; // Esperado por AuthContext
  last_name: string; // Esperado por AuthContext
  image?: string | null;
  // Añadir aquí otros campos que devuelva el backend (ej: is_active, date_joined, etc.)
};

// 2. Interfaz para la CREACIÓN de un usuario
export type UserCreatePayload = {
  name: string;
  email: string;
  password: string;
};

// 3. Interfaz para la ACTUALIZACIÓN de un usuario (todos los campos son opcionales)
export type UserUpdatePayload = {
  name?: string;
  email?: string;
  password?: string; // El password puede actualizarse de forma opcional
};

// --- FUNCIONES DE SERVICIO ---

/**
 * Obtener la lista de todos los usuarios.
 * @returns Promesa que resuelve en un array de usuarios (UserProfileData).
 */
export const getUsers = async (): Promise<UserProfileData[]> => {
  // Usamos la interfaz de perfil como tipo de retorno
  const res = await API.get('/users/');
  return res.data;
};

/**
 * Obtener un usuario por ID.
 * ⭐️ Esta es la función clave para obtener el perfil del usuario autenticado.
 * @param id El ID del usuario.
 * @returns Promesa que resuelve en un objeto de perfil (UserProfileData).
 */
export const getUserById = async (id: number): Promise<UserProfileData> => {
  const res = await API.get(`/users/${id}/`);
  return res.data;
};

/**
 * Crear un nuevo usuario (generalmente usado por rutas de administración).
 * @param data Los datos del nuevo usuario.
 * @returns Promesa que resuelve en el usuario creado.
 */
export const createUser = async (data: UserCreatePayload): Promise<UserProfileData> => {
  const res = await API.post('/users/', data);
  return res.data;
};

/**
 * Actualizar un usuario existente de forma parcial (PATCH).
 * @param id El ID del usuario.
 * @param data Los campos a actualizar (opcionales).
 * @returns Promesa que resuelve en el usuario actualizado.
 */
export const updateUser = async (id: number, data: UserUpdatePayload): Promise<UserProfileData> => {
  // Usamos PATCH por convención para actualizaciones parciales
  const res = await API.patch(`/users/${id}/`, data);
  return res.data;
};

/**
 * Eliminar un usuario.
 * @param id El ID del usuario a eliminar.
 * @returns Promesa que resuelve cuando la operación es exitosa (void).
 */
export const deleteUser = async (id: number): Promise<void> => {
  await API.delete(`/users/${id}/`);
};
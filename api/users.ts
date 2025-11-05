import API from './api';

// --- INTERFACES DE DATOS ---

// 1. Interfaz para los datos que se RECIBEN del servidor (sin password)
export type RetrievedUser = {
  id: number;
  name: string;
  email: string;
  // Añadir aquí otros campos que devuelva el backend (ej: is_active, date_joined, etc.)
};

// 2. Interfaz para la CREACIÓN de un usuario (requiere password)
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
 * @returns Promesa que resuelve en un array de usuarios (sin password).
 */
export const getUsers = async (): Promise<RetrievedUser[]> => {
  const res = await API.get('/users/');
  return res.data;
};

/**
 * Obtener un usuario por ID.
 * @param id El ID del usuario.
 * @returns Promesa que resuelve en un objeto de usuario (sin password).
 */
export const getUserById = async (id: number): Promise<RetrievedUser> => {
  const res = await API.get(`/users/${id}/`);
  return res.data;
};

/**
 * Crear un nuevo usuario (generalmente usado por rutas de administración).
 * @param data Los datos del nuevo usuario.
 * @returns Promesa que resuelve en el usuario creado.
 */
export const createUser = async (data: UserCreatePayload): Promise<RetrievedUser> => {
  const res = await API.post('/users/', data);
  return res.data;
};

/**
 * Actualizar un usuario existente de forma parcial (PATCH).
 * @param id El ID del usuario.
 * @param data Los campos a actualizar (opcionales).
 * @returns Promesa que resuelve en el usuario actualizado.
 */
export const updateUser = async (id: number, data: UserUpdatePayload): Promise<RetrievedUser> => {
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

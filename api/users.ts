// api/users.ts - Actualizar para incluir el endpoint /me/
import API from './api';

// --- INTERFACES DE DATOS ---
export type UserProfileData = {
  id: number;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  image?: string | null;
  image_url?: string | null;
  date_joined?: string;
  is_active?: boolean;
  is_staff?: boolean;
};

export type UserCreatePayload = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  image_base64?: string; // Para enviar imágenes en base64
};

export type UserUpdatePayload = {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  image_base64?: string; // Para actualizar imagen en base64
};

// --- FUNCIONES DE SERVICIO ---

/**
 * Obtener el perfil del usuario autenticado
 */
export const getCurrentUser = async (): Promise<UserProfileData> => {
  const res = await API.get('/users/me/');
  return res.data;
};

export const getUsers = async (): Promise<UserProfileData[]> => {
  const res = await API.get('/users/');
  return res.data;
};

export const getUserById = async (id: number): Promise<UserProfileData> => {
  const res = await API.get(`/users/${id}/`);
  return res.data;
};

export const createUser = async (data: UserCreatePayload): Promise<UserProfileData> => {
  const res = await API.post('/users/', data);
  return res.data;
};

export const updateUser = async (id: number, data: UserUpdatePayload): Promise<UserProfileData> => {
  const res = await API.patch(`/users/${id}/`, data);
  return res.data;
};

export const updateCurrentUser = async (data: UserUpdatePayload): Promise<UserProfileData> => {
  const res = await API.patch('/users/me/', data);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await API.delete(`/users/${id}/`);
};
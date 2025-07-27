import API from './api';

export type User = {
  id: number;
  name: string;
  email: string;
};

// Obtener todos los usuarios
export const getUsers = async () => {
  const res = await API.get('/users/');
  return res.data;
};

// Obtener usuario por ID
export const getUserById = async (id: number) => {
  const res = await API.get(`/users/${id}/`);
  return res.data;
};

// Crear nuevo usuario
export const createUser = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await API.post('/users/', user);
  return res.data;
};

// Actualizar usuario
export const updateUser = async (id: number, user: {
  name: string;
  email: string;
  password?: string; // puede ser opcional
}) => {
  const res = await API.put(`/users/${id}/`, user);
  return res.data;
};

// Eliminar usuario
export const deleteUser = async (id: number) => {
  const res = await API.delete(`/users/${id}/`);
  return res.data;
};

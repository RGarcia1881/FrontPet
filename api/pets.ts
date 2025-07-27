import API from './api';

export const getPets = async () => {
  const res = await API.get('/pets/');
  return res.data;
};

export const getPetById = async (id: number) => {
  const res = await API.get(`/pets/${id}/`);
  return res.data;
};

export const createPet = async (pet: {
  name: string;
  weight: number;
  age: number;
  race: string;
  image: string;
  user: number;
}) => {
  const res = await API.post('/pets/', pet);
  return res.data;
};

export const updatePet = async (id: number, pet: {
  name: string;
  weight: number;
  age: number;
  race: string;
  image: string;
  user: number;
}) => {
  const res = await API.put(`/pets/${id}/`, pet);
  return res.data;
};

export const deletePet = async (id: number) => {
  const res = await API.delete(`/pets/${id}/`);
  return res.data;
};
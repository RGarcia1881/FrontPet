import API from './api';

export type Horario = {
  id: number;
  mascota: number; // ID de la mascota
  dispensador: number; // ID del dispensador
  usuario: number; // ID del usuario propietario
  horarios: string[]; // Array de horarios como ["08:00", "12:00", "19:00"]
  // Campos relacionados que podrían venir en la respuesta
  mascota_nombre?: string;
  dispensador_nombre?: string;
};

export const getHorarios = async (): Promise<Horario[]> => {
  const res = await API.get('/horarios/');
  return res.data;
};

export const getHorariosByUser = async (userId: number): Promise<Horario[]> => {
  const res = await API.get(`/horarios/?usuario=${userId}`);
  return res.data;
};

export const getHorarioById = async (id: number): Promise<Horario> => {
  const res = await API.get(`/horarios/${id}/`);
  return res.data;
};

export const createHorario = async (horario: {
  mascota: number;
  dispensador: number;
  usuario: number;
  horarios: string[];
}): Promise<Horario> => {
  const res = await API.post('/horarios/', horario);
  return res.data;
};

export const updateHorario = async (id: number, horario: {
  mascota?: number;
  dispensador?: number;
  usuario?: number;
  horarios?: string[];
}): Promise<Horario> => {
  const res = await API.put(`/horarios/${id}/`, horario);
  return res.data;
};

export const deleteHorario = async (id: number): Promise<void> => {
  await API.delete(`/horarios/${id}/`);
};
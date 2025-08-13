import API from './api';

export type Dispenser = {
  id: number;
  ubication: string;
  status: boolean;
  timetable: string;
  FC: number; // Food Capacity
  WC: number; // Water Capacity
  FP: boolean; // Food Present
  WP: boolean; // Water Present
  user: number; // User ID
  pet: number; // Pet ID
};

export const getDispensers = async () => {
  const res = await API.get('/dispensers/');
  return res.data;
};

export const getDispenserById = async (id: number) => {
  const res = await API.get(`/dispensers/${id}/`);
  return res.data;
};

export const createDispenser = async (dispenser: {
  ubication: string;
  status: boolean;
  timetable: string;
  FC: number;
  WC: number;
  FP: boolean;
  WP: boolean;
  user: number;
  pet: number;
}) => {
  const res = await API.post('/dispensers/', dispenser);
  return res.data;
};

export const updateDispenser = async (id: number, dispenser: {
  ubication: string;
  status: boolean;
  timetable: string;
  FC: number;
  WC: number;
  FP: boolean;
  WP: boolean;
  user: number;
  pet: number;
}) => {
  const res = await API.put(`/dispensers/${id}/`, dispenser);
  return res.data;
};

export const deleteDispenser = async (id: number) => {
  const res = await API.delete(`/dispensers/${id}/`);
  return res.data;
};

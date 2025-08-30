// api/esp32.ts

import API from './api';

export const readSensor = async (sensor: 'PESO_A' | 'PESO_B' | 'DISTANCIA_A' | 'DISTANCIA_B') => {
  const res = await API.get(`/esp32/read_sensor/?sensor=${sensor}`);
  return res; // Return the full response object
};

export const activateMotor = async () => {
  const res = await API.post('/esp32/activate_motor/');
  return res; // Return the full response object
};

export const activatePump = async () => {
  const res = await API.post('/esp32/activate_pump/');
  return res; // Return the full response object
};
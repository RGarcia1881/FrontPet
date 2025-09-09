// api/esp32.ts

import API from './api';

export const readSensor = async (sensor: 'PESO_A' | 'PESO_B' | 'DISTANCIA_A' | 'DISTANCIA_B') => {
  const res = await API.get(`/esp32/read_sensor/?sensor=${sensor}`);
  return res;
};

export const activateMotor = async () => {
  const res = await API.post('/esp32/activate_motor/');
  return res;
};

export const activatePump = async () => {
  const res = await API.post('/esp32/activate_pump/');
  return res;
};

// Nueva función para iniciar la calibración (tarar la balanza)
export const startCalibration = async (scale: 'A' | 'B') => {
  const res = await API.post('/esp32/calibrate_tare/', { scale });
  return res;
};

// Nueva función para finalizar la calibración (enviar el peso conocido)
export const finishCalibration = async (scale: 'A' | 'B', knownWeight: number) => {
  const res = await API.post('/esp32/calibrate_set_weight/', {
    scale,
    known_weight: knownWeight,
  });
  return res;
};

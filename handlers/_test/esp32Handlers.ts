import { Dispatch, SetStateAction } from 'react';
import { readSensor, activateMotor, activatePump, startCalibration, finishCalibration } from '@/api/esp32';
import { AxiosResponse } from 'axios';

type MessageType = 'success' | 'error';

// --- Handlers para las acciones del ESP32 ---

export const handleReadSensor = async (
  sensor: string,
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>
) => {
  try {
    const res = await readSensor(sensor as any);
    const value = res.data[sensor];
    const message = value ? `Lectura del sensor ${sensor}: ${value}` : `No se pudo leer el sensor ${sensor}.`;
    setMessage(message);
    setMessageType(value ? 'success' : 'error');
    return value || null;
  } catch (error) {
    console.error("Error al leer el sensor:", error);
    setMessage(`Error de conexión: No se pudo leer el sensor ${sensor}.`);
    setMessageType('error');
    return null;
  }
};

export const handleActivateMotor = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>
) => {
  try {
    const res = await activateMotor();
    const message = res?.data?.message || "Respuesta del servidor no válida.";
    setMessage(message.trim());
    setMessageType('success');
    return message.trim();
  } catch (error) {
    console.error("Error al activar el motor:", error);
    setMessage("Error de conexión: No se pudo activar el motor.");
    setMessageType('error');
    return null;
  }
};

export const handleActivatePump = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>
) => {
  try {
    const res = await activatePump();
    const message = res?.data?.message || "Respuesta del servidor no válida.";
    setMessage(message.trim());
    setMessageType('success');
  } catch (error) {
    console.error("Error al activar la bomba:", error);
    setMessage("Error de conexión: No se pudo activar la bomba.");
    setMessageType('error');
  }
};

export const handleFoodRoutine = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  setMessage("Iniciando rutina de comida...");

  let motorMessage = null;
  let pesoValue = null;
  let distanciaValue = null;

  try {
    setMessage("Activando motor...");
    motorMessage = await handleActivateMotor(setMessage, setMessageType);
    if (!motorMessage) throw new Error("Fallo al activar el motor");

    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage("Leyendo sensor de peso A...");
    pesoValue = await handleReadSensor('PESO_A', setMessage, setMessageType);
    if (!pesoValue) throw new Error("Fallo al leer sensor de peso A");

    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage("Leyendo sensor de distancia A...");
    distanciaValue = await handleReadSensor('DISTANCIA_A', setMessage, setMessageType);
    if (!distanciaValue) throw new Error("Fallo al leer sensor de distancia A");

    const finalMessage = `Rutina finalizada con éxito:\n\n` +
      `Mensaje del motor: ${motorMessage}\n` +
      `Peso A: ${pesoValue}\n` +
      `Distancia A: ${distanciaValue}`;

    setMessage(finalMessage);
    setMessageType('success');

  } catch (error) {
    console.error("Error en la rutina:", error);
    const errorMessage = error instanceof Error ? `Rutina fallida: ${error.message}` : "Error desconocido en la rutina.";
    setMessage(errorMessage);
    setMessageType('error');
  } finally {
    setLoading(false);
  }
};

export const handleWaterRoutine = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  setMessage("Iniciando rutina de agua...");
  try {
    const res = await activatePump();
    setMessage("Rutina de agua finalizada: Bomba activada.");
    setMessageType('success');
  } catch (error) {
    console.error("Error en la rutina:", error);
    setMessage("Fallo en la rutina de agua.");
    setMessageType('error');
  } finally {
    setLoading(false);
  }
};

// Calibración de dos pasos
export const handleCalibrateTare = async (scale: 'A' | 'B'): Promise<AxiosResponse> => {
  return await startCalibration(scale);
};

export const handleCalibrateSetWeight = async (scale: 'A' | 'B', knownWeight: string): Promise<AxiosResponse> => {
  const weight = parseFloat(knownWeight);
  if (isNaN(weight) || weight <= 0) {
    throw new Error("El peso conocido no es un número válido.");
  }
  return await finishCalibration(scale, weight);
};

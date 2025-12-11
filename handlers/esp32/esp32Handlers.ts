// esp32Handlers

import { Dispatch, SetStateAction } from "react";
import {
  readSensor,
  activateMotor,
  activatePump,
  startCalibration,
  finishCalibration,
} from "@/api/esp32";
import { AxiosResponse } from "axios";

type MessageType = "success" | "error";

// --- Handlers del ESP32 ---

// Funciones basicas

// Leer sensores

export const handleReadSensor = async (
  sensor: string,
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>
) => {
  try {
    const res = await readSensor(sensor as any);
    const value = res.data[sensor];
    const message = value
      ? `Lectura del sensor ${sensor}: ${value}`
      : `No se pudo leer el sensor ${sensor}.`;
    setMessage(message);
    setMessageType(value ? "success" : "error");
    return value || null;
  } catch (error) {
    console.error("Error al leer el sensor:", error);
    setMessage(`Error de conexión: No se pudo leer el sensor ${sensor}.`);
    setMessageType("error");
    return null;
  }
};

// Activar motor

export const handleActivateMotor = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>
) => {
  try {
    const res = await activateMotor();
    const message = res?.data?.message || "Respuesta del servidor no válida.";
    setMessage(message.trim());
    setMessageType("success");
    return message.trim();
  } catch (error) {
    console.error("Error al activar el motor:", error);
    setMessage("Error de conexión: No se pudo activar el motor.");
    setMessageType("error");
    return null;
  }
};

// Activar bomba - CORREGIDO: ahora retorna el mensaje

export const handleActivatePump = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>
) => {
  try {
    const res = await activatePump();
    const message = res?.data?.message || "Respuesta del servidor no válida.";
    setMessage(message.trim());
    setMessageType("success");
    return message.trim(); // ✅ Ahora retorna el mensaje
  } catch (error) {
    console.error("Error al activar la bomba:", error);
    setMessage("Error de conexión: No se pudo activar la bomba.");
    setMessageType("error");
    return null; // ✅ Ahora retorna null en caso de error
  }
};

// Rutinas de funcionamiento del ESP32

// Dispensar comida

export const handleFoodRoutine = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>,
  setLoading: Dispatch<SetStateAction<boolean>>
): Promise<number | null> => {
  // ✅ Devuelve la distancia
  setLoading(true);
  setMessage("Iniciando rutina de comida...");

  let motorMessage = null;
  let pesoValue = null;
  let distanciaValue: number | null = null;

  try {
    setMessage("Activando motor...");
    motorMessage = await handleActivateMotor(setMessage, setMessageType);
    if (!motorMessage) throw new Error("Fallo al activar el motor");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Leyendo sensor de peso A...");
    pesoValue = await handleReadSensor("PESO_A", setMessage, setMessageType);
    if (!pesoValue) throw new Error("Fallo al leer sensor de peso A");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Leyendo sensor de distancia A...");
    const distanciaResult = await handleReadSensor(
      "DISTANCIA_A",
      setMessage,
      setMessageType
    );

    if (!distanciaResult)
      throw new Error("Fallo al leer sensor de distancia A");

    // Convertir a número y guardar
    distanciaValue = parseFloat(distanciaResult);

    const finalMessage =
      `Rutina finalizada con éxito:\n\n` +
      `Mensaje del motor: ${motorMessage}\n` +
      `Peso A: ${pesoValue}\n` +
      `Distancia A: ${distanciaValue} cm`;

    setMessage(finalMessage);
    setMessageType("success");

    return distanciaValue; // ✅ Devuelve la distancia
  } catch (error) {
    console.error("Error en la rutina:", error);
    const errorMessage =
      error instanceof Error
        ? `Rutina fallida: ${error.message}`
        : "Error desconocido en la rutina.";
    setMessage(errorMessage);
    setMessageType("error");
    return null;
  } finally {
    setLoading(false);
  }
};

export const handleWaterRoutine = async (
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>,
  setLoading: Dispatch<SetStateAction<boolean>>
): Promise<number | null> => {
  // ✅ Devuelve la distancia
  setLoading(true);
  setMessage("Iniciando rutina de agua...");

  let pumpMessage = null;
  let pesoValue = null;
  let distanciaValue: number | null = null;

  try {
    setMessage("Activando bomba...");
    pumpMessage = await handleActivatePump(setMessage, setMessageType);
    if (!pumpMessage) throw new Error("Fallo al activar la bomba");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Leyendo sensor de peso B...");
    pesoValue = await handleReadSensor("PESO_B", setMessage, setMessageType);
    if (!pesoValue) throw new Error("Fallo al leer sensor de peso B");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Leyendo sensor de distancia B...");
    const distanciaResult = await handleReadSensor(
      "DISTANCIA_B",
      setMessage,
      setMessageType
    );

    if (!distanciaResult)
      throw new Error("Fallo al leer sensor de distancia B");

    // Convertir a número y guardar
    distanciaValue = parseFloat(distanciaResult);

    const finalMessage =
      `Rutina finalizada con éxito:\n\n` +
      `Mensaje de la bomba: ${pumpMessage}\n` +
      `Peso B: ${pesoValue}\n` +
      `Distancia B: ${distanciaValue} cm`;

    setMessage(finalMessage);
    setMessageType("success");

    return distanciaValue; // ✅ Devuelve la distancia
  } catch (error) {
    console.error("Error en la rutina:", error);
    const errorMessage =
      error instanceof Error
        ? `Rutina fallida: ${error.message}`
        : "Error desconocido en la rutina.";
    setMessage(errorMessage);
    setMessageType("error");
    return null;
  } finally {
    setLoading(false);
  }
};

// Funciones adicionales

// Calibración de balanzas
export const handleCalibrateTare = async (
  scale: "A" | "B"
): Promise<AxiosResponse> => {
  return await startCalibration(scale);
};

export const handleCalibrateSetWeight = async (
  scale: "A" | "B",
  knownWeight: string
): Promise<AxiosResponse> => {
  const weight = parseFloat(knownWeight);
  if (isNaN(weight) || weight <= 0) {
    throw new Error("El peso conocido no es un número válido.");
  }
  return await finishCalibration(scale, weight);
};

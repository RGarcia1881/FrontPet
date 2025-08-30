// handlers/esp32Handlers.ts

import { readSensor, activateMotor, activatePump } from '@/api/esp32';

// --- Función para leer un sensor (sin cambios) ---
export const handleReadSensor = async (sensor: string, setMessage: (msg: string) => void, setMessageType: (type: 'success' | 'error') => void) => {
  try {
    const res = await readSensor(sensor as any);
    const message = res?.data?.value ? `Lectura del sensor ${sensor}: ${res.data.value}` : `No se pudo leer el sensor ${sensor}.`;
    setMessage(message);
    setMessageType(res?.data?.value ? 'success' : 'error');
    return res?.data?.value || null;
  } catch (error) {
    console.error("Error al leer el sensor:", error);
    let errorMessage = `Error de conexión: No se pudo leer el sensor ${sensor}.`;
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    setMessage(errorMessage);
    setMessageType('error');
    return null;
  }
};

// --- Función para activar el motor (ahora devuelve el mensaje para usarlo en la rutina) ---
export const handleActivateMotor = async (setMessage: (msg: string) => void, setMessageType: (type: 'success' | 'error') => void) => {
  try {
    const res = await activateMotor();
    const message = res?.data?.salida || "Respuesta del servidor no válida.";
    setMessage(message.trim());
    setMessageType('success');
    return message.trim(); // <-- Devuelve el mensaje aquí
  } catch (error) {
    console.error("Error al activar el motor:", error);
    let errorMessage = "Error de conexión: No se pudo activar el motor.";
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    setMessage(errorMessage);
    setMessageType('error');
    return null; // Devuelve null en caso de error
  }
};

// --- Función para activar la bomba (sin cambios) ---
export const handleActivatePump = async (setMessage: (msg: string) => void, setMessageType: (type: 'success' | 'error') => void) => {
  try {
    const res = await activatePump();
    const message = res?.data?.salida || "Respuesta del servidor no válida.";
    setMessage(message.trim());
    setMessageType('success');
  } catch (error) {
    console.error("Error al activar la bomba:", error);
    let errorMessage = "Error de conexión: No se pudo activar la bomba.";
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    setMessage(errorMessage);
    setMessageType('error');
  }
};

// --- Manejador de la rutina de comida (actualizado para incluir el mensaje del motor) ---
export const handleFoodRoutine = async (
  setMessage: (msg: string) => void,
  setMessageType: (type: 'success' | 'error') => void,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  setMessage("Iniciando rutina...");

  let motorMessage = null; // Variable para almacenar el mensaje del motor
  let pesoValue = null;
  let distanciaValue = null;

  try {
    // 1. Activar Motor y guardar el mensaje
    setMessage("Paso 1/3: Activando motor...");
    motorMessage = await handleActivateMotor(setMessage, setMessageType);
    if (!motorMessage) throw new Error("Fallo al activar el motor");

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 2. Leer Sensor de Peso A
    setMessage("Paso 2/3: Leyendo sensor de peso A...");
    pesoValue = await handleReadSensor('PESO_A', setMessage, setMessageType);
    if (!pesoValue) throw new Error("Fallo al leer sensor de peso A");

    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Leer Sensor de Distancia A
    setMessage("Paso 3/3: Leyendo sensor de distancia A...");
    distanciaValue = await handleReadSensor('DISTANCIA_A', setMessage, setMessageType);
    if (!distanciaValue) throw new Error("Fallo al leer sensor de distancia A");

    // Resumen Final (con el mensaje del motor)
    const finalMessage = `Rutina finalizada con éxito:\n\n` + 
      `${motorMessage}\n` + 
      `Peso A: ${pesoValue}\n` + 
      `Distancia A: ${distanciaValue}`;

    setMessage(finalMessage);
    setMessageType('success');

  } catch (error) {
    console.error("Error en la rutina:", error);
    let errorMessage = "Error desconocido en la rutina.";
    if (error instanceof Error) {
      errorMessage = `Rutina fallida: ${error.message}`;
    }
    setMessage(errorMessage);
    setMessageType('error');
  } finally {
    setLoading(false);
  }
};
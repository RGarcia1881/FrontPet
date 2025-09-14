import { Dispatch, SetStateAction } from 'react';
import { recordVideo } from '@/api/raspi';

type MessageType = 'success' | 'error' | 'info';

/**
 * Maneja la lógica de grabar un video desde la Raspberry Pi.
 * @param duracionSegundos La duración del video en segundos.
 * @param rutaSalida La ruta donde se guardará el video en la Raspberry Pi.
 * @param setMessage La función de estado para actualizar el mensaje de la UI.
 * @param setMessageType La función de estado para actualizar el tipo de mensaje.
 */
export const handleRecordVideo = async (
  duracionSegundos: number,
  rutaSalida: string,
  setMessage: Dispatch<SetStateAction<string>>,
  setMessageType: Dispatch<SetStateAction<MessageType>>
) => {
  try {
    const res = await recordVideo(duracionSegundos, rutaSalida);
    setMessage(res.data.message);
    setMessageType('success');
  } catch (error) {
    console.error('Error al grabar video:', error);
    setMessage(`Error: ${error instanceof Error ? error.message : 'Error desconocido.'}`);
    setMessageType('error');
    throw error;
  }
};
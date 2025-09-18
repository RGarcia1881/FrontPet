import API from './api';

// La URL del stream se construye a partir de la URL base del API.
const BASE_URL = API.defaults.baseURL;
export const VIDEO_STREAM_URL = `${BASE_URL}raspi/stream_video/`;

/**
 * Envía un archivo de audio a la Raspberry Pi para su reproducción.
 * @param audioFile El objeto de archivo de audio (por ejemplo, de expo-av).
 * @returns El objeto de respuesta de la API.
 */
export const playAudio = async (audioFile: { uri: string; name: string; type: string }) => {
  try {
    const formData = new FormData();
    // 'audio_file' debe coincidir con el nombre esperado en el backend (request.FILES['audio_file'])
    formData.append('audio_file', {
      uri: audioFile.uri,
      name: audioFile.name,
      type: 'audio/m4a',
    } as any); // Usar 'as any' para evitar problemas de tipos con FormData en React Native.

    const res = await API.post('/raspi/reproducir_audio/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error al reproducir audio:', error);
    throw error;
  }
};

import API from './api';

/**
 * Graba un video desde la cámara de la Raspberry Pi.
 * @param duracionSegundos La duración del video en segundos.
 * @param rutaSalida La ruta donde se guardará el video en la Raspberry Pi.
 */
export const recordVideo = async (duracionSegundos: number, rutaSalida: string) => {
  const res = await API.post('/raspi/grabar_video/', {
    duracion_segundos: duracionSegundos,
    ruta_salida: rutaSalida,
  });
  return res;
};

/**
 * URL directa para la transmisión de video en vivo (Motion JPEG).
 * Esta URL se debe usar en un WebView o una etiqueta <img> en HTML.
 */
export const VIDEO_STREAM_URL = `${API.defaults.baseURL}raspi/stream_video/`;

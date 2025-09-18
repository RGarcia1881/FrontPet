import { playAudio } from "@/api/raspi";

/**
 * Llama a la API para reproducir un archivo de audio en la Raspberry Pi.
 * @param audioUri URI del archivo de audio grabado.
 * @returns true si la reproducción fue exitosa, false en caso contrario.
 */
export const handlePlayAudio = async (audioUri: string) => {
  try {
    const audioFile = {
      uri: audioUri,
      name: `voice_message_${Date.now()}.m4a`, // Nombre de archivo único
      type: 'audio/m4a',
    };
    
    // Llama a la función de la API para enviar el audio
    const res = await playAudio(audioFile);

    // Verifica si la respuesta de la API fue exitosa
    if (res.message) {
      console.log(res.message);
      return true;
    } else {
      console.error('Error de la API:', res.error);
      return false;
    }
  } catch (error) {
    console.error('Error en el manejador de audio:', error);
    return false;
  }
};

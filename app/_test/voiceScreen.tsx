import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import { voiceStyles as styles } from "@/styles/_test/voiceScreenStyles";
import { handlePlayAudio } from "@/handlers/_test/voiceScreenHandlers";

export default function VoiceScreen() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUri, setAudioUri] = useState<string | undefined>();
  const [message, setMessage] = useState(
    "Presiona para grabar tu mensaje de voz."
  );

  useEffect(() => {
    // Solicitar permisos de micrófono al cargar la pantalla
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitas dar permiso para acceder al micrófono."
        );
      }
    })();
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  async function startRecording() {
    setIsRecording(true);
    setMessage("Grabando...");
    try {
      // Configurar la grabación
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setAudioUri(undefined);
    } catch (err) {
      console.error("Error al iniciar la grabación", err);
      setMessage("Error al iniciar la grabación.");
      setIsRecording(false);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    setIsLoading(true);
    setMessage("Deteniendo grabación...");
    if (!recording) {
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setMessage(
        'Grabación terminada. Presiona "Enviar a la Pi" para reproducirla.'
      );
    } catch (err) {
      console.error("Error al detener la grabación", err);
      setMessage("Error al detener la grabación.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSend = async () => {
    if (!audioUri) {
      Alert.alert("Error", "No hay un archivo de audio para enviar.");
      return;
    }
    setIsLoading(true);
    setMessage("Enviando audio a la Raspberry Pi...");

    try {
      // Llama al manejador para enviar el audio
      const success = await handlePlayAudio(audioUri);
      if (success) {
        setMessage("¡Mensaje enviado y reproducido con éxito!");
      } else {
        setMessage("Ocurrió un error al enviar el mensaje.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error inesperado al enviar el mensaje.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grabadora de Voz</Text>
      <View style={styles.recordContainer}>
        <Button
          title={isRecording ? "Detener Grabación" : "Iniciar Grabación"}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
        />
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.loadingIndicator}
          />
        )}
      </View>
      <Text style={[styles.message, { color: isLoading ? "#888" : "#333" }]}>
        {message}
      </Text>

      {audioUri && !isRecording && (
        <View style={styles.buttonContainer}>
          <Button
            title="Enviar a la Pi"
            onPress={handleSend}
            disabled={isLoading}
          />
        </View>
      )}
    </View>
  );
}

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import WebView from "react-native-webview";
import { Audio } from "expo-av";
import { centralDispenserInfoStyles as styles } from "@/styles/screen/dispenser/centralDispenserInfoStyles";
import { AppColors } from "@/styles/global/theme";
import { VIDEO_STREAM_URL } from "@/api/raspi";
import { handlePlayAudio } from "@/handlers/_test/voiceScreenHandlers";
import { distanceToPercentage } from "@/utils/distanceCalculator";
import {
  handleFoodRoutine,
  handleWaterRoutine,
} from "@/handlers/esp32/esp32Handlers";

interface CentralDispenserInfoProps {
  name: string;
  location: string;
  status: string;
  waterLevel?: number;
  foodLevel?: number;
  onUpdateWaterLevel?: (level: number) => void;
  onUpdateFoodLevel?: (level: number) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onSound?: () => void;
  onAddClick?: () => void;
  onFood?: () => void;
  onWater?: () => void;
}

export function CentralDispenserInfo({
  name,
  location,
  status,
  waterLevel = 0,
  foodLevel = 0,
  onUpdateWaterLevel,
  onUpdateFoodLevel,
  onEdit,
  onDelete,
  onView,
  onSound,
  onAddClick,
  onFood,
  onWater,
}: CentralDispenserInfoProps) {
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingVoice, setIsLoadingVoice] = useState(false);
  const [isLoadingFood, setIsLoadingFood] = useState(false);
  const [isLoadingWater, setIsLoadingWater] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [audioUri, setAudioUri] = useState<string | undefined>();
  const [recordingTime, setRecordingTime] = useState(0);

  const iconColor = AppColors.light;
  const iconSize = 24;
  const timerRef = useRef<number | null>(null);
  const animationRefs = useRef<Animated.Value[]>(
    Array(5)
      .fill(null)
      .map(() => new Animated.Value(10))
  );

  // ===== EFECTO PARA EL TIMER DE GRABACIÓN =====
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRecording]);

  // ===== ANIMACIÓN DEL ESPECTRO DE AUDIO =====
  useEffect(() => {
    if (isRecording) {
      const animations = animationRefs.current.map((anim, index) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: Math.random() * 40 + 20,
              duration: 200 + index * 100,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 10,
              duration: 200 + index * 100,
              useNativeDriver: false,
            }),
          ])
        );
      });

      animations.forEach((anim) => anim.start());

      return () => {
        animations.forEach((anim) => anim.stop());
      };
    } else {
      animationRefs.current.forEach((anim) => anim.setValue(10));
    }
  }, [isRecording]);

  // ===== FUNCIONALIDAD DE DISPENSACIÓN =====

  const handleFoodDispense = async () => {
    setIsLoadingFood(true);
    try {
      const dummySetMessage: React.Dispatch<React.SetStateAction<string>> = (
        msg
      ) => {
        if (typeof msg === "function") {
          const result = msg("");
          console.log(`🍽️ [COMIDA]: ${result}`);
        } else {
          console.log(`🍽️ [COMIDA]: ${msg}`);
        }
      };

      const dummySetMessageType: React.Dispatch<
        React.SetStateAction<"success" | "error">
      > = (type) => {
        if (typeof type === "function") {
          const result = type("success");
          console.log(`📊 [COMIDA] Tipo: ${result}`);
        } else {
          console.log(`📊 [COMIDA] Tipo: ${type}`);
        }
      };

      const dummySetLoading: React.Dispatch<React.SetStateAction<boolean>> = (
        loading
      ) => {
        if (typeof loading === "function") {
          const result = loading(false);
          console.log(`🔄 [COMIDA] Loading: ${result}`);
        } else {
          console.log(`🔄 [COMIDA] Loading: ${loading}`);
        }
      };

      const distancia = await handleFoodRoutine(
        dummySetMessage,
        dummySetMessageType,
        dummySetLoading
      );

      if (distancia !== null && onUpdateFoodLevel) {
        const porcentaje = distanceToPercentage(distancia);
        console.log(`📊 [COMIDA] ${distancia}cm → ${porcentaje}%`);
        onUpdateFoodLevel(porcentaje);
      }

      if (onFood) {
        onFood();
      }
    } catch (error) {
      console.error("Error en rutina de comida:", error);
      Alert.alert("Error", "No se pudo activar la rutina de comida");
    } finally {
      setIsLoadingFood(false);
    }
  };

  const handleWaterDispense = async () => {
    setIsLoadingWater(true);
    try {
      const dummySetMessage: React.Dispatch<React.SetStateAction<string>> = (
        msg
      ) => {
        if (typeof msg === "function") {
          const result = msg("");
          console.log(`💧 [AGUA]: ${result}`);
        } else {
          console.log(`💧 [AGUA]: ${msg}`);
        }
      };

      const dummySetMessageType: React.Dispatch<
        React.SetStateAction<"success" | "error">
      > = (type) => {
        if (typeof type === "function") {
          const result = type("success");
          console.log(`📊 [AGUA] Tipo: ${result}`);
        } else {
          console.log(`📊 [AGUA] Tipo: ${type}`);
        }
      };

      const dummySetLoading: React.Dispatch<React.SetStateAction<boolean>> = (
        loading
      ) => {
        if (typeof loading === "function") {
          const result = loading(false);
          console.log(`🔄 [AGUA] Loading: ${result}`);
        } else {
          console.log(`🔄 [AGUA] Loading: ${loading}`);
        }
      };

      const distancia = await handleWaterRoutine(
        dummySetMessage,
        dummySetMessageType,
        dummySetLoading
      );

      if (distancia !== null && onUpdateWaterLevel) {
        const porcentaje = distanceToPercentage(distancia);
        console.log(`📊 [AGUA] ${distancia}cm → ${porcentaje}%`);
        onUpdateWaterLevel(porcentaje);
      }

      if (onWater) {
        onWater();
      }
    } catch (error) {
      console.error("Error en rutina de agua:", error);
      Alert.alert("Error", "No se pudo activar la rutina de agua");
    } finally {
      setIsLoadingWater(false);
    }
  };

  // ===== FUNCIONALIDAD DE VOZ =====

  const startVoiceRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso requerido",
          "Se necesita acceso al micrófono para grabar audio."
        );
        return;
      }

      setIsRecording(true);
      setIsVoiceMode(true);

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setAudioUri(undefined);
    } catch (error) {
      console.error("Error al iniciar grabación:", error);
      Alert.alert("Error", "No se pudo iniciar la grabación.");
      setIsRecording(false);
      setIsVoiceMode(false);
    }
  };

  const stopVoiceRecording = async () => {
    if (!recording) return;

    setIsRecording(false);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        setAudioUri(uri);
      } else {
        Alert.alert("Error", "No se pudo obtener el archivo de audio.");
      }
    } catch (error) {
      console.error("Error al detener grabación:", error);
      Alert.alert("Error", "No se pudo detener la grabación.");
    } finally {
      setRecording(undefined);
    }
  };

  const sendAudioToDispenser = async () => {
    if (!audioUri) return;

    setIsLoadingVoice(true);

    try {
      const success = await handlePlayAudio(audioUri);

      if (success) {
        Alert.alert("Éxito", "Audio enviado al dispensador correctamente.");
        exitVoiceMode();
      } else {
        Alert.alert("Error", "No se pudo enviar el audio al dispensador.");
      }
    } catch (error) {
      console.error("Error enviando audio:", error);
      Alert.alert("Error", "Ocurrió un problema al enviar el audio.");
    } finally {
      setIsLoadingVoice(false);
    }
  };

  const exitVoiceMode = () => {
    setIsVoiceMode(false);
    setIsRecording(false);
    setAudioUri(undefined);
    setRecordingTime(0);
    setRecording(undefined);
  };

  const handleVoiceButtonPress = () => {
    if (!isVoiceMode) {
      startVoiceRecording();
    }

    if (onSound) {
      onSound();
    }
  };

  // ===== FUNCIONALIDAD DE CÁMARA =====

  const toggleCameraMode = () => {
    setIsCameraMode(true);
    setIsCameraVisible(true);
    if (onView) {
      onView();
    }
  };

  const toggleVideo = () => {
    setIsCameraVisible((prev) => !prev);
  };

  const handleBackToInfo = () => {
    setIsCameraMode(false);
    setIsCameraVisible(true);
  };

  // ===== RENDER =====

  if (onAddClick) {
    return (
      <View style={styles.infoCircle}>
        <Pressable onPress={onAddClick} style={styles.bigAddButton}>
          <Ionicons name="add" size={80} color={AppColors.primary} />
          <Text style={styles.addText}>Añadir Nuevo Dispensador</Text>
        </Pressable>
      </View>
    );
  }

  // MODO VOZ
  if (isVoiceMode) {
    return (
      <View style={styles.infoCircle}>
        <View style={[styles.actionIconsContainer, styles.topIcons]}>
          <Pressable onPress={exitVoiceMode}>
            <Ionicons
              name="close"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        </View>

        <View style={styles.audioSpectrum}>
          {animationRefs.current.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.audioBar,
                {
                  height: anim,
                  backgroundColor: isRecording ? "#4CD964" : AppColors.primary,
                },
              ]}
            />
          ))}
        </View>

        <Text style={styles.timerText}>
          {Math.floor(recordingTime / 60)}:
          {(recordingTime % 60).toString().padStart(2, "0")}
        </Text>

        <Text style={styles.voiceStatusText}>
          {isRecording
            ? "Grabando..."
            : audioUri
            ? "Grabación lista"
            : "Listo para grabar"}
        </Text>

        <View style={[styles.actionIconsContainer, styles.bottomIcons]}>
          <Pressable
            onPress={isRecording ? stopVoiceRecording : startVoiceRecording}
            disabled={isLoadingVoice}
          >
            <Ionicons
              name={isRecording ? "stop" : "mic"}
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>

          <Pressable
            onPress={sendAudioToDispenser}
            disabled={!audioUri || isLoadingVoice}
          >
            <Ionicons
              name="send"
              size={iconSize}
              color={
                audioUri && !isLoadingVoice ? iconColor : AppColors.subtext
              }
              style={styles.actionIcon}
            />
          </Pressable>
        </View>

        {isLoadingVoice && (
          <View style={styles.voiceLoadingOverlay}>
            <ActivityIndicator size="small" color={AppColors.light} />
            <Text style={styles.voiceLoadingText}>Enviando...</Text>
          </View>
        )}
      </View>
    );
  }

  // MODO CÁMARA
  if (isCameraMode) {
    return (
      <View style={styles.infoCircle}>
        <View style={[styles.actionIconsContainer, styles.topIcons]}>
          <Pressable onPress={handleBackToInfo}>
            <Ionicons
              name="arrow-back"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>

          <Pressable onPress={toggleVideo}>
            <Ionicons
              name={isCameraVisible ? "eye-off" : "eye"}
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        </View>

        <View style={styles.cameraVideoContainer}>
          {isCameraVisible ? (
            <WebView
              source={{ uri: VIDEO_STREAM_URL }}
              style={styles.cameraScaledWebView}
            />
          ) : (
            <View style={styles.cameraMessageBox}>
              <Text style={styles.cameraMessageText}>Video oculto</Text>
            </View>
          )}
        </View>

        <View style={[styles.actionIconsContainer, styles.bottomIcons]}>
          <Text style={styles.infoText}>Cámara: {name}</Text>
        </View>
      </View>
    );
  }

  // MODO INFORMACIÓN NORMAL
  return (
    <View style={styles.infoCircle}>
      {(isLoadingFood || isLoadingWater) && (
        <View style={styles.voiceLoadingOverlay}>
          <ActivityIndicator size="large" color={AppColors.light} />
          <Text style={styles.voiceLoadingText}>
            {isLoadingFood ? "Dispensando comida..." : "Dispensando agua..."}
          </Text>
        </View>
      )}

      <View style={[styles.actionIconsContainer, styles.topIcons]}>
        {onEdit && (
          <Pressable onPress={onEdit}>
            <FontAwesome5
              name="pencil-alt"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}

        {onDelete && (
          <Pressable onPress={onDelete}>
            <Ionicons
              name="trash"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}
      </View>

      <Text style={[styles.infoText, styles.dispenserName]}>{name}</Text>
      <Text style={styles.infoText}>Ubicación: {location}</Text>
      <Text style={[styles.infoText, styles.statusText]}>
        Estatus: {status}
      </Text>

      {/* PRIMERA FILA: Comida y Agua */}
      <View style={[styles.actionIconsContainer, styles.bottomIcons]}>
        <Pressable
          onPress={handleFoodDispense}
          disabled={isLoadingFood || isLoadingWater}
        >
          <Ionicons
            name="fast-food"
            size={iconSize}
            color={
              isLoadingFood || isLoadingWater ? AppColors.subtext : iconColor
            }
            style={styles.actionIcon}
          />
        </Pressable>

        <Pressable
          onPress={handleWaterDispense}
          disabled={isLoadingFood || isLoadingWater}
        >
          <Ionicons
            name="water"
            size={iconSize}
            color={
              isLoadingFood || isLoadingWater ? AppColors.subtext : iconColor
            }
            style={styles.actionIcon}
          />
        </Pressable>
      </View>

      {/* SEGUNDA FILA: Cámara y Micrófono */}
      <View style={[styles.actionIconsContainer, { bottom: 10 }]}>
        {onView && (
          <Pressable onPress={toggleCameraMode}>
            <Ionicons
              name="eye"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}

        {onSound && (
          <Pressable onPress={handleVoiceButtonPress}>
            <Ionicons
              name="mic"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

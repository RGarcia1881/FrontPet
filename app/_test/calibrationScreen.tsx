import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import {
  handleCalibrateTare,
  handleCalibrateSetWeight,
} from "@/handlers/esp32Handlers";
import { calibrationStyles as styles } from "@/styles/_test/calibrationStyles";

export default function CalibrationScreen() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [knownWeightA, setKnownWeightA] = useState("");
  const [knownWeightB, setKnownWeightB] = useState("");
  const [message, setMessage] = useState(
    "Presiona el botón para iniciar la calibración."
  );
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [calFactorA, setCalFactorA] = useState<string | null>(null);
  const [calFactorB, setCalFactorB] = useState<string | null>(null);

  const onButtonPress = async () => {
    setLoading(true);
    try {
      let nextStep = step;
      switch (step) {
        case 0:
          setMessage("Paso 1: Tarando balanza A. Por favor, retira todo.");
          await handleCalibrateTare("A");
          nextStep = 1;
          break;
        case 1:
          setMessage(
            "Paso 2: Coloca un objeto conocido en la balanza A e ingresa su peso."
          );
          nextStep = 2;
          break;
        case 2:
          const pesoA = parseFloat(knownWeightA);
          if (isNaN(pesoA) || pesoA <= 0) {
            setMessage("Error: Ingresa un peso válido para la balanza A.");
            setMessageType("error");
            setLoading(false);
            return;
          }
          const resA = await handleCalibrateSetWeight("A", knownWeightA);
          setCalFactorA(resA.data.factor);
          setMessage(
            `Balanza A calibrada con éxito. Factor: ${resA.data.factor}`
          );
          nextStep = 3;
          break;
        case 3:
          setMessage("Paso 3: Tarando balanza B. Por favor, retira todo.");
          await handleCalibrateTare("B");
          nextStep = 4;
          break;
        case 4:
          const pesoB = parseFloat(knownWeightB);
          if (isNaN(pesoB) || pesoB <= 0) {
            setMessage("Error: Ingresa un peso válido para la balanza B.");
            setMessageType("error");
            setLoading(false);
            return;
          }
          const resB = await handleCalibrateSetWeight("B", knownWeightB);
          setCalFactorB(resB.data.factor);
          setMessage(
            `Balanza B calibrada con éxito. Factor: ${resB.data.factor}`
          );
          nextStep = 5;
          break;
        case 5:
          // Finaliza y reinicia la rutina
          setCalFactorA(null);
          setCalFactorB(null);
          setMessage("Presiona el botón para iniciar la calibración.");
          setMessageType("success");
          nextStep = 0;
          break;
      }
      setStep(nextStep);
      setMessageType("success");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message || "Ocurrió un error inesperado.";
      setMessage(`Error: ${errorMessage}`);
      setMessageType("error");
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  const getButtonTitle = () => {
    switch (step) {
      case 0:
        return "Iniciar Calibración";
      case 1:
      case 3:
        return "Continuar";
      case 2:
        return "Calibrar Balanza A";
      case 4:
        return "Calibrar Balanza B";
      case 5:
        return "Finalizar y Reiniciar";
      default:
        return "...";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rutina de Calibración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progreso</Text>
        <Text style={[styles.messageText, styles[messageType]]}>{message}</Text>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}

        {step === 2 && (
          <TextInput
            style={styles.input}
            placeholder="Peso conocido para Balanza A (gramos)"
            keyboardType="numeric"
            value={knownWeightA}
            onChangeText={setKnownWeightA}
            editable={!loading}
          />
        )}

        {step === 4 && (
          <TextInput
            style={styles.input}
            placeholder="Peso conocido para Balanza B (gramos)"
            keyboardType="numeric"
            value={knownWeightB}
            onChangeText={setKnownWeightB}
            editable={!loading}
          />
        )}

        <View style={styles.spacer} />

        <Button
          title={loading ? "En progreso..." : getButtonTitle()}
          onPress={onButtonPress}
          disabled={
            loading ||
            (step === 2 && !knownWeightA) ||
            (step === 4 && !knownWeightB)
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resultados</Text>
        <Text style={styles.resultText}>
          {calFactorA !== null ? `Factor Balanza A: ${calFactorA}\n` : ""}
          {calFactorB !== null ? `Factor Balanza B: ${calFactorB}` : ""}
        </Text>
      </View>
    </ScrollView>
  );
}

// app/tabs/esp32Screen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { esp32Styles as styles } from "@/styles/_test/esp32Styles";
import {
  handleReadSensor,
  handleActivateMotor,
  handleActivatePump,
  handleFoodRoutine,
} from "@/handlers/esp32Handlers"; // Name changed

export default function Esp32Screen() {
  const [loading, setLoading] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState("PESO_A");
  const [sensorValue, setSensorValue] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const sensors = ["PESO_A", "PESO_B", "DISTANCIA_A", "DISTANCIA_B"];

  const onReadSensor = async () => {
    setLoading(true);
    setMessage("");
    const value = await handleReadSensor(
      selectedSensor,
      setMessage,
      setMessageType
    );
    setSensorValue(value);
    setLoading(false);
  };

  const onActivateMotor = async () => {
    setLoading(true);
    setMessage("");
    await handleActivateMotor(setMessage, setMessageType);
    setLoading(false);
  };

  const onActivatePump = async () => {
    setLoading(true);
    setMessage("");
    await handleActivatePump(setMessage, setMessageType);
    setLoading(false);
  };

  const onRunRoutine = () => {
    setMessage("");
    handleFoodRoutine(setMessage, setMessageType, setLoading); // Name changed
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Control de ESP32</Text>

      {/* --- Existing Sections --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leer Sensor</Text>
        <Text>Selecciona un sensor:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSensor}
            onValueChange={(itemValue) => setSelectedSensor(itemValue)}
            enabled={!loading}
          >
            {sensors.map((sensor) => (
              <Picker.Item key={sensor} label={sensor} value={sensor} />
            ))}
          </Picker>
        </View>
        <Button
          title={loading ? "Leyendo..." : "Leer Sensor"}
          onPress={onReadSensor}
          disabled={loading}
        />
        {sensorValue !== null && (
          <Text style={styles.resultText}>Valor del sensor: {sensorValue}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controlar Actuadores</Text>
        <Button
          title={loading ? "Activando..." : "Activar Motor"}
          onPress={onActivateMotor}
          disabled={loading}
        />
        <View style={styles.buttonSpacer} />
        <Button
          title={loading ? "Activando..." : "Activar Bomba"}
          onPress={onActivatePump}
          disabled={loading}
        />
      </View>

      {/* --- NEW ROUTINE BUTTON --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rutina Completa</Text>
        <Button
          title={loading ? "Ejecutando..." : "Ejecutar Rutina"}
          onPress={onRunRoutine}
          disabled={loading}
        />
      </View>

      {message ? (
        <Text style={[styles.messageText, styles[messageType]]}>{message}</Text>
      ) : null}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </ScrollView>
  );
}

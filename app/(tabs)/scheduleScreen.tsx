// app/(tabs)/scheduleScreen.tsx (o la ruta correspondiente)

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { getGreetingAndImage } from "@/utils/greetingLogic";
import { styles } from "@/styles/scheduleScreenStyles";

// Mapeo de claves a las imágenes correspondientes (Reemplaza con tus rutas reales)
const imageMap = {
  dia: require("@/assets/images/Dia.png"),
  tarde: require("@/assets/images/Tarde.png"),
  noche: require("@/assets/images/Noche.png"),
};

// Datos de ejemplo para la tabla (reemplaza con la fuente de datos real)
const SCHEDULE_DATA = [
  { hora: "08:00", racion: "250g", perro: "Max", disp: "Sí" },
  { hora: "13:00", racion: "300g", perro: "Luna", disp: "Sí" },
  { hora: "18:00", racion: "250g", perro: "Toby", disp: "No" },
];

// Componente de la pantalla
export default function ScheduleScreen() {
  const { greeting, imageKey } = getGreetingAndImage();
  const currentImage = imageMap[imageKey] || imageMap.dia;

  const handleViewSchedules = () => {
    console.log("Navegar a la pantalla de horarios completos.");
  };

  // --- Función para renderizar una celda de la tabla ---
  const renderCell = (text: string, isHeader: boolean = false) => (
    <View style={[styles.cell, isHeader && styles.headerCell]}>
      <Text style={[styles.cellText, isHeader && styles.headerText]}>
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Título principal de la pantalla */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Horarios establecidos</Text>
          <Text style={styles.subtitle}>
            ¿Hora de comer? Nosotros nos encargamos.
          </Text>
        </View>

        {/* 2. Saludo dinámico y gráfico */}
        <View style={styles.greetingBox}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Image source={currentImage} style={styles.scheduleImage} />
        </View>

        {/* 3. Tabla de Horarios Próximos */}
        <Text style={styles.tableTitle}>Horarios próximos</Text>

        <View style={styles.table}>
          {/* Encabezados */}
          <View style={styles.row}>
            {renderCell("Hora", true)}
            {renderCell("Racion", true)}
            {renderCell("Perro", true)}
            {renderCell("Disp.", true)}
          </View>
          {/* Datos */}
          {SCHEDULE_DATA.map((item, index) => (
            <View key={index} style={styles.row}>
              {renderCell(item.hora)}
              {renderCell(item.racion)}
              {renderCell(item.perro)}
              {renderCell(item.disp)}
            </View>
          ))}
        </View>

        {/* Botón */}
        <Pressable style={styles.button} onPress={handleViewSchedules}>
          <Text style={styles.buttonText}>Ver horarios</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

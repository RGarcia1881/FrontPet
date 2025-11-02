// scheduleSection.tsx

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// La importación de la lógica usa tu alias '@/utils'
import { getGreetingAndImage } from "@/utils/greetingLogic";
// Asumiendo que has puesto los estilos aquí.
import { styles } from "@/styles/screen/schedule/scheduleSectionStyles";

// 🐛 CORREGIDO: Declaración de IMAGES limpia
const IMAGES = {
  dia: require("@/assets/images/Dia.png"),
  tarde: require("@/assets/images/Tarde.png"),
  noche: require("@/assets/images/Noche.png"),
};

// Tipo para la fila de la tabla
interface ScheduleItem {
  hora: string;
  racion: string;
  perro: string;
  disp: string;
}

// Datos de la tabla de ejemplo
const SCHEDULE_DATA: ScheduleItem[] = [
  { hora: "08:00", racion: "250g", perro: "Max", disp: "Sí" },
  { hora: "13:00", racion: "300g", perro: "Luna", disp: "Sí" },
  { hora: "18:00", racion: "250g", perro: "Toby", disp: "No" },
];

/**
 * Componente que muestra el saludo dinámico según la hora
 * y la tabla de próximos horarios de alimentación.
 */
export function ScheduleSection() {
  // Llama a la lógica para obtener el saludo y la clave de la imagen
  const { greeting, imageKey } = getGreetingAndImage();
  const sourceImage = IMAGES[imageKey];

  return (
    <View style={styles.container}>
      {/* ⭐️ SECCIÓN SUPERIOR: SALUDO Y BOTÓN ⭐️ */}
      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <TouchableOpacity style={styles.viewButton} activeOpacity={0.8}>
          <Text style={styles.viewButtonText}>Ver horarios</Text>
        </TouchableOpacity>
      </View>

      {/* ⭐️ SECCIÓN INFERIOR: IMAGEN Y TABLA ⭐️ */}
      <View style={styles.contentContainer}>
        {/* 1. Sección de la Imagen (Perrera) */}
        <View style={styles.imageContainer}>
          <Image
            source={sourceImage}
            style={styles.placeholderImage}
            alt={`Perrera de la ${imageKey}`}
          />
        </View>

        {/* 2. Sección de la Tabla de Horarios */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Horarios proximos</Text>
          <View style={styles.table}>
            {/* Encabezados de la Tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              {["Hora", "Racion", "Perro", "Disp"].map((header, index) => (
                <View
                  key={header}
                  style={[
                    styles.tableHeaderCell,
                    index === 3 && styles.lastCell,
                  ]}
                >
                  <Text style={styles.cellText}>{header}</Text>
                </View>
              ))}
            </View>

            {/* Filas de Datos */}
            {SCHEDULE_DATA.map((item, rowIndex) => (
              <View
                key={item.hora}
                style={[
                  styles.tableRow,
                  rowIndex === SCHEDULE_DATA.length - 1 && styles.lastRow,
                ]}
              >
                {/* Columnas de la Fila */}
                {Object.values(item).map((value, colIndex) => (
                  <View
                    key={colIndex}
                    style={[
                      styles.tableCell,
                      colIndex === 3 && styles.lastCell,
                    ]}
                  >
                    <Text style={styles.cellText}>{value}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
// Ya no necesitas 'export default', usa solo 'export function' para consistencia con tu proyecto.

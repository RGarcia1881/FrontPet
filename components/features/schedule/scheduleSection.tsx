// scheduleSection.tsx

import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getGreetingAndImage } from "@/utils/greetingLogic";
import { styles } from "@/styles/screen/schedule/scheduleSectionStyles";
import { useAuth } from "@/context/authContext";
import { getHorariosByUser, Horario } from "@/api/schedule";

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

/**
 * Componente que muestra el saludo dinámico según la hora
 * y la tabla de próximos horarios de alimentación.
 */
export function ScheduleSection() {
  const router = useRouter();
  const { user } = useAuth();
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Llama a la lógica para obtener el saludo y la clave de la imagen
  const { greeting, imageKey } = getGreetingAndImage();
  const sourceImage = IMAGES[imageKey];

  // Cargar horarios del usuario
  useEffect(() => {
    if (user?.id) {
      loadUserHorarios();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const loadUserHorarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const userHorarios = await getHorariosByUser(user.id);
      setHorarios(userHorarios);
    } catch (err) {
      console.error("Error cargando horarios:", err);
      setError("No se pudieron cargar los horarios");
    } finally {
      setLoading(false);
    }
  };

  // Convertir los horarios a formato de tabla
  const getTableData = (): ScheduleItem[] => {
    if (!horarios.length) return [];

    const tableData: ScheduleItem[] = [];

    horarios.forEach((horario) => {
      horario.horarios?.forEach((hora) => {
        tableData.push({
          hora: hora.substring(0, 5), // Formatear a "HH:MM"
          racion: "250g", // Valor por defecto o podrías obtenerlo del dispensador
          perro: horario.mascota_nombre || `Mascota ${horario.mascota}`,
          disp: horario.dispensador_nombre || `Disp ${horario.dispensador}`,
        });
      });
    });

    // Ordenar por hora y tomar solo los próximos 3 horarios
    return tableData.sort((a, b) => a.hora.localeCompare(b.hora)).slice(0, 3); // Mostrar solo los próximos 3 horarios
  };

  const tableData = getTableData();

  const handleViewSchedules = () => {
    router.push("/(tabs)/scheduleScreen");
  };

  // Si está cargando, mostrar un indicador
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <TouchableOpacity style={styles.viewButton} activeOpacity={0.8}>
            <Text style={styles.viewButtonText}>Ver horarios</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando horarios...</Text>
        </View>
      </View>
    );
  }

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <TouchableOpacity style={styles.viewButton} activeOpacity={0.8}>
            <Text style={styles.viewButtonText}>Ver horarios</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ⭐️ SECCIÓN SUPERIOR: SALUDO Y BOTÓN ⭐️ */}
      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <TouchableOpacity
          style={styles.viewButton}
          activeOpacity={0.8}
          onPress={handleViewSchedules}
        >
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
          <Text style={styles.scheduleTitle}>
            Horarios próximos {tableData.length > 0 && `(${tableData.length})`}
          </Text>
          <View style={styles.table}>
            {/* Encabezados de la Tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              {["Hora", "Ración", "Perro", "Disp"].map((header, index) => (
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
            {tableData.length > 0 ? (
              tableData.map((item, rowIndex) => (
                <View
                  key={`${item.hora}-${rowIndex}`}
                  style={[
                    styles.tableRow,
                    rowIndex === tableData.length - 1 && styles.lastRow,
                  ]}
                >
                  {/* Columnas de la Fila */}
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{item.hora}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{item.racion}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{item.perro}</Text>
                  </View>
                  <View style={[styles.tableCell, styles.lastCell]}>
                    <Text style={styles.cellText}>{item.disp}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No hay horarios programados
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

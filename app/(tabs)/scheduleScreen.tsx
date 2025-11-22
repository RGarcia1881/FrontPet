// app/(tabs)/scheduleScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getGreetingAndImage } from "@/utils/greetingLogic";
import { styles } from "@/styles/screen/schedule/scheduleScreenStyles";
import { useAuth } from "@/context/authContext";
import { getHorariosByUser, Horario } from "@/api/schedule";
import { AppColors } from "@/styles/global/theme";

// Mapeo de claves a las imágenes correspondientes
const imageMap = {
  dia: require("@/assets/images/Dia.png"),
  tarde: require("@/assets/images/Tarde.png"),
  noche: require("@/assets/images/Noche.png"),
};

export default function ScheduleScreen() {
  const { user } = useAuth();
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { greeting, imageKey } = getGreetingAndImage();
  const currentImage = imageMap[imageKey] || imageMap.dia;

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

  const tableData = React.useMemo(() => {
    if (!horarios.length) return [];
    const data: {
      hora: string;
      racion: string;
      perro: string;
      disp: string;
    }[] = [];

    horarios.forEach((horario) => {
      horario.horarios?.forEach((hora) => {
        data.push({
          hora: hora.substring(0, 5),
          racion: "250g",
          perro: horario.mascota_nombre || `Mascota ${horario.mascota}`,
          disp: horario.dispensador_nombre || `Disp ${horario.dispensador}`,
        });
      });
    });

    return data.sort((a, b) => a.hora.localeCompare(b.hora));
  }, [horarios]);

  const handleViewSchedules = () => {
    console.log("Navegar a la pantalla de horarios completos.");
  };

  const renderCell = (
    text: string,
    isHeader: boolean = false,
    isLastCell: boolean = false
  ) => (
    <View
      style={[
        styles.cell,
        isHeader && styles.headerCell,
        isLastCell && styles.lastCell,
      ]}
    >
      <Text style={[styles.cellText, isHeader && styles.headerText]}>
        {text}
      </Text>
    </View>
  );

  // Mostrar loading
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.primary} />
          <Text style={styles.loadingText}>Cargando horarios...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadUserHorarios}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Horarios establecidos</Text>
          <Text style={styles.subtitle}>
            ¿Hora de comer? Nosotros nos encargamos.
          </Text>
        </View>

        <View style={styles.greetingBox}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Image source={currentImage} style={styles.scheduleImage} />
        </View>

        <Text style={styles.tableTitle}>
          Horarios próximos {tableData.length > 0 && `(${tableData.length})`}
        </Text>

        <View style={styles.table}>
          <View style={styles.row}>
            {renderCell("Hora", true, false)}
            {renderCell("Ración", true, false)}
            {renderCell("Perro", true, false)}
            {renderCell("Disp.", true, true)}
          </View>

          {tableData.length > 0 ? (
            tableData.map((item, index) => {
              const isLastRow = index === tableData.length - 1;
              return (
                <View
                  key={`${item.hora}-${index}`}
                  style={[styles.row, isLastRow && styles.lastRow]}
                >
                  {renderCell(item.hora, false, false)}
                  {renderCell(item.racion, false, false)}
                  {renderCell(item.perro, false, false)}
                  {renderCell(item.disp, false, true)}
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No hay horarios programados para tus mascotas
              </Text>
            </View>
          )}
        </View>

        <Pressable style={styles.button} onPress={handleViewSchedules}>
          <Text style={styles.buttonText}>Ver horarios completos</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

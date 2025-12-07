// app/(tabs)/scheduleScreen.tsx - Versión corregida completa
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { getGreetingAndImage } from "@/utils/greetingLogic";
import { styles } from "@/styles/screen/schedule/scheduleScreenStyles";
import { useAuth } from "@/context/authContext";
import { getHorariosByUser, Horario, deleteHorario } from "@/api/schedule";
import { AppColors } from "@/styles/global/theme";
import { ScheduleModal } from "@/components/features/schedule/scheduleModal";
import { Ionicons } from "@expo/vector-icons";

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
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Horario | null>(
    null
  );

  const { greeting, imageKey } = getGreetingAndImage();
  const currentImage = imageMap[imageKey] || imageMap.dia;

  useEffect(() => {
    if (user?.id) {
      loadUserHorarios();
    } else {
      setLoading(false);
      // Si no hay usuario, mostrar mensaje
      if (!loading && !error) {
        setError("Debes iniciar sesión para ver los horarios");
      }
    }
  }, [user?.id]);

  const loadUserHorarios = async () => {
    // Verificar que el usuario existe
    if (!user?.id) {
      setError("Usuario no autenticado");
      setLoading(false);
      return;
    }

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

  const handleAddSchedule = () => {
    if (!user) {
      Alert.alert(
        "Acceso requerido",
        "Debes iniciar sesión para agregar horarios",
        [{ text: "Entendido" }]
      );
      return;
    }
    setSelectedSchedule(null);
    setShowScheduleModal(true);
  };

  const handleEditSchedule = (horario: Horario) => {
    if (!user) {
      Alert.alert(
        "Acceso requerido",
        "Debes iniciar sesión para editar horarios",
        [{ text: "Entendido" }]
      );
      return;
    }

    // Encontrar el horario completo con todos los datos
    const fullHorario = horarios.find((h) => h.id === horario.id);
    if (fullHorario) {
      setSelectedSchedule(fullHorario);
      setShowScheduleModal(true);
    }
  };

  const handleDeleteSchedule = async (horario: Horario) => {
    if (!user) {
      Alert.alert(
        "Acceso requerido",
        "Debes iniciar sesión para eliminar horarios",
        [{ text: "Entendido" }]
      );
      return;
    }

    Alert.alert(
      "Eliminar Horario",
      `¿Estás seguro de que quieres eliminar los horarios de ${
        horario.mascota_nombre || `Mascota ${horario.mascota}`
      }? Esta acción eliminará todos los horarios programados para esta mascota.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteHorario(horario.id);

              // Actualizar lista local
              setHorarios((prev) => prev.filter((h) => h.id !== horario.id));

              Alert.alert("Éxito", "Horario eliminado correctamente");
            } catch (error) {
              console.error("Error eliminando horario:", error);
              Alert.alert("Error", "No se pudo eliminar el horario");
            }
          },
        },
      ]
    );
  };

  const handleDeleteTimeSlot = (
    horarioId: number,
    timeIndex: number,
    timeSlot: string
  ) => {
    if (!user) {
      Alert.alert(
        "Acceso requerido",
        "Debes iniciar sesión para eliminar horarios",
        [{ text: "Entendido" }]
      );
      return;
    }

    Alert.alert(
      "Eliminar Horario Específico",
      `¿Estás seguro de que quieres eliminar el horario ${timeSlot}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // Encontrar el horario a editar
              const horarioToEdit = horarios.find((h) => h.id === horarioId);
              if (!horarioToEdit) return;

              // Filtrar el horario específico
              const updatedHorarios = horarioToEdit.horarios.filter(
                (_, index) => index !== timeIndex
              );

              // Si quedan horarios, actualizar; si no, eliminar el registro completo
              if (updatedHorarios.length > 0) {
                // Actualizar el horario
                // Por ahora, recargamos todos los horarios
                loadUserHorarios();
              } else {
                // Eliminar el registro completo
                await deleteHorario(horarioId);
                setHorarios((prev) => prev.filter((h) => h.id !== horarioId));
              }

              Alert.alert("Éxito", "Horario eliminado correctamente");
            } catch (error) {
              console.error("Error eliminando horario:", error);
              Alert.alert("Error", "No se pudo eliminar el horario");
            }
          },
        },
      ]
    );
  };

  const handleScheduleSuccess = (updatedSchedule: Horario) => {
    if (selectedSchedule) {
      // Actualizar horario existente
      setHorarios((prev) =>
        prev.map((h) => (h.id === updatedSchedule.id ? updatedSchedule : h))
      );
    } else {
      // Agregar nuevo horario
      setHorarios((prev) => [...prev, updatedSchedule]);
    }

    setShowScheduleModal(false);
    setSelectedSchedule(null);
  };

  const tableData = React.useMemo(() => {
    if (!horarios.length) return [];
    const data: {
      id: number;
      hora: string;
      perro: string;
      disp: string;
      timeIndex: number;
      horarioId: number;
    }[] = [];

    horarios.forEach((horario) => {
      horario.horarios?.forEach((hora, index) => {
        data.push({
          id: horario.id * 100 + index, // ID único para cada fila
          hora: hora.substring(0, 5),
          perro: horario.mascota_nombre || `Mascota ${horario.mascota}`,
          disp: horario.dispensador_nombre || `Disp ${horario.dispensador}`,
          timeIndex: index,
          horarioId: horario.id,
        });
      });
    });

    return data.sort((a, b) => a.hora.localeCompare(b.hora));
  }, [horarios]);

  const handleViewSchedules = () => {
    // Navegar a una pantalla completa de horarios si la tienes
    console.log("Navegar a la pantalla de horarios completos.");
  };

  const renderCell = (
    text: string,
    isHeader: boolean = false,
    isLastCell: boolean = false,
    options?: {
      showEditIcon?: boolean;
      showDeleteIcon?: boolean;
      onEdit?: () => void;
      onDelete?: () => void;
    }
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

      {options?.showEditIcon && !isHeader && options?.onEdit && (
        <TouchableOpacity style={styles.editButton} onPress={options.onEdit}>
          <Ionicons name="create-outline" size={16} color="#007AFF" />
        </TouchableOpacity>
      )}

      {options?.showDeleteIcon && !isHeader && options?.onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={options.onDelete}
        >
          <Ionicons name="trash-outline" size={16} color="#FF3B30" />
        </TouchableOpacity>
      )}
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
          {user?.id ? (
            <Pressable style={styles.retryButton} onPress={loadUserHorarios}>
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </Pressable>
          ) : (
            <Text style={styles.loginHint}>
              Inicia sesión para acceder a los horarios
            </Text>
          )}
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

        {/* Botón para agregar nuevo horario */}
        <Pressable style={styles.addButton} onPress={handleAddSchedule}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Agregar Horario</Text>
        </Pressable>

        <Text style={styles.tableTitle}>
          Horarios próximos {tableData.length > 0 && `(${tableData.length})`}
        </Text>

        <View style={styles.table}>
          <View style={styles.row}>
            {renderCell("Hora", true, false)}
            {renderCell("Perro", true, false)}
            {renderCell("Disp.", true, true)}
          </View>

          {tableData.length > 0 ? (
            tableData.map((item) => {
              // Encontrar el horario completo para esta fila
              const horarioCompleto = horarios.find(
                (h) => h.id === item.horarioId
              );

              return (
                <View key={item.id} style={[styles.row]}>
                  {renderCell(item.hora, false, false, {
                    showEditIcon: true,
                    onEdit: () =>
                      horarioCompleto && handleEditSchedule(horarioCompleto),
                  })}
                  {renderCell(item.perro, false, false)}
                  {renderCell(item.disp, false, true, {
                    showDeleteIcon: true,
                    onDelete: () =>
                      horarioCompleto && handleDeleteSchedule(horarioCompleto),
                  })}
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {user
                  ? "No hay horarios programados para tus mascotas"
                  : "Inicia sesión para ver tus horarios"}
              </Text>
              {user && (
                <Pressable
                  style={styles.addButtonSmall}
                  onPress={handleAddSchedule}
                >
                  <Text style={styles.addButtonSmallText}>
                    Agregar primer horario
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </View>

        {user && (
          <Pressable style={styles.button} onPress={handleViewSchedules}>
            <Text style={styles.buttonText}>Ver horarios completos</Text>
          </Pressable>
        )}
      </ScrollView>

      {/* Modal para agregar/editar horarios */}
      <ScheduleModal
        visible={showScheduleModal}
        schedule={selectedSchedule}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedSchedule(null);
        }}
        onSuccess={handleScheduleSuccess}
      />
    </SafeAreaView>
  );
}

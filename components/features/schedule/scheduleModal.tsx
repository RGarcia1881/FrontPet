// components/schedule/scheduleModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Horario, createHorario, updateHorario } from "@/api/schedule";
import { getPets, Pet } from "@/api/pets";
import { getDispensers, Dispenser } from "@/api/dispensers";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/authContext";

interface ScheduleModalProps {
  visible: boolean;
  schedule: Horario | null;
  onClose: () => void;
  onSuccess: (updatedSchedule: Horario) => void;
}

export function ScheduleModal({
  visible,
  schedule,
  onClose,
  onSuccess,
}: ScheduleModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [dispensers, setDispensers] = useState<Dispenser[]>([]);
  const [showTimePickerIndex, setShowTimePickerIndex] = useState<number | null>(
    null
  );

  const [formData, setFormData] = useState({
    mascota: "",
    dispensador: "",
  });

  const [timeSlots, setTimeSlots] = useState<string[]>(["08:00"]);

  // Cargar mascotas y dispensadores del usuario
  useEffect(() => {
    if (visible && user) {
      loadUserData();
    }
  }, [visible, user]);

  // Inicializar datos del formulario cuando se abre el modal
  useEffect(() => {
    if (schedule) {
      setFormData({
        mascota: schedule.mascota?.toString() || "",
        dispensador: schedule.dispensador?.toString() || "",
      });
      setTimeSlots(schedule.horarios || ["08:00"]);
    } else {
      setFormData({ mascota: "", dispensador: "" });
      setTimeSlots(["08:00"]);
    }
    setShowTimePickerIndex(null);
  }, [schedule, visible]);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Cargar mascotas del usuario
      const userPets = await getPets();
      setPets(userPets);

      // Cargar dispensadores del usuario
      const userDispensers = await getDispensers();
      setDispensers(userDispensers);

      // Si hay datos, establecer valores por defecto
      if (userPets.length > 0 && !formData.mascota) {
        setFormData((prev) => ({
          ...prev,
          mascota: userPets[0].id.toString(),
        }));
      }

      if (userDispensers.length > 0 && !formData.dispensador) {
        setFormData((prev) => ({
          ...prev,
          dispensador: userDispensers[0].id.toString(),
        }));
      }
    } catch (error) {
      console.error("Error cargando datos del usuario:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron cargar las mascotas o dispensadores",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (
    event: any,
    selectedTime: Date | undefined,
    index: number
  ) => {
    setShowTimePickerIndex(null);

    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      const newTime = `${hours}:${minutes}`;

      const updatedSlots = [...timeSlots];
      updatedSlots[index] = newTime;
      setTimeSlots(updatedSlots);
    }
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, "08:00"]);
  };

  const removeTimeSlot = (index: number) => {
    if (timeSlots.length > 1) {
      const updatedSlots = timeSlots.filter((_, i) => i !== index);
      setTimeSlots(updatedSlots);
    } else {
      Alert.alert(
        "No se puede eliminar",
        "Debe haber al menos un horario programado",
        [{ text: "Entendido" }]
      );
    }
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!formData.mascota || !formData.dispensador) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debe seleccionar una mascota y un dispensador",
      });
      return;
    }

    if (timeSlots.some((slot) => !slot.trim())) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los horarios deben tener una hora válida",
      });
      return;
    }

    try {
      setLoading(true);

      const scheduleData = {
        mascota: parseInt(formData.mascota),
        dispensador: parseInt(formData.dispensador),
        usuario: user?.id || 0,
        horarios: timeSlots.map((slot) => slot.trim()),
      };

      let response: Horario;

      if (schedule) {
        // Actualizar horario existente
        response = await updateHorario(schedule.id, scheduleData);
        Toast.show({
          type: "success",
          text1: "¡Horario actualizado!",
          text2: "Los cambios se guardaron correctamente",
        });
      } else {
        // Crear nuevo horario
        response = await createHorario(scheduleData);
        Toast.show({
          type: "success",
          text1: "¡Horario creado!",
          text2: "El horario se programó correctamente",
        });
      }

      onSuccess(response);
      onClose();
    } catch (error: any) {
      console.error("Error guardando horario:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.error || "No se pudo guardar el horario",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {schedule ? "Editar Horario" : "Nuevo Horario"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Cargando...</Text>
              </View>
            ) : (
              <>
                {/* Selección de Mascota */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mascota *</Text>
                  <View style={styles.selectContainer}>
                    {pets.length > 0 ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.petsScroll}
                      >
                        {pets.map((pet) => (
                          <TouchableOpacity
                            key={pet.id}
                            style={[
                              styles.petOption,
                              formData.mascota === pet.id.toString() &&
                                styles.selectedOption,
                            ]}
                            onPress={() =>
                              setFormData({
                                ...formData,
                                mascota: pet.id.toString(),
                              })
                            }
                          >
                            <Text
                              style={[
                                styles.petOptionText,
                                formData.mascota === pet.id.toString() &&
                                  styles.selectedOptionText,
                              ]}
                            >
                              {pet.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    ) : (
                      <Text style={styles.noDataText}>
                        No tienes mascotas registradas
                      </Text>
                    )}
                  </View>
                </View>

                {/* Selección de Dispensador */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Dispensador *</Text>
                  <View style={styles.selectContainer}>
                    {dispensers.length > 0 ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.petsScroll}
                      >
                        {dispensers.map((disp) => (
                          <TouchableOpacity
                            key={disp.id}
                            style={[
                              styles.petOption,
                              formData.dispensador === disp.id.toString() &&
                                styles.selectedOption,
                            ]}
                            onPress={() =>
                              setFormData({
                                ...formData,
                                dispensador: disp.id.toString(),
                              })
                            }
                          >
                            <Text
                              style={[
                                styles.petOptionText,
                                formData.dispensador === disp.id.toString() &&
                                  styles.selectedOptionText,
                              ]}
                            >
                              {disp.ubication || `Dispensador ${disp.id}`}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    ) : (
                      <Text style={styles.noDataText}>
                        No tienes dispensadores registrados
                      </Text>
                    )}
                  </View>
                </View>

                {/* Lista de Horarios */}
                <View style={styles.timeSlotsContainer}>
                  <View style={styles.timeSlotsHeader}>
                    <Text style={styles.label}>Horarios *</Text>
                    <TouchableOpacity
                      style={styles.addTimeButton}
                      onPress={addTimeSlot}
                    >
                      <Ionicons name="add-circle" size={20} color="#007AFF" />
                      <Text style={styles.addTimeText}>Agregar horario</Text>
                    </TouchableOpacity>
                  </View>

                  {timeSlots.map((time, index) => (
                    <View key={index} style={styles.timeSlotRow}>
                      <View style={styles.timeSlotContainer}>
                        <Text style={styles.timeLabel}>
                          Horario {index + 1}
                        </Text>
                        <TouchableOpacity
                          style={styles.timePickerButton}
                          onPress={() => setShowTimePickerIndex(index)}
                        >
                          <Text style={styles.timePickerText}>
                            {formatTime(time)}
                          </Text>
                          <Ionicons
                            name="time-outline"
                            size={20}
                            color="#007AFF"
                          />
                        </TouchableOpacity>

                        {timeSlots.length > 1 && (
                          <TouchableOpacity
                            style={styles.removeTimeButton}
                            onPress={() => removeTimeSlot(index)}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={18}
                              color="#FF3B30"
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {showTimePickerIndex === index && (
                        <DateTimePicker
                          value={new Date(`2024-01-01T${time}:00`)}
                          mode="time"
                          display="spinner"
                          onChange={(event, selectedTime) =>
                            handleTimeChange(event, selectedTime, index)
                          }
                        />
                      )}
                    </View>
                  ))}
                </View>

                {/* Botones de acción */}
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={[styles.button, styles.cancelButton]}
                    onPress={onClose}
                    disabled={loading}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.button,
                      styles.saveButton,
                      (!formData.mascota ||
                        !formData.dispensador ||
                        timeSlots.length === 0) &&
                        styles.disabledButton,
                    ]}
                    onPress={handleSubmit}
                    disabled={
                      loading ||
                      !formData.mascota ||
                      !formData.dispensador ||
                      timeSlots.length === 0
                    }
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.saveButtonText}>
                        {schedule ? "Guardar Cambios" : "Crear Horario"}
                      </Text>
                    )}
                  </Pressable>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  scrollView: {
    maxHeight: 500,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  selectContainer: {
    minHeight: 50,
  },
  petsScroll: {
    flexGrow: 0,
  },
  petOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
    borderColor: "#0056CC",
  },
  petOptionText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#fff",
  },
  noDataText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    paddingVertical: 10,
  },
  timeSlotsContainer: {
    marginBottom: 30,
  },
  timeSlotsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  addTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addTimeText: {
    marginLeft: 5,
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 14,
  },
  timeSlotRow: {
    marginBottom: 15,
  },
  timeSlotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
  },
  timeLabel: {
    fontSize: 14,
    color: "#666",
    minWidth: 80,
  },
  timePickerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  timePickerText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  removeTimeButton: {
    padding: 8,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

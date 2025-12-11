// components/features/pet/PetFormModal.tsx

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // 🔥 NUEVO: Importar ImagePicker
import { Pet } from "@/api/pets";
import { createPet, updatePet } from "@/api/pets";
import { useAuth } from "@/context/authContext";

interface PetFormModalProps {
  visible: boolean;
  pet?: Pet | null;
  onClose: () => void;
  onSuccess: (pet: Pet) => void;
}

export const PetFormModal: React.FC<PetFormModalProps> = ({
  visible,
  pet,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    weight: 0,
    age: 0,
    race: "",
    image: "", // Ahora será un base64 o URI local
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Solicitar permisos para la galería al montar
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos necesarios",
          "Se requieren permisos para acceder a la galería de fotos."
        );
      }
    })();
  }, []);

  // Cargar datos de la mascota si está en modo edición
  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name,
        weight: pet.weight,
        age: pet.age,
        race: pet.race,
        image: pet.image || "",
      });
      // Si la mascota ya tiene imagen (URL del servidor), mostrarla
      if (pet.image) {
        setSelectedImage(pet.image);
      }
    } else {
      // Resetear formulario
      setFormData({
        name: "",
        weight: 0,
        age: 0,
        race: "",
        image: "",
      });
      setSelectedImage(null);
    }
    setErrors({});
  }, [pet, visible]);

  // 🔥 FUNCIÓN PARA SELECCIONAR IMAGEN DESDE LA GALERÍA
  // En las funciones pickImage y takePhoto, asegúrate de guardar base64 completo

  const pickImage = async () => {
    try {
      setImageLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Reducir calidad para evitar base64 muy grande
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        // Guardar el URI para mostrar preview
        setSelectedImage(asset.uri);

        // Guardar el base64 completo
        if (asset.base64) {
          // 🔥 IMPORTANTE: Construir string base64 completo
          const base64String = `data:${asset.type || "image/jpeg"};base64,${
            asset.base64
          }`;
          console.log(
            "📸 [FRONTEND] Base64 generado, longitud:",
            base64String.length
          );

          setFormData((prev) => ({
            ...prev,
            image: base64String,
          }));
        } else {
          console.error("❌ [FRONTEND] No se obtuvo base64 de la imagen");
          Alert.alert("Error", "No se pudo procesar la imagen");
        }
      }
    } catch (error) {
      console.error("Error seleccionando imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    } finally {
      setImageLoading(false);
    }
  };

  // 🔥 FUNCIÓN PARA TOMAR FOTO CON LA CÁMARA
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos necesarios",
          "Se requieren permisos para usar la cámara."
        );
        return;
      }

      setImageLoading(true);

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);

        if (asset.base64) {
          setFormData((prev) => ({
            ...prev,
            image: `data:image/jpeg;base64,${asset.base64}`,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            image: asset.uri,
          }));
        }
      }
    } catch (error) {
      console.error("Error tomando foto:", error);
      Alert.alert("Error", "No se pudo tomar la foto");
    } finally {
      setImageLoading(false);
    }
  };

  // 🔥 FUNCIÓN PARA ELIMINAR IMAGEN SELECCIONADA
  const removeImage = () => {
    setSelectedImage(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (formData.weight <= 0) {
      newErrors.weight = "El peso debe ser mayor a 0";
    }

    if (formData.age <= 0) {
      newErrors.age = "La edad debe ser mayor a 0";
    }

    if (!formData.race.trim()) {
      newErrors.race = "La raza es requerida";
    }

    // La imagen ahora es opcional

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Por favor corrige los errores en el formulario");
      return;
    }

    console.log("🔄 [FRONTEND] Enviando datos de mascota...");
    console.log("📝 [FRONTEND] Datos del formulario:", formData);
    console.log("🖼️ [FRONTEND] ¿Tiene imagen?:", !!formData.image);
    console.log(
      "🖼️ [FRONTEND] Tipo de imagen:",
      formData.image?.substring(0, 50)
    );

    setLoading(true);
    try {
      let savedPet: Pet;

      // PREPARAR DATOS CON image_base64
      const petDataToSend: any = {
        name: formData.name,
        weight: formData.weight,
        age: formData.age,
        race: formData.race,
      };

      // Si hay imagen, enviar como image_base64
      if (formData.image) {
        petDataToSend.image_base64 = formData.image;
        console.log("📤 [FRONTEND] Enviando imagen base64...");
      } else if (pet && pet.image && !formData.image) {
        // Si estamos editando y se eliminó la imagen, enviar string vacío
        petDataToSend.image_base64 = "";
        console.log("🗑️ [FRONTEND] Eliminando imagen (enviando string vacío)");
      }

      console.log("🚀 [FRONTEND] Datos a enviar:", {
        ...petDataToSend,
        image_base64: petDataToSend.image_base64
          ? `${petDataToSend.image_base64.substring(0, 50)}...`
          : "No hay imagen",
      });

      if (pet) {
        // Modo edición
        console.log("✏️ [FRONTEND] Actualizando mascota ID:", pet.id);
        savedPet = await updatePet(pet.id, petDataToSend);
        console.log("✅ [FRONTEND] Mascota actualizada:", savedPet);
        Alert.alert("Éxito", "Mascota actualizada correctamente");
      } else {
        // Modo creación
        console.log("➕ [FRONTEND] Creando nueva mascota");
        savedPet = await createPet(petDataToSend);
        console.log("✅ [FRONTEND] Mascota creada:", savedPet);
        Alert.alert("Éxito", "Mascota creada correctamente");
      }

      onSuccess(savedPet);
    } catch (error: any) {
      console.error("❌ [FRONTEND] Error saving pet:", error);
      console.error("❌ [FRONTEND] Respuesta error:", error.response?.data);
      Alert.alert(
        "Error",
        error.response?.data?.detail ||
          error.message ||
          "No se pudo guardar la mascota"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === "weight" || field === "age" ? parseFloat(value) || 0 : value,
    }));

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>
              {pet ? "Editar Mascota" : "Nueva Mascota"}
            </Text>

            {/* 🔥 SECCIÓN DE IMAGEN */}
            <View style={styles.imageSection}>
              <Text style={styles.sectionLabel}>Imagen de la mascota</Text>

              {selectedImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.imagePreview}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={removeImage}
                  >
                    <Text style={styles.removeImageText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>
                    No hay imagen seleccionada
                  </Text>
                </View>
              )}

              <View style={styles.imageButtons}>
                <TouchableOpacity
                  style={[styles.imageButton, styles.galleryButton]}
                  onPress={pickImage}
                  disabled={imageLoading}
                >
                  {imageLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.imageButtonText}>Galería</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.imageButton, styles.cameraButton]}
                  onPress={takePhoto}
                  disabled={imageLoading}
                >
                  <Text style={styles.imageButtonText}>Cámara</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={formData.name}
                onChangeText={(value) => handleChange("name", value)}
                placeholder="Ej: Max"
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Raza *</Text>
              <TextInput
                style={[styles.input, errors.race && styles.inputError]}
                value={formData.race}
                onChangeText={(value) => handleChange("race", value)}
                placeholder="Ej: Labrador"
              />
              {errors.race && (
                <Text style={styles.errorText}>{errors.race}</Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Edad (años) *</Text>
                <TextInput
                  style={[styles.input, errors.age && styles.inputError]}
                  value={formData.age.toString()}
                  onChangeText={(value) => handleChange("age", value)}
                  placeholder="3"
                  keyboardType="numeric"
                />
                {errors.age && (
                  <Text style={styles.errorText}>{errors.age}</Text>
                )}
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Peso (kg) *</Text>
                <TextInput
                  style={[styles.input, errors.weight && styles.inputError]}
                  value={formData.weight.toString()}
                  onChangeText={(value) => handleChange("weight", value)}
                  placeholder="15.5"
                  keyboardType="numeric"
                />
                {errors.weight && (
                  <Text style={styles.errorText}>{errors.weight}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    {pet ? "Actualizar" : "Crear"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%", // Aumentado para acomodar la sección de imagen
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  // 🔥 ESTILOS NUEVOS PARA LA SECCIÓN DE IMAGEN
  imageSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  imagePreviewContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 12,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#dc3545",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
  },
  imagePlaceholderText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  imageButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 120,
  },
  galleryButton: {
    backgroundColor: "#6c757d",
  },
  cameraButton: {
    backgroundColor: "#28a745",
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  // 🔥 ESTILOS EXISTENTES
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
  inputError: {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

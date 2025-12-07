// components/user/userProfileModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  UserProfileData,
  UserUpdatePayload,
  updateCurrentUser,
} from "@/api/users";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/context/authContext";
import Toast from "react-native-toast-message";

interface UserProfileModalProps {
  visible: boolean;
  user: UserProfileData | null;
  onClose: () => void;
  onSuccess: (updatedUser: UserProfileData) => void;
}

export function UserProfileModal({
  visible,
  user,
  onClose,
  onSuccess,
}: UserProfileModalProps) {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // Inicializar datos del formulario cuando se abre el modal
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
      setImageUri(user.image || user.image_url || null);
      setImageBase64(null);
    }
  }, [user, visible]);

  const handleImagePick = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permiso requerido",
          "Necesitamos permiso para acceder a tus fotos"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setImageUri(asset.uri);

        if (asset.base64) {
          const base64Image = `data:image/jpeg;base64,${asset.base64}`;
          setImageBase64(base64Image);
        }
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo seleccionar la imagen",
      });
    }
  };

  const handleRemoveImage = () => {
    Alert.alert(
      "Eliminar foto de perfil",
      "¿Estás seguro de que quieres eliminar tu foto de perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setImageUri(null);
            setImageBase64("");
          },
        },
      ]
    );
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!formData.first_name.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El nombre es obligatorio",
      });
      return;
    }

    if (!formData.email.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El email es obligatorio",
      });
      return;
    }

    try {
      setLoading(true);

      const updateData: UserUpdatePayload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
      };

      // Si hay una imagen nueva o se eliminó, agregarla al payload
      if (imageBase64 !== null) {
        updateData.image_base64 = imageBase64;
      }

      const updatedUser = await updateCurrentUser(updateData);

      // Actualizar contexto de autenticación
      await refreshUser();

      // Notificar éxito al componente padre
      onSuccess(updatedUser);

      Toast.show({
        type: "success",
        text1: "¡Perfil actualizado!",
        text2: "Tus cambios se guardaron correctamente",
      });

      onClose();
    } catch (error: any) {
      console.error("Error actualizando perfil:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.error || "No se pudo actualizar el perfil",
      });
    } finally {
      setLoading(false);
    }
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
              {user ? "Editar Perfil" : "Mi Perfil"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Sección de Foto de Perfil */}
            <View style={styles.imageSection}>
              <View style={styles.imageContainer}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Ionicons name="person" size={60} color="#ccc" />
                  </View>
                )}

                <View style={styles.imageButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.imageButton, styles.changeButton]}
                    onPress={handleImagePick}
                  >
                    <Ionicons name="camera" size={20} color="#fff" />
                    <Text style={styles.imageButtonText}>Cambiar</Text>
                  </TouchableOpacity>

                  {imageUri && (
                    <TouchableOpacity
                      style={[styles.imageButton, styles.removeButton]}
                      onPress={handleRemoveImage}
                    >
                      <Ionicons name="trash" size={20} color="#fff" />
                      <Text style={styles.imageButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {/* Formulario */}
            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.first_name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, first_name: text })
                  }
                  placeholder="Tu nombre"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                  style={styles.input}
                  value={formData.last_name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, last_name: text })
                  }
                  placeholder="Tu apellido"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  placeholder="tu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
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
                style={[styles.button, styles.saveButton]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
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
  imageSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  imageButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    gap: 5,
  },
  changeButton: {
    backgroundColor: "#007AFF",
  },
  removeButton: {
    backgroundColor: "#FF3B30",
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  formSection: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
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
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
} as const;

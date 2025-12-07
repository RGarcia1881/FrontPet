// components/features/pet/PetDetailModal.tsx

import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Pet } from "@/api/pets";
import { MaterialIcons } from "@expo/vector-icons";

interface PetDetailModalProps {
  visible: boolean;
  pet: Pet | null;
  onClose: () => void;
  onEdit: (pet: Pet) => void;
  onDelete: () => void; // 🔥 AGREGAR ESTA PROPIEDAD
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({
  visible,
  pet,
  onClose,
  onEdit,
  onDelete, // 🔥 AGREGAR AQUÍ
}) => {
  if (!pet) return null;

  const PET_IMAGES = [
    require("@/assets/images/P1.png"),
    require("@/assets/images/P2.png"),
    require("@/assets/images/P3.png"),
    require("@/assets/images/P4.png"),
  ];

  const imageIndex = pet.id % 4; // Simple forma de asignar imagen

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
            {/* Botón de cerrar */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>

            {/* Imagen de la mascota */}
            <View style={styles.imageContainer}>
              <Image
                source={PET_IMAGES[imageIndex]}
                style={styles.petImage}
                resizeMode="contain"
              />
            </View>

            {/* Información de la mascota */}
            <View style={styles.infoContainer}>
              <Text style={styles.petName}>{pet.name}</Text>

              <View style={styles.infoRow}>
                <MaterialIcons name="pets" size={20} color="#666" />
                <Text style={styles.infoText}>Raza: {pet.race}</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="cake" size={20} color="#666" />
                <Text style={styles.infoText}>Edad: {pet.age} años</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="scale" size={20} color="#666" />
                <Text style={styles.infoText}>Peso: {pet.weight} kg</Text>
              </View>
            </View>

            {/* Botones de acción */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => onEdit(pet)}
              >
                <MaterialIcons name="edit" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={onDelete} // 🔥 USAR LA PROPIEDAD onDelete
              >
                <MaterialIcons name="delete" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Eliminar</Text>
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
    maxHeight: "80%",
  },
  scrollContent: {
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    marginBottom: 30,
  },
  petName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

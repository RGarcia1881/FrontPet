import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { petsScreenStyles as styles } from "@/styles/screen/pets/petScreenStyles";
import { getPets, Pet as PetType, deletePet } from "@/api/pets";
import { useAuth } from "@/context/authContext";
import { PetFormModal } from "./petFormModal";
import { PetDetailModal } from "./petDetailModal";

// 🔥 IMÁGENES LOCALES PREDEFINIDAS
const PET_IMAGES = [
  require("@/assets/images/P1.png"),
  require("@/assets/images/P2.png"),
  require("@/assets/images/P3.png"),
  require("@/assets/images/P4.png"),
];

// 🔥 INTERFAZ ACTUALIZADA
interface PetProps {
  pet: PetType;
  style: any;
  onView: (pet: PetType) => void;
  imageIndex: number;
}

// 🔥 COMPONENTE Pet ACTUALIZADO
const Pet = ({ pet, style, onView, imageIndex }: PetProps) => (
  <View style={[styles.petContainer, style]}>
    <Image
      source={PET_IMAGES[imageIndex]}
      style={styles.petImage}
      resizeMode="contain"
    />
    <Text style={styles.petNameText}>{pet.name}</Text>
    <Pressable onPress={() => onView(pet)} style={styles.viewButton}>
      <Text style={styles.viewButtonText}>Ver</Text>
    </Pressable>
  </View>
);

// --- Componente principal de la Escena ---
interface PetSceneProps {
  onAddMember: () => void;
}

export function PetScene({ onAddMember }: PetSceneProps) {
  const [pets, setPets] = useState<PetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const { isAuthenticated } = useAuth();

  // 🔥 FUNCIÓN PARA CARGAR MASCOTAS
  const loadPets = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userPets = await getPets();
      setPets(userPets);
    } catch (err: any) {
      console.error("Error cargando mascotas:", err);
      setError("Error al cargar las mascotas");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 EFECTO PARA CARGAR MASCOTAS AL MONTAR EL COMPONENTE
  useEffect(() => {
    loadPets();
  }, [isAuthenticated]);

  const handleViewPet = (pet: PetType) => {
    setSelectedPet(pet);
    setShowDetailModal(true);
  };

  const handleAddPet = () => {
    setSelectedPet(null); // Asegurar que no hay mascota seleccionada
    setShowFormModal(true);
  };

  const handleEditPet = (pet: PetType) => {
    setSelectedPet(pet);
    setShowFormModal(true);
  };

  const handleDeletePet = async (petId: number) => {
    Alert.alert(
      "Eliminar Mascota",
      `¿Estás seguro de que quieres eliminar a ${
        pets.find((p) => p.id === petId)?.name
      }? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePet(petId);
              Alert.alert("Éxito", "Mascota eliminada correctamente");
              // Actualizar lista local sin recargar todo
              setPets((prev) => prev.filter((pet) => pet.id !== petId));
              // Cerrar modales si están abiertos
              setShowDetailModal(false);
              setSelectedPet(null);
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la mascota");
            }
          },
        },
      ]
    );
  };

  const handleFormSuccess = (updatedPet: PetType) => {
    if (selectedPet) {
      // Si estamos editando, actualizar la mascota en la lista
      setPets((prev) =>
        prev.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
      );
    } else {
      // Si estamos creando, agregar la nueva mascota a la lista
      setPets((prev) => [...prev, updatedPet]);
    }
    // Cerrar el modal
    setShowFormModal(false);
    setSelectedPet(null);
  };

  const handleRetry = () => {
    loadPets();
  };

  // 🔥 POSICIONES PREDEFINIDAS PARA LAS MASCOTAS
  const petPositions = [
    styles.petPosition1,
    styles.petPosition2,
    styles.petPosition3,
    styles.petPosition4,
  ];

  // 🔥 ESTADOS DE CARGA Y ERROR
  if (loading) {
    return (
      <View
        style={[
          styles.sceneContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Cargando mascotas...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.sceneContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        <Pressable onPress={handleRetry} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.sceneContainer}>
      {/* 🎯 FONDO ÚNICO con nubes, árboles y camino */}
      <Image
        source={require("@/assets/images/Fondo.png")}
        style={styles.sceneBackground}
        resizeMode="stretch"
      />

      {/* 🔥 MASCOTAS DINÁMICAS CON IMÁGENES LOCALES */}
      {pets.map((pet, index) => (
        <Pet
          key={pet.id}
          pet={pet}
          style={petPositions[index % petPositions.length]}
          onView={handleViewPet}
          imageIndex={index % PET_IMAGES.length}
        />
      ))}

      {/* Mensaje si no hay mascotas */}
      {pets.length === 0 && (
        <View
          style={[
            styles.sceneContainer,
            {
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 20,
              color: "#666",
              fontSize: 16,
            }}
          >
            No tienes mascotas registradas aún
          </Text>
          <Pressable onPress={handleAddPet} style={styles.addMemberButton}>
            <Text style={styles.addMemberButtonText}>
              Agregar mi primera mascota
            </Text>
          </Pressable>
        </View>
      )}

      {/* Botón 'Agregar miembro' - Solo mostrar si hay mascotas */}
      {pets.length > 0 && (
        <Pressable onPress={handleAddPet} style={styles.addMemberButton}>
          <Text style={styles.addMemberButtonText}>Agregar miembro</Text>
        </Pressable>
      )}

      {/* 🔥 MODAL DE DETALLE */}
      {selectedPet && (
        <PetDetailModal
          visible={showDetailModal}
          pet={selectedPet}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedPet(null);
          }}
          onEdit={handleEditPet}
          onDelete={() => handleDeletePet(selectedPet.id)}
        />
      )}

      {/* 🔥 MODAL DE FORMULARIO (CREAR/EDITAR) */}
      <PetFormModal
        visible={showFormModal}
        pet={selectedPet}
        onClose={() => {
          setShowFormModal(false);
          setSelectedPet(null);
        }}
        onSuccess={handleFormSuccess}
      />
    </View>
  );
}

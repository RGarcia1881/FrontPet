import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable, ActivityIndicator } from "react-native";
import { petsScreenStyles as styles } from "@/styles/screen/pets/petScreenStyles";
import { getPets, Pet as PetType } from "@/api/pets";
import { useAuth } from "@/context/authContext";

// 🔥 IMÁGENES LOCALES PREDEFINIDAS
const PET_IMAGES = [
  require("@/assets/images/P1.png"),
  require("@/assets/images/P2.png"),
  require("@/assets/images/P3.png"),
  require("@/assets/images/P4.png"),
];

// 🔥 INTERFAZ ACTUALIZADA: Ahora recibe el objeto mascota completo + índice para la imagen
interface PetProps {
  pet: PetType;
  style: any;
  onView: (pet: PetType) => void;
  imageIndex: number; // Índice para seleccionar la imagen local
}

// 🔥 COMPONENTE Pet ACTUALIZADO - usa imagen local según índice
const Pet = ({ pet, style, onView, imageIndex }: PetProps) => (
  <View style={[styles.petContainer, style]}>
    {/* 🔥 IMAGEN LOCAL según el índice */}
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
    console.log(`Ver detalles de: ${pet.name}`, pet);
    // Aquí puedes navegar a la pantalla de detalles de la mascota
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
        <Text style={{ marginTop: 10 }}>Cargando mascotas...</Text>
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
          style={petPositions[index % petPositions.length]} // Ciclo de posiciones
          onView={handleViewPet}
          imageIndex={index % PET_IMAGES.length} // 🔥 Índice cíclico para imágenes
        />
      ))}

      {/* Mensaje si no hay mascotas */}
      {pets.length === 0 && (
        <View
          style={[
            styles.sceneContainer,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text style={{ textAlign: "center", marginBottom: 20 }}>
            No tienes mascotas registradas aún
          </Text>
        </View>
      )}

      {/* Botón 'Agregar miembro' */}
      <Pressable onPress={onAddMember} style={styles.addMemberButton}>
        <Text style={styles.addMemberButtonText}>Agregar miembro</Text>
      </Pressable>
    </View>
  );
}

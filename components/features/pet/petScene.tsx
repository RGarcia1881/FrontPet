// components/pets/PetScene.tsx

import React from "react";
import { View, Image, Text, Pressable } from "react-native";
// 🔥 Importación corregida para el tipado correcto
import { petsScreenStyles as styles } from "@/styles/screen/pets/petScreenStyles";

// Componente para un perro individual
interface PetProps {
  name: string;
  source: any;
  style: any;
  onView: (name: string) => void;
}

const Pet = ({ name, source, style, onView }: PetProps) => (
  <View style={[styles.petContainer, style]}>
    {/* Imagen del perro individual */}
    <Image source={source} style={styles.petImage} resizeMode="contain" />
    <Text style={styles.petNameText}>{name}</Text>
    <Pressable onPress={() => onView(name)} style={styles.viewButton}>
      <Text style={styles.viewButtonText}>Ver</Text>
    </Pressable>
  </View>
);

// --- Componente principal de la Escena ---
interface PetSceneProps {
  onAddMember: () => void;
}

export function PetScene({ onAddMember }: PetSceneProps) {
  const handleViewPet = (name: string) => {
    console.log(`Ver detalles de la mascota: ${name}`);
  };

  return (
    <View style={styles.sceneContainer}>
      {/* 🎯 FONDO ÚNICO con nubes, árboles y camino */}
      <Image
        source={require("@/assets/images/Fondo.png")}
        style={styles.sceneBackground}
        resizeMode="stretch"
      />

      {/* --- Mascotas (Posicionamiento Absoluto) --- */}

      <Pet
        name="Perro 1"
        source={require("@/assets/images/P1.png")}
        style={styles.petPosition1}
        onView={handleViewPet}
      />
      <Pet
        name="Perro 3"
        source={require("@/assets/images/P3.png")}
        style={styles.petPosition3}
        onView={handleViewPet}
      />
      <Pet
        name="Perro 2"
        source={require("@/assets/images/P2.png")}
        style={styles.petPosition2}
        onView={handleViewPet}
      />
      <Pet
        name="Perro 4"
        source={require("@/assets/images/P4.png")}
        style={styles.petPosition4}
        onView={handleViewPet}
      />

      {/* Botón 'Agregar miembro' */}
      <Pressable onPress={onAddMember} style={styles.addMemberButton}>
        <Text style={styles.addMemberButtonText}>Agregar miembro</Text>
      </Pressable>
    </View>
  );
}

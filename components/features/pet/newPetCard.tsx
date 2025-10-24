// components/ui/NewPetCard.tsx (CORREGIDO con Animación de Pulso)

import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// 🔥 Importaciones de Reanimated
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

import { styles } from "@/styles/newPetCardStyle"; // Asegura que el alias funcione

// Importa tu imagen del perro
const NEW_PET_IMAGE = require("@/assets/images/Doggy.png");

/**
 * Componente que muestra la tarjeta para agregar un nuevo integrante/mascota.
 */
export function NewPetCard() {
  // 🔥 1. Valor compartido para la escala de la imagen del perro
  const scale = useSharedValue(1);

  // 🔥 2. Ejecutamos la animación de pulso al montar el componente
  useEffect(() => {
    // La animación de pulso se repite infinitamente
    scale.value = withRepeat(
      withTiming(1.05, {
        // Pulso a 1.05 veces el tamaño original
        duration: 1200, // Duración del pulso (ida y vuelta)
        easing: Easing.inOut(Easing.quad), // Easing suave
      }),
      -1, // -1 para repetir infinitamente
      true // true para que la animación se revierta (1.05 -> 1.0)
    );
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // 🔥 3. Estilo animado que aplica la escala
  const animatedPetImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleAddPet = () => {
    console.log("Navegar a la pantalla para agregar una nueva mascota.");
    // Aquí iría la navegación a 'create.tsx' o 'createUser.tsx' según tu estructura
  };

  return (
    <View style={styles.cardContainer}>
      {/* Contenedor del Texto y Botón */}
      <View style={styles.textButtonContainer}>
        <Text style={styles.titleText}>¿Nuevo{"\n"}integrante?</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPet}
          activeOpacity={0.2}
        >
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 Imagen del Perro con animación de pulso */}
      <Animated.Image // Cambiamos Image por Animated.Image
        source={NEW_PET_IMAGE}
        style={[styles.petImage, animatedPetImageStyle]} // Aplicamos el estilo animado
        alt="Perro sonriente"
        resizeMode="contain"
      />
    </View>
  );
}

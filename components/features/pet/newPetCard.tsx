import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
// 🔥 Eliminamos importaciones de 'react-native-reanimated'
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from "react-native-reanimated";

import { styles } from "@/styles/newPetCardStyle";

// Importa tu imagen del perro
const NEW_PET_IMAGE = require("@/assets/images/Doggy.png");

// Creamos un componente Animated.Image
const AnimatedImage = Animated.createAnimatedComponent(Animated.Image);

/**
 * Componente que muestra la tarjeta para agregar un nuevo integrante/mascota.
 */
export function NewPetCard() {
  // 🔥 1. Valor Animated para la escala
  const scale = useRef(new Animated.Value(1)).current;

  // 🔥 2. Función para iniciar el pulso infinito
  const startPulse = () => {
    // Primera animación: Escalar a 1.05
    const animateToLarge = Animated.timing(scale, {
      toValue: 1.05,
      duration: 600, // La mitad de la duración total del ciclo (1200ms)
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    });

    // Segunda animación: Escalar de vuelta a 1.0
    const animateToSmall = Animated.timing(scale, {
      toValue: 1,
      duration: 600, // La otra mitad
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    });

    // Encadenamos las dos animaciones y las repetimos en loop
    Animated.loop(Animated.sequence([animateToLarge, animateToSmall])).start();
  };

  // 🔥 3. Ejecutamos la animación de pulso al montar el componente
  useEffect(() => {
    startPulse();
  }, []);

  // 🔥 4. Estilo animado que aplica la escala (usando la Animated.Value)
  const animatedPetImageStyle = {
    transform: [{ scale: scale }],
  };

  const handleAddPet = () => {
    console.log("Navegar a la pantalla para agregar una nueva mascota.");
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
      <AnimatedImage
        source={NEW_PET_IMAGE}
        style={[styles.petImage, animatedPetImageStyle]} // Aplicamos el estilo animado
        alt="Perro sonriente"
        resizeMode="contain"
      />
    </View>
  );
}

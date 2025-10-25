import React from "react";
import { Dimensions, Animated, StyleProp, ViewStyle } from "react-native";
// 🔥 Eliminamos importaciones de 'react-native-reanimated'

import { PetCard } from "./petCard";

// Definiciones para el zoom horizontal (Asegúrate de que CARD_WIDTH coincida con el estilo de PetCard)
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = 200; // <--- AJUSTA ESTE VALOR
const CARD_MARGIN = 1;
const TOTAL_CARD_SIZE = CARD_WIDTH + CARD_MARGIN;
// Punto en el ScrollView horizontal donde la tarjeta está centrada
const CENTER_POINT = SCREEN_WIDTH / 2 - CARD_WIDTH / 2;

interface AnimatedPetCardProps {
  // 🔥 CAMBIO CLAVE: scrollY ya no es SharedValue, es Animated.Value
  scrollY: Animated.Value;
  index: number;
  petData: {
    name: string;
    breed: string;
    image: any;
  };
  onPress: () => void;

  // 🔥 CAMBIO CLAVE: scrollX ya no es SharedValue, es Animated.Value
  scrollX: Animated.Value;
}

export function AnimatedPetCard({
  index,
  petData,
  onPress,
  scrollX,
}: AnimatedPetCardProps) {
  // ----------------------------------------------------------------------
  // CÁLCULO DE POSICIÓN HORIZONTAL PARA EL ZOOM CENTRAL
  // ----------------------------------------------------------------------

  // Posición donde comienza la tarjeta actual en el ScrollView horizontal
  const cardPositionX = index * TOTAL_CARD_SIZE;

  // Rango de entrada basado en la posición horizontal del carrusel (scrollX)
  // Utilizamos la misma lógica de Reanimated pero con el objeto Animated.Value
  const inputRange = [
    cardPositionX - SCREEN_WIDTH, // Fuera a la izquierda (1)
    cardPositionX - CENTER_POINT, // Justo antes de entrar al centro (2)
    cardPositionX + CENTER_POINT, // El centro, donde se aplica el pico (3)
    cardPositionX + SCREEN_WIDTH, // Fuera a la derecha (4)
  ];

  // ----------------------------------------------------------------------
  // LÓGICA DE ANIMACIÓN (Usando Animated.interpolate)
  // ----------------------------------------------------------------------

  // 1. Escala (Stack Effect: de 0.8 a 1.0)
  const scale = scrollX.interpolate({
    inputRange: [inputRange[1], inputRange[2], inputRange[3]],
    outputRange: [0.8, 1, 0.8], // 0.8 a los lados, 1.0 en el centro.
    extrapolate: "clamp", // 'clamp' es el equivalente a Extrapolate.CLAMP
  });

  // 2. Opacidad (Fade-In/Highlight)
  const opacity = scrollX.interpolate({
    inputRange: [inputRange[1], inputRange[2], inputRange[3]],
    outputRange: [0.5, 1, 0.5], // Opacidad: 0.5 a los lados, 1.0 en el centro.
    extrapolate: "clamp",
  });

  // 3. Deslizamiento Vertical (Fijo en 0, ya que solo animamos horizontalmente)
  const translateY = 0;

  // 4. Estilo Animado
  const animatedStyle: StyleProp<ViewStyle> = {
    opacity: opacity,
    transform: [{ scale: scale }, { translateY: translateY }],
  };

  return (
    // Es posible que necesites un estilo para agregar margen entre las tarjetas
    <Animated.View style={[animatedStyle, { marginRight: CARD_MARGIN }]}>
      <PetCard
        name={petData.name}
        breed={petData.breed}
        imageSource={petData.image}
        onPress={onPress}
      />
    </Animated.View>
  );
}

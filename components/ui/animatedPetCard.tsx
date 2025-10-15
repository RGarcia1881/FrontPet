// components/ui/AnimatedPetCard.tsx (CORREGIDO FINAL: Zoom en X)

import React from "react";
import { Dimensions } from "react-native"; // Necesario para calcular el centro
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate, // Importar Extrapolate
} from "react-native-reanimated";
import { PetCard } from "./petCard";

// 🔥 Definiciones para el zoom horizontal (Asegúrate de que CARD_WIDTH coincida con el estilo de PetCard)
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = 200; // <--- AJUSTA ESTE VALOR
const CARD_MARGIN = 1;
const TOTAL_CARD_SIZE = CARD_WIDTH + CARD_MARGIN;
// Punto en el ScrollView horizontal donde la tarjeta está centrada
const CENTER_POINT = SCREEN_WIDTH / 2 - CARD_WIDTH / 2;

interface AnimatedPetCardProps {
  scrollY: SharedValue<number>;
  index: number;
  petData: {
    name: string;
    breed: string;
    image: any;
  };
  onPress: () => void;

  // 🔥 CORRECCIÓN CLAVE 1: Añadir scrollX
  scrollX: SharedValue<number>;
}

export function AnimatedPetCard({
  scrollY,
  index,
  petData,
  onPress,
  scrollX, // 🔥 CORRECCIÓN CLAVE 2: Recibir scrollX
}: AnimatedPetCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    // ----------------------------------------------------------------------
    // CÁLCULO DE POSICIÓN HORIZONTAL PARA EL ZOOM CENTRAL
    // ----------------------------------------------------------------------

    // Posición donde comienza la tarjeta actual en el ScrollView horizontal
    const cardPositionX = index * TOTAL_CARD_SIZE;

    // Rango de entrada basado en la posición horizontal del carrusel (scrollX.value)
    const inputRange = [
      cardPositionX - SCREEN_WIDTH, // Fuera a la izquierda (0)
      cardPositionX - CENTER_POINT, // Justo antes de entrar al centro (1)
      cardPositionX + CENTER_POINT, // El centro, donde se aplica el pico (2)
      cardPositionX + SCREEN_WIDTH, // Fuera a la derecha (3)
    ];

    // ----------------------------------------------------------------------
    // LÓGICA DE ANIMACIÓN (Reemplazando scrollY por scrollX)
    // ----------------------------------------------------------------------

    // 1. Escala (Stack Effect: de 0.9 a 1.0)
    // 🔥 Ahora reacciona a scrollX
    const scale = interpolate(
      scrollX.value, // ⬅️ Usamos scrollX
      // Queremos que el pico de escala (1.1) esté en el centro (inputRange[2]) y se reduzca a los lados.
      [inputRange[1], inputRange[2], inputRange[3]],
      [0.8, 1, 0.8], // ⬅️ Nuevo rango de escala: 0.9 -> 1.1 (pico central) -> 0.9
      Extrapolate.CLAMP
    );

    // 2. Opacidad (Fade-In/Highlight)
    // 🔥 Ahora reacciona a scrollX
    const opacity = interpolate(
      scrollX.value, // ⬅️ Usamos scrollX
      // Queremos que esté al 100% de opacidad en el centro (inputRange[2])
      [inputRange[1], inputRange[2], inputRange[3]],
      [0.5, 1, 0.5], // ⬅️ Opacidad: 0.5 a los lados, 1.0 en el centro.
      Extrapolate.CLAMP
    );

    // 3. Deslizamiento Vertical (Ya no tiene sentido que se mueva verticalmente con scrollX.
    // Lo eliminamos o lo dejamos fijo en 0).
    const translateY = 0;
    // Si quieres que el efecto de aparición vertical (Scroll Reveal) funcione una vez al cargar:
    // Podrías usar scale = scaleHorizontal * scaleVertical. Pero para el zoom en X, dejemos solo X.

    return {
      opacity: opacity,
      transform: [{ scale: scale }, { translateY: translateY }],
    };
  });

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

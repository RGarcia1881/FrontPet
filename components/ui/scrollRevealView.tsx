// components/animations/ScrollRevealView.tsx (CORREGIDO)

import React from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  // Ya no necesitamos withTiming, pero mantenemos las necesarias:
  SharedValue,
  interpolate,
  useAnimatedRef,
  measure,
} from "react-native-reanimated";

interface ScrollRevealViewProps {
  children: React.ReactNode;
  // 🔥 CORRECCIÓN: Ambas props deben estar definidas si se usan en HomeScreen
  initialDelay: number;
  startOffset: number; // Mantenemos esta para ajustar el punto de activación
  scrollY: SharedValue<number>;
}

export function ScrollRevealView({
  children,
  scrollY,
  startOffset = 0,
}: ScrollRevealViewProps) {
  const aRef = useAnimatedRef<View>();
  const yPosition = useSharedValue(0);

  const handleLayout = () => {
    const measurement = measure(aRef);
    if (measurement) {
      yPosition.value = measurement.pageY;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const ANIMATION_RANGE = 300;
    // 700 es una buena estimación para el tamaño del viewport en muchos teléfonos.
    const calculatedStartPoint = yPosition.value - 700 + startOffset;

    // 🔥 CORRECCIÓN CLAVE: Aseguramos que el punto de inicio sea, como máximo, -200.
    // Esto significa que si la sección está muy arriba (yPosition es bajo),
    // la animación se activará inmediatamente (scrollY=0 es mayor que -200).
    const activationPoint = Math.min(calculatedStartPoint, -100);

    // 1. Opacidad (Fade-In):
    const opacity = interpolate(
      scrollY.value,
      [activationPoint, activationPoint + ANIMATION_RANGE], // Usamos el punto ajustado
      [0, 1],
      "clamp"
    );

    // 2. Deslizamiento (Move-Up):
    const translateY = interpolate(
      scrollY.value,
      [activationPoint, activationPoint + ANIMATION_RANGE], // Usamos el punto ajustado
      [50, 0],
      "clamp"
    );

    return {
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  return (
    <Animated.View ref={aRef} onLayout={handleLayout} style={animatedStyle}>
      {children}
    </Animated.View>
  );
}

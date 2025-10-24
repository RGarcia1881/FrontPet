// components/animations/AnimatedLevel.tsx (MODIFICADO)

import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ViewStyle, StyleProp } from "react-native";

interface AnimatedLevelProps {
  level: number; // Porcentaje objetivo (ej: 75)
  style: StyleProp<ViewStyle>; // Estilos base
  duration?: number; // Duración de la animación en ms
  shouldAnimate: boolean; // 🔥 NUEVA PROP: Indica cuándo activar la animación
}

export function AnimatedLevel({
  level,
  style,
  duration = 1500,
  shouldAnimate,
}: AnimatedLevelProps) {
  // Inicializamos la altura en 0 para que siempre comience vacía
  const animatedHeight = useSharedValue(0);

  useEffect(() => {
    // 🔥 La animación SÓLO se dispara si shouldAnimate es true
    if (shouldAnimate) {
      animatedHeight.value = withTiming(level, {
        duration: duration,
        easing: Easing.out(Easing.quad),
      });
    }
    // Nota: Si shouldAnimate es false, la altura se queda en 0.
  }, [shouldAnimate, level, duration]); // Dependencia en shouldAnimate

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${animatedHeight.value}%`,
    };
  });

  return <Animated.View style={[style, animatedStyle]} />;
}

import React, { useEffect, useRef } from "react";
// Importamos la librería Animated estándar de 'react-native'
import { Animated, ViewStyle, StyleProp, Easing } from "react-native";
// Eliminamos todas las importaciones de 'react-native-reanimated'

interface AnimatedLevelProps {
  level: number; // Porcentaje objetivo (ej: 75)
  style: StyleProp<ViewStyle>; // Estilos base
  duration?: number; // Duración de la animación en ms
  shouldAnimate: boolean; // Indica cuándo activar la animación
}

export function AnimatedLevel({
  level,
  style,
  duration = 1500,
  shouldAnimate,
}: AnimatedLevelProps) {
  // 🔥 VALOR ANIMABLE: Usamos useRef para mantener la referencia a Animated.Value
  // Inicializamos la altura en 0 para que siempre comience vacía
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 🔥 La animación SÓLO se dispara si shouldAnimate es true
    if (shouldAnimate) {
      Animated.timing(animatedHeight, {
        toValue: level,
        duration: duration,
        // Usamos Easing de 'react-native'
        easing: Easing.out(Easing.quad),
        // Esencial para mover propiedades de layout (como altura) en el hilo nativo
        useNativeDriver: false,
        // NOTA: 'height' (layout) requiere useNativeDriver: false. Solo 'transform' y 'opacity' pueden usar 'true'.
      }).start();
    }
    // Si shouldAnimate es false, la altura se mantiene en 0 (su valor inicial de useRef).
  }, [shouldAnimate, level, duration]);

  // Estilos animados
  // Como Animated.Value almacena números (0 a 100), usamos 'interpolate' si fuera necesario,
  // pero para porcentaje, lo aplicamos directamente en el estilo.
  const animatedStyle = {
    height: animatedHeight.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      // Clampeamos el valor para que no se extienda más allá de 0-100
      extrapolate: "clamp",
    }),
  };

  // Convertimos View a Animated.View
  return <Animated.View style={[style, animatedStyle as any]} />;
}

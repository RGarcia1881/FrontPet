import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { Svg, Rect } from "react-native-svg";
// Importamos el color y los estilos desde el nuevo archivo
import {
  loadingAnimationStyles as styles,
  PRIMARY_COLOR,
} from "@/styles/loadingAnimationStyles";

// Componente Svg Rect animado
const AnimatedRect = Animated.createAnimatedComponent(Rect);

// --- Configuración de la Animación ---
const RECT_SIZE = 120;
const STROKE_WIDTH = 15;
// Perímetro del rectángulo (ajustado ligeramente para el trazo)
const PERIMETER = 8 * (RECT_SIZE - STROKE_WIDTH);
const ANIMATION_DURATION = 5000; // 2 segundos, como en el CSS original
const STROKE_DASH_ARRAY = 50; // Basado en el CSS original

// El Animated.Value manejará el strokeDashoffset
const startOffset = PERIMETER * 0.5; // 50% del perímetro
const endOffset = PERIMETER * 2.5; // 250% del perímetro

export function LoadingAnimation() {
  const animatedOffset = useRef(new Animated.Value(startOffset)).current;

  const startAnimation = () => {
    // Define la animación para el strokeDashoffset (100% a 250%)
    Animated.loop(
      Animated.timing(animatedOffset, {
        toValue: endOffset,
        duration: ANIMATION_DURATION,
        easing: Easing.linear, // Como en el CSS original
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.loadingBox}>
      <View style={styles.spinnerContainer}>
        <Svg
          width={RECT_SIZE}
          height={RECT_SIZE}
          // El viewBox se ajusta para que el trazo no se corte en los bordes
          viewBox={`0 0 ${RECT_SIZE} ${RECT_SIZE}`}
        >
          <AnimatedRect
            x={STROKE_WIDTH / 2}
            y={STROKE_WIDTH / 2}
            width={RECT_SIZE - STROKE_WIDTH}
            height={RECT_SIZE - STROKE_WIDTH}
            fill="none"
            stroke={PRIMARY_COLOR} // Usamos el color azul primario
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={STROKE_DASH_ARRAY} // Longitud de los guiones
            strokeDashoffset={animatedOffset} // La propiedad animada
          />
        </Svg>
      </View>
    </View>
  );
}

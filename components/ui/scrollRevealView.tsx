import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  Animated,
  useWindowDimensions,
} from "react-native";
// Eliminamos todas las importaciones de 'react-native-reanimated'

interface ScrollRevealViewProps {
  children: React.ReactNode;
  initialDelay: number;
  startOffset: number;
  scrollY: Animated.Value; // Ahora acepta Animated.Value
}

export function ScrollRevealView({
  children,
  scrollY,
  startOffset = 0,
  initialDelay = 0,
}: ScrollRevealViewProps) {
  // Referencia para obtener la posición del componente
  const componentRef = useRef<View>(null);
  // Estado para guardar la posición Y una vez medida
  const [yPosition, setYPosition] = useState<number | null>(null);
  // Valor animado que maneja la opacidad y transformación (inicializado por defecto)
  const animatedValue = useRef(new Animated.Value(0)).current;

  const { height: windowHeight } = useWindowDimensions();

  // 1. Medir la posición Y del componente al renderizarse (onLayout)
  const handleLayout = (event: LayoutChangeEvent) => {
    // Usamos el método measure para obtener la posición Y en la pantalla (relative to screen)
    componentRef.current?.measure((x, y, width, height, pageX, pageY) => {
      // Guardamos la posición Y. pageY es la posición absoluta desde la parte superior.
      setYPosition(pageY);
    });
  };

  // 2. Ejecutar la animación inicial (Fade In + Up)
  useEffect(() => {
    if (yPosition !== null) {
      // Calculamos el punto de activación: cuando el componente está a ~70% de la pantalla
      // Usamos el punto en el que el componente debería empezar a ser visible
      const ACTIVATION_THRESHOLD = yPosition - windowHeight * 0.7 + startOffset;

      let scrollListenerId: string | null = null;

      // Añadir un listener al scrollY
      scrollListenerId = scrollY.addListener(({ value }) => {
        if (value >= ACTIVATION_THRESHOLD) {
          // Si el scroll pasa el umbral, activamos la animación con un retraso
          Animated.timing(animatedValue, {
            toValue: 1, // Valor final (completamente visible/arriba)
            duration: 800,
            delay: initialDelay, // Aplicamos el retraso
            useNativeDriver: true,
          }).start();

          // Importante: Eliminar el listener para que no se ejecute más
          if (scrollListenerId !== null) {
            scrollY.removeListener(scrollListenerId);
            scrollListenerId = null;
          }
        }
      });

      // Cleanup del listener al desmontar o si yPosition cambia
      return () => {
        if (scrollListenerId !== null) {
          scrollY.removeListener(scrollListenerId);
        }
      };
    }
  }, [
    yPosition,
    scrollY,
    animatedValue,
    initialDelay,
    startOffset,
    windowHeight,
  ]);

  // 3. Estilos animados basados en animatedValue (0 a 1)
  const animatedStyle: StyleProp<ViewStyle> = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0], // Mueve de 50px abajo a 0px arriba
        }),
      },
    ],
  };

  return (
    // 🔥 Aplicamos la referencia y onLayout para la medición
    <Animated.View
      ref={componentRef as any}
      onLayout={handleLayout}
      style={animatedStyle}
    >
      {children}
    </Animated.View>
  );
}

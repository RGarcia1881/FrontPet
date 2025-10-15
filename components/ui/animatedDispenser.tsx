// components/ui/AnimatedDispenser.tsx

import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
  useSharedValue,
} from "react-native-reanimated";
import { dispenserScreenStyles as styles } from "@/styles/dispenserScreenStyles";
import { DispenserVisuals } from "./dispenserVisuals";

// --- TIPOS (Sin cambios) ---
interface DispenserData {
  id: number;
  name: string;
  location: string;
  status: string;
  waterLevel: number;
  foodLevel: number;
  isConnected: boolean;
  hasPower: boolean;
  position: "center" | "right" | "bottom" | "add";
}
interface AnimatedDispenserProps {
  dispenser: DispenserData;
  onSelect: (id: number) => void;
}

const DISPENSER_SMALL_GRAPHIC = require("@/assets/images/Dispensador.png");

// 🔑 DEFINICIÓN DE POSICIONES Y COORDENADAS CARTESIANAS
const getPositions = (width: number) => {
  const CIRCULAR_CONTAINER_SIZE = width * 0.75;

  // R: Distancia desde el centro (0,0) a los íconos pequeños.
  // Ajusta el '30' si el giro no se alinea con tu diseño.
  const R = CIRCULAR_CONTAINER_SIZE / 2 + 30;

  return {
    center: { x: 0, y: -30, scale: 1.0, zIndex: 10 },
    right: { x: 30, y: 75, scale: 0.8, zIndex: 5 },
    bottom: { x: -125, y: 230, scale: 0.8, zIndex: 5 },
    add: { x: -300, y: 75, scale: 0.8, zIndex: 5 },
  };
};

const ANIMATION_CONFIG: WithTimingConfig = { duration: 500 };

// Componente auxiliar para el contenido del botón (+)
const AddButtonContent = () => (
  // Usa el estilo de apariencia visual para el círculo pequeño
  <View style={styles.addButtonVisual}>
    <Text style={styles.addButtonText}>+</Text>
  </View>
);

export function AnimatedDispenser({
  dispenser,
  onSelect,
}: AnimatedDispenserProps) {
  const { width } = useWindowDimensions();
  const POSITIONS = getPositions(width);
  const target = POSITIONS[dispenser.position];

  // Valores compartidos (estado animable)
  const currentX = useSharedValue(target.x);
  const currentY = useSharedValue(target.y);
  const currentScale = useSharedValue(target.scale);
  const currentZIndex = useSharedValue(target.zIndex);

  // Efecto de animación
  useEffect(() => {
    currentX.value = withTiming(target.x, ANIMATION_CONFIG);
    currentY.value = withTiming(target.y, ANIMATION_CONFIG);
    currentScale.value = withTiming(target.scale, ANIMATION_CONFIG);
    currentZIndex.value = target.zIndex;
  }, [dispenser.position, target]);

  // Estilos animados
  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: currentZIndex.value,
      opacity: withTiming(
        dispenser.position === "center" ? 1 : 0.9,
        ANIMATION_CONFIG
      ),
      transform: [
        { translateX: currentX.value },
        { translateY: currentY.value },
        { scale: currentScale.value },
      ],
    };
  });

  // Renderiza el contenido pequeño o el botón '+'
  const renderSmallContent = () => {
    if (dispenser.id === 99) {
      return <AddButtonContent />;
    }

    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={DISPENSER_SMALL_GRAPHIC}
          style={styles.smallDispenserImage}
        />
        <Text style={styles.smallDispenserLabel}>{dispenser.name}</Text>
      </View>
    );
  };

  // Renderiza el contenido grande o pequeño
  const renderContent = () => {
    if (dispenser.position === "center") {
      if (dispenser.id === 99) return null; // Nunca mostrar el '+' en el centro

      return (
        <DispenserVisuals
          waterLevel={dispenser.waterLevel}
          foodLevel={dispenser.foodLevel}
          isConnected={dispenser.isConnected}
          hasPower={dispenser.hasPower}
        />
      );
    }
    return renderSmallContent();
  };

  // La posición 'center' no es clickeable
  if (dispenser.position === "center") {
    return (
      <Animated.View style={[styles.dispenserWrapper, animatedStyle]}>
        {renderContent()}
      </Animated.View>
    );
  }

  // Los periféricos sí son clickeables
  return (
    <Pressable onPress={() => onSelect(dispenser.id)}>
      <Animated.View style={[styles.dispenserWrapper, animatedStyle]}>
        {renderContent()}
      </Animated.View>
    </Pressable>
  );
}

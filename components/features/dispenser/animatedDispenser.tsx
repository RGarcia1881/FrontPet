import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  Animated, // Usamos la librería Animated estándar
} from "react-native";
import { dispenserScreenStyles as styles } from "@/styles/screen/dispenser/dispenserScreenStyles";
import { DispenserVisuals } from "./dispenserVisuals";

// --- TIPOS CORREGIDOS (Solo 4 posiciones) ---
type DispenserPosition = "top" | "right" | "bottom" | "left";

interface DispenserData {
  id: number;
  name: string;
  location: string;
  status: string;
  waterLevel: number;
  foodLevel: number;
  isConnected: boolean;
  hasPower: boolean;
  position: DispenserPosition;
}
interface AnimatedDispenserProps {
  dispenser: DispenserData;
  onSelect: (id: number) => void;
}

const DISPENSER_SMALL_GRAPHIC = require("@/assets/images/Dispensador.png");

// 🔑 DEFINICIÓN DE POSICIONES Y COORDENADAS (4 SLOTS EXACTOS)
const getPositions = (width: number) => {
  return {
    // FOCO (GRANDE) - Coordenada que llamaste 'top' / 'Centro'
    top: { x: -120, y: -100, scale: 1.0, zIndex: 10 },

    // PERIFÉRICOS (PEQUEÑOS) - Coordenadas que especificaste
    right: { x: 35, y: 120, scale: 0.8, zIndex: 5 },
    bottom: { x: -125, y: 290, scale: 0.8, zIndex: 5 },
    left: { x: -285, y: 120, scale: 0.8, zIndex: 5 },
  };
};

const ANIMATION_DURATION = 500; // Duración en milisegundos

// Componente auxiliar para el contenido del botón (+)
const AddButtonContent = () => (
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

  // VALORES ANIMABLES
  const currentX = useRef(new Animated.Value(target.x)).current;
  const currentY = useRef(new Animated.Value(target.y)).current;
  const currentScale = useRef(new Animated.Value(target.scale)).current;
  const currentOpacity = useRef(
    // La opacidad es 1 si está en 'top' (el foco)
    new Animated.Value(dispenser.position === "top" ? 1 : 0.9)
  ).current;

  // Efecto de animación: Lanza las animaciones cuando la posición cambia
  useEffect(() => {
    const newTarget = POSITIONS[dispenser.position];

    const targetX = newTarget.x;
    const targetY = newTarget.y;
    const targetScale = newTarget.scale;
    const targetOpacity = dispenser.position === "top" ? 1 : 0.9;

    Animated.parallel([
      Animated.timing(currentX, {
        toValue: targetX,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(currentY, {
        toValue: targetY,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(currentScale, {
        toValue: targetScale,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(currentOpacity, {
        toValue: targetOpacity,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [dispenser.position, width]);

  // Estilos animados
  const animatedStyle = {
    zIndex: target.zIndex,
    opacity: currentOpacity,
    transform: [
      { translateX: currentX },
      { translateY: currentY },
      { scale: currentScale },
    ],
  };

  // Renderiza el contenido pequeño o el botón '+'
  const renderSmallContent = () => {
    // El ID 99 es el botón Añadir
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

  // Renderiza el contenido grande (solo si está en "top") o pequeño
  const renderContent = () => {
    // La posición de FOCO es "top"
    if (dispenser.position === "top") {
      // Si el ítem en el foco es el botón '+' (id 99), mostrar solo el AddButtonContent
      if (dispenser.id === 99) {
        return renderSmallContent();
      }

      return (
        <DispenserVisuals
          waterLevel={dispenser.waterLevel}
          foodLevel={dispenser.foodLevel}
          isConnected={dispenser.isConnected}
          hasPower={dispenser.hasPower}
        />
      );
    }
    // Si no está en el foco ("top"), siempre mostrar el contenido pequeño
    return renderSmallContent();
  };

  const AnimatedView = Animated.createAnimatedComponent(View);

  // Todos los ítems son clickeables (para rotar o para ejecutar la acción central si es el foco)
  return (
    <Pressable onPress={() => onSelect(dispenser.id)}>
      <AnimatedView style={[styles.dispenserWrapper, animatedStyle as any]}>
        {renderContent()}
      </AnimatedView>
    </Pressable>
  );
}

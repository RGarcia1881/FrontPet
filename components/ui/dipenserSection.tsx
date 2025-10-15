// components/ui/DispenserSection.tsx (COMPLETO y MODIFICADO)

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { styles } from "@/styles/dispenserSectionStyles";
import { AppColors } from "@/styles/theme";

// 🔥 Importaciones de Reanimated para la lógica de activación
import Animated, {
  SharedValue,
  useAnimatedRef,
  measure,
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";

// Importamos el componente de animación
import { AnimatedLevel } from "@/components/ui/animatedLevel";

const DISPENSER_IMAGE = require("@/assets/images/Dispensador.png");

// La interfaz debe ser visible para HomeScreen
export interface DispenserSectionProps {
  scrollY: SharedValue<number>; // Recibimos el valor compartido del scroll
}

/**
 * Componente que muestra el dispensador con animación de llenado activada por scroll.
 */
export function DispenserSection({ scrollY }: DispenserSectionProps) {
  const currentDispenser = {
    name: "Sala",
    isConnected: true,
    hasPower: true,
    waterLevel: 70,
    foodLevel: 20,
  };

  // 🔥 LÓGICA DE ACTIVACIÓN POR SCROLL
  const dispenserRef = useAnimatedRef<View>(); // Referencia para medir
  const yPosition = useSharedValue(0); // Posición Y del componente
  const [shouldAnimateFill, setShouldAnimateFill] = React.useState(false); // Estado de activación

  // Mide la posición Y del componente (se ejecuta solo una vez al cargar)
  const handleLayout = () => {
    const measurement = measure(dispenserRef);
    if (measurement) {
      yPosition.value = measurement.pageY;
    }
  };

  // Se activa una vez que el scroll llega al punto de revelación
  useDerivedValue(() => {
    // Definimos el punto de activación: yPosition menos ~400px del viewport.
    // Esto hace que se active cuando la sección está a mitad de camino en la pantalla.
    const revealPoint = yPosition.value - 400;

    if (
      yPosition.value !== 0 &&
      scrollY.value >= revealPoint &&
      !shouldAnimateFill
    ) {
      // Usamos runOnJS para actualizar el estado en el hilo JS una vez que se cumple la condición
      runOnJS(setShouldAnimateFill)(true);
    }
  });

  // Funciones dummy se mantienen
  const handleNavigation = (direction: "prev" | "next") => {
    /* ... */
  };
  const handleViewDetails = () => {
    /* ... */
  };

  return (
    // 🔥 Aplicamos el Ref y onLayout al contenedor principal para medir su posición
    <View
      style={styles.container}
      ref={dispenserRef as any}
      onLayout={handleLayout}
    >
      {/* 1. Header (Mis dispensadores. | Ver dispensadores) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Mis dispensadores.</Text>
        <TouchableOpacity style={styles.viewButton} activeOpacity={0.8}>
          <Text style={styles.viewButtonText}>Ver dispensadores</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Contenido del Dispensador/Carrusel */}
      <View style={styles.dispenserCarousel}>
        <Text style={styles.dispenserName}>{currentDispenser.name}</Text>

        <View style={styles.dispenserContent}>
          {/* Flecha Izquierda */}
          <TouchableOpacity
            onPress={() => handleNavigation("prev")}
            style={styles.arrow}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={30} color={AppColors.text} />
          </TouchableOpacity>

          {/* Contenedor principal de la Imagen y los Niveles de Llenado */}
          <View style={styles.dispenserVisualWrapper}>
            {/* 🔥 NIVEL DE AGUA (AZUL) con animación activada por scroll */}
            <AnimatedLevel
              level={currentDispenser.waterLevel}
              style={[styles.levelContainer, styles.waterLevel]}
              duration={1800}
              shouldAnimate={shouldAnimateFill} // <-- ¡Prop de activación!
            />

            {/* 🔥 NIVEL DE COMIDA (NARANJA) con animación activada por scroll */}
            <AnimatedLevel
              level={currentDispenser.foodLevel}
              style={[styles.levelContainer, styles.foodLevel]}
              duration={1200}
              shouldAnimate={shouldAnimateFill} // <-- ¡Prop de activación!
            />

            {/* Imagen del Dispensador (encima de los niveles) */}
            <Image
              source={DISPENSER_IMAGE}
              style={styles.dispenserImage}
              alt={`Dispensador ${currentDispenser.name}`}
            />

            {/* Overlays para Textos (encima de la imagen) */}

            {/* Overlay de Agua */}
            <View style={[styles.levelOverlay, styles.waterOverlay]}>
              <Text style={styles.levelText}>
                {currentDispenser.waterLevel}%
              </Text>
            </View>

            {/* Overlay de Comida */}
            <View style={[styles.levelOverlay, styles.foodOverlay]}>
              <Text style={styles.levelText}>
                {currentDispenser.foodLevel}%
              </Text>
            </View>

            {/* Status Icons (Rayos y WiFi, encima de todo) */}
            <View style={styles.statusIcons}>
              {/* Rayo (Energía) */}
              <View style={styles.iconWrapper}>
                <Ionicons
                  name="flash"
                  size={24}
                  color={
                    currentDispenser.hasPower
                      ? AppColors.success
                      : AppColors.subtext
                  }
                />
              </View>
              {/* WiFi */}
              <View style={styles.iconWrapper}>
                <Ionicons
                  name="wifi"
                  size={24}
                  color={
                    currentDispenser.isConnected
                      ? AppColors.success
                      : AppColors.subtext
                  }
                />
              </View>
            </View>
          </View>

          {/* Flecha Derecha */}
          <TouchableOpacity
            onPress={() => handleNavigation("next")}
            style={styles.arrow}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={30} color={AppColors.text} />
          </TouchableOpacity>
        </View>

        {/* Botón de Huella (Ver) */}
        <TouchableOpacity
          style={styles.pawButton}
          activeOpacity={0.8}
          onPress={handleViewDetails}
        >
          <FontAwesome name="paw" size={40} color={AppColors.primary} />
          <Text style={styles.pawText}>Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

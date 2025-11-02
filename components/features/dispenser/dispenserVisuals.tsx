// components/ui/DispenserVisuals.tsx

import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Importamos el componente de animación (Asume la ruta correcta)
import { AnimatedLevel } from "@/components/features/dispenser/animatedLevel";
import { AppColors } from "@/styles/global/theme";
// 🔥 Importamos los estilos específicos para este componente
import { dispenserVisualsStyles as styles } from "@/styles/screen/dispenser/dispenserVisualsStyles";

const DISPENSER_IMAGE = require("@/assets/images/Dispensador.png");

interface DispenserVisualsProps {
  waterLevel: number;
  foodLevel: number;
  isConnected: boolean;
  hasPower: boolean;
}

export function DispenserVisuals({
  waterLevel,
  foodLevel,
  isConnected,
  hasPower,
}: DispenserVisualsProps) {
  const [shouldAnimateFill, setShouldAnimateFill] = useState(false);

  useEffect(() => {
    // Activamos la animación de llenado al montar el componente
    const timer = setTimeout(() => {
      setShouldAnimateFill(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Contenedor principal que agrupa la imagen y los niveles
    <View style={styles.dispenserVisualWrapper}>
      {/* 🔥 NIVEL DE AGUA (AZUL) */}
      <AnimatedLevel
        level={waterLevel}
        style={[styles.levelContainer, styles.waterLevel]}
        duration={1800}
        shouldAnimate={shouldAnimateFill}
      />

      {/* 🔥 NIVEL DE COMIDA (NARANJA) */}
      <AnimatedLevel
        level={foodLevel}
        style={[styles.levelContainer, styles.foodLevel]}
        duration={1200}
        shouldAnimate={shouldAnimateFill}
      />

      {/* Imagen del Dispensador (encima de los niveles) */}
      <Image
        source={DISPENSER_IMAGE}
        style={styles.dispenserImage}
        alt="Dispensador Principal"
      />

      {/* Overlays para Textos (encima de la imagen) */}
      <View style={[styles.levelOverlay, styles.waterOverlay]}>
        <Text style={styles.levelText}>{waterLevel}%</Text>
      </View>

      <View style={[styles.levelOverlay, styles.foodOverlay]}>
        <Text style={styles.levelText}>{foodLevel}%</Text>
      </View>

      {/* Status Icons (Rayos y WiFi) */}
      <View style={styles.statusIcons}>
        {/* Rayo (Energía) */}
        <View style={styles.iconWrapper}>
          <Ionicons
            name="flash"
            size={24}
            color={hasPower ? AppColors.success : AppColors.subtext}
          />
        </View>
        {/* WiFi */}
        <View style={styles.iconWrapper}>
          <Ionicons
            name="wifi"
            size={24}
            color={isConnected ? AppColors.success : AppColors.subtext}
          />
        </View>
      </View>
    </View>
  );
}

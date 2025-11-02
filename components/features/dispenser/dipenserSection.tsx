import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
// Asegúrate de que este archivo exista y contenga los estilos correctos
import { styles } from "@/styles/screen/dispenser/dispenserSectionStyles";
import { AppColors } from "@/styles/global/theme";

// Importamos el componente de animación (ya migrado a Animated)
import { AnimatedLevel } from "@/components/features/dispenser/animatedLevel";

const DISPENSER_IMAGE = require("@/assets/images/Dispensador.png");

// 🔥 CAMBIO DE TIPO: Ahora acepta Animated.Value, no SharedValue
export interface DispenserSectionProps {
  scrollY: Animated.Value;
}

/**
 * Componente que muestra el dispensador con animación de llenado activada por scroll.
 * La activación se realiza en el hilo JS al detectar la posición de scroll.
 */
export function DispenserSection({ scrollY }: DispenserSectionProps) {
  const currentDispenser = {
    name: "Sala",
    isConnected: true,
    hasPower: true,
    waterLevel: 70,
    foodLevel: 20,
  };

  // 🔥 LÓGICA DE ACTIVACIÓN POR SCROLL (Hilo JS)
  const dispenserRef = useRef<View>(null); // Referencia normal para medir
  const [yPosition, setYPosition] = useState(0); // Posición Y del componente
  const [shouldAnimateFill, setShouldAnimateFill] = useState(false); // Estado de activación

  // 1. Obtener la posición Y del componente después del layout
  const handleLayout = () => {
    if (dispenserRef.current) {
      // Usamos el método measure de la referencia de React para obtener la posición
      dispenserRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Guardamos la posición Y relativa a la página
        setYPosition(pageY);
      });
    }
  };

  // 2. Suscribirse a los cambios de scroll para activar la animación
  useEffect(() => {
    let listenerId: string | null = null;

    // Solo si tenemos la posición Y del componente y aún no se ha activado
    if (yPosition !== 0 && !shouldAnimateFill) {
      // Añadimos un listener al Animated.Value del scroll
      listenerId = scrollY.addListener(({ value }) => {
        // Definimos el punto de activación: yPosition menos ~400px del viewport.
        // Esto activa la animación cuando la sección está visible.
        const revealPoint = yPosition - 400;

        if (value >= revealPoint) {
          // Activamos la animación
          setShouldAnimateFill(true);
          // Detenemos el listener para evitar que se ejecute innecesariamente
          if (listenerId !== null) {
            scrollY.removeListener(listenerId);
          }
        }
      });
    }

    // Cleanup: Eliminamos el listener si el componente se desmonta
    return () => {
      if (listenerId !== null) {
        scrollY.removeListener(listenerId);
      }
    };
  }, [yPosition, shouldAnimateFill, scrollY]);

  // Funciones dummy se mantienen
  const handleNavigation = (direction: "prev" | "next") => {
    /* ... */
  };
  const handleViewDetails = () => {
    /* ... */
  };

  return (
    // 🔥 Aplicamos el Ref normal y onLayout al contenedor principal para medir su posición
    <View style={styles.container} ref={dispenserRef} onLayout={handleLayout}>
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
            {/* NIVEL DE AGUA (AZUL) con animación activada por scroll */}
            <AnimatedLevel
              level={currentDispenser.waterLevel}
              style={[styles.levelContainer, styles.waterLevel]}
              duration={1800}
              shouldAnimate={shouldAnimateFill} // <-- ¡Prop de activación!
            />

            {/* NIVEL DE COMIDA (NARANJA) con animación activada por scroll */}
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

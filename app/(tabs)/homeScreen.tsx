import React, { useRef } from "react";
import { View, StyleSheet, SafeAreaView, Animated } from "react-native";
import { AppColors } from "@/styles/global/theme";
// 🔥 Eliminamos importaciones de 'react-native-reanimated'
// import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";

// Componentes de la UI
import { HeaderComponent } from "@/components/home/headerComponent";
import { ScheduleSection } from "@/components/features/schedule/scheduleSection";

// ✅ CORRECCIÓN DE RUTA: 'dipenserSection' -> 'dispenserSection'
import { DispenserSection } from "@/components/features/dispenser/dipenserSection";
import { NewPetCard } from "@/components/features/pet/newPetCard";
import { FamilySection } from "@/components/features/pet/familySection";

// Componente de Animación
import { ScrollRevealView } from "@/components/ui/scrollRevealView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light,
  },
  contentContainer: {
    paddingBottom: 20,
    backgroundColor: AppColors.light,
  },
});

// Usamos Animated.ScrollView, que ya está exportado por 'react-native'
const AnimatedScrollView = Animated.createAnimatedComponent(
  require("react-native").ScrollView
);

export default function HomeScreen() {
  // 🔥 1. Inicialización de la posición de scroll vertical
  // Usamos useRef para mantener la referencia a Animated.Value
  const scrollY = useRef(new Animated.Value(0)).current;

  // 🔥 2. Handler de scroll para actualizar scrollY
  // Usamos Animated.event() para mapear el evento nativo a scrollY
  const scrollHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY, // Mapea contentOffset.y al valor de scrollY
          },
        },
      },
    ],
    {
      useNativeDriver: true, // Esto es seguro para el mapeo de scroll
    }
  );
  // NOTA: Con Animated.event, no se necesita el useAnimatedScrollHandler de Reanimated.

  return (
    <SafeAreaView style={styles.container}>
      {/* Usamos Animated.ScrollView para capturar el evento de scroll */}
      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Los componentes ahora reciben Animated.Value, lo cual ya corregimos */}

        {/* 1. Header (Sin retraso) */}
        <ScrollRevealView initialDelay={0} startOffset={50} scrollY={scrollY}>
          <HeaderComponent />
        </ScrollRevealView>

        {/* 2. Horarios (Retraso de 200ms) */}
        <ScrollRevealView initialDelay={200} startOffset={0} scrollY={scrollY}>
          <ScheduleSection />
        </ScrollRevealView>

        {/* 3. Dispensadores (Retraso de 400ms) */}
        <ScrollRevealView initialDelay={400} startOffset={0} scrollY={scrollY}>
          {/* Pasa el Animated.Value */}
          <DispenserSection scrollY={scrollY} />
        </ScrollRevealView>

        {/* 4. Nuevo Integrante (Retraso de 600ms) */}
        <ScrollRevealView initialDelay={600} startOffset={0} scrollY={scrollY}>
          {/* NewPetCard no recibe scrollY, pero ScrollRevealView sí lo necesita */}
          <NewPetCard />
        </ScrollRevealView>

        {/* 5. Familia (Retraso de 800ms) */}
        <ScrollRevealView initialDelay={800} startOffset={0} scrollY={scrollY}>
          {/* FamilySection necesita scrollY (ahora Animated.Value) */}
          <FamilySection scrollY={scrollY} />
        </ScrollRevealView>
      </AnimatedScrollView>
    </SafeAreaView>
  );
}

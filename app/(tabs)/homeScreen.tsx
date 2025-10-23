// homeScreen.tsx (VERSIÓN FUNCIONAL CON ANIMACIONES)

import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { AppColors } from "@/styles/theme";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

// Componentes de la UI
import { HeaderComponent } from "@/components/ui/headerComponent";
import { ScheduleSection } from "@/components/ui/scheduleSection";
import { DispenserSection } from "@/components/ui/dipenserSection";
import { NewPetCard } from "@/components/ui/newPetCard";
import { FamilySection } from "@/components/ui/familySection";

// Componente de Animación
import { ScrollRevealView } from "@/components/ui/scrollRevealView";

export default function HomeScreen() {
  // 1. Inicialización de la posición de scroll vertical
  const scrollY = useSharedValue(0);

  // 2. Handler de scroll para actualizar scrollY
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Usamos Animated.ScrollView para capturar el evento de scroll */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16} // Fundamental para la fluidez de Reanimated
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
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
          {/* Se pasa scrollY para activar la animación de llenado interna */}
          <DispenserSection scrollY={scrollY} />
        </ScrollRevealView>

        {/* 4. Nuevo Integrante (Retraso de 600ms) */}
        <ScrollRevealView initialDelay={600} startOffset={0} scrollY={scrollY}>
          {/* NewPetCard tiene la animación de pulso interna */}
          <NewPetCard />
        </ScrollRevealView>

        {/* 5. Familia (Retraso de 800ms) */}
        <ScrollRevealView initialDelay={800} startOffset={0} scrollY={scrollY}>
          {/* Se pasa scrollY para el Stack Reveal vertical y FamilySection lo pasa como trigger */}
          <FamilySection scrollY={scrollY} />
        </ScrollRevealView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 🔥 2. ASIGNACIÓN DEL FONDO SÓLIDO
    backgroundColor: AppColors.light,
  },
  contentContainer: {
    paddingBottom: 20,
    // (Opcional) Asegura el fondo también en el contentContainer por si acaso
    backgroundColor: AppColors.light,
  },
});

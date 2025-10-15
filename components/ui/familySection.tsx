// components/ui/FamilySection.tsx (MODIFICADO para scrollX)

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "@/styles/familySectionStyles";
import { SharedValue } from "react-native-reanimated";

// 🔥 Importaciones de Reanimated para el scroll horizontal
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

// Importamos el componente animado
import { AnimatedPetCard } from "./animatedPetCard";

const PET_DATA = [
  {
    id: 1,
    name: "Snoopy",
    breed: "Golden Retriever",
    image: require("@/assets/images/Perrin.jpg"),
  },
  {
    id: 2,
    name: "Droopy",
    breed: "Doberman",
    image: require("@/assets/images/Perrin.jpg"),
  },
  {
    id: 3,
    name: "Max",
    breed: "Poodle",
    image: require("@/assets/images/Perrin.jpg"),
  },
];

interface FamilySectionProps {
  scrollY: SharedValue<number>; // Mantenemos este para el ScrollReveal de la sección
}

export function FamilySection({ scrollY }: FamilySectionProps) {
  const handleCardPress = (petName: string) => {
    console.log(`Ver detalles de la mascota: ${petName}`);
  };

  // 🔥 NUEVO: Valor compartido para el scroll horizontal
  const scrollX = useSharedValue(0);

  // 🔥 NUEVO: Handler para el scroll horizontal
  const scrollXHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Esta es tu familia</Text>

      {/* 🔥 Usamos Animated.ScrollView para el carrusel horizontal */}
      <Animated.ScrollView // Cambiamos a Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        onScroll={scrollXHandler} // Conectamos el handler del scrollX
        scrollEventThrottle={16} // Importante para suavidad
      >
        {PET_DATA.map((pet, index) => (
          <AnimatedPetCard
            key={pet.id}
            scrollY={scrollY} // Seguimos pasando este para el reveal vertical
            scrollX={scrollX} // 🔥 NUEVO: Pasamos el scroll horizontal
            index={index}
            petData={pet}
            onPress={() => handleCardPress(pet.name)}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

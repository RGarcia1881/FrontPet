import React, { useRef } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { styles } from "@/styles/screen/pets/familySectionStyles";
// 🔥 Eliminamos importaciones de 'react-native-reanimated'
// import { SharedValue } from "react-native-reanimated";
// import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

// Importamos el componente animado (ahora usa Animated.Value)
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
  // Ahora es Animated.Value, no SharedValue
  scrollY: Animated.Value;
}

// Creamos un componente Animated.ScrollView para usar el sistema Animated.event
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export function FamilySection({ scrollY }: FamilySectionProps) {
  const handleCardPress = (petName: string) => {
    console.log(`Ver detalles de la mascota: ${petName}`);
  };

  // 🔥 NUEVO: Inicialización de la posición de scroll horizontal con useRef
  const scrollX = useRef(new Animated.Value(0)).current;

  // 🔥 NUEVO: Handler para el scroll horizontal usando Animated.event()
  const scrollXHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX, // Mapea contentOffset.x al valor de scrollX
          },
        },
      },
    ],
    {
      useNativeDriver: true, // Esto es seguro para el mapeo de scroll
    }
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Esta es tu familia</Text>

      {/* 🔥 Usamos AnimatedScrollView */}
      <AnimatedScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        onScroll={scrollXHandler} // Conectamos el handler del scrollX
        scrollEventThrottle={16} // Importante para suavidad
      >
        {PET_DATA.map((pet, index) => (
          <AnimatedPetCard
            key={pet.id}
            scrollY={scrollY} // Se sigue pasando el scroll vertical
            scrollX={scrollX} // Pasamos el Animated.Value horizontal
            index={index}
            petData={pet}
            onPress={() => handleCardPress(pet.name)}
          />
        ))}
      </AnimatedScrollView>
    </View>
  );
}

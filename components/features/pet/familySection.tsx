import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { styles } from "@/styles/screen/pets/familySectionStyles";
import { AnimatedPetCard } from "./animatedPetCard";
import { getPets, Pet as PetType } from "@/api/pets";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";

interface FamilySectionProps {
  scrollY: Animated.Value;
}

// Creamos un componente Animated.ScrollView para usar el sistema Animated.event
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export function FamilySection({ scrollY }: FamilySectionProps) {
  const router = useRouter();
  const [pets, setPets] = useState<PetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // 🔥 FUNCIÓN PARA CARGAR MASCOTAS
  const loadPets = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userPets = await getPets();
      setPets(userPets);
    } catch (err: any) {
      console.error("Error cargando mascotas:", err);
      setError("Error al cargar las mascotas");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 EFECTO PARA CARGAR MASCOTAS AL MONTAR EL COMPONENTE
  useEffect(() => {
    loadPets();
  }, [isAuthenticated]);

  const handleCardPress = (pet: PetType) => {
    router.push("/(tabs)/petScreen");
    // Aquí puedes navegar a la pantalla de detalles de la mascota
  };

  // 🔥 Inicialización de la posición de scroll horizontal con useRef
  const scrollX = useRef(new Animated.Value(0)).current;

  // 🔥 Handler para el scroll horizontal usando Animated.event()
  const scrollXHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  // 🔥 ESTADOS DE CARGA Y ERROR
  if (loading) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Esta es tu familia</Text>
        <View
          style={[
            styles.carousel,
            { justifyContent: "center", alignItems: "center", height: 120 },
          ]}
        >
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={{ marginTop: 10, fontSize: 12 }}>
            Cargando mascotas...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Esta es tu familia</Text>
        <View
          style={[
            styles.carousel,
            { justifyContent: "center", alignItems: "center", height: 120 },
          ]}
        >
          <Text style={{ color: "red", fontSize: 12, marginBottom: 10 }}>
            {error}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Esta es tu familia</Text>

      {/* 🔥 SCROLLVIEW CON MASCOTAS REALES DE LA BD */}
      <AnimatedScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        onScroll={scrollXHandler}
        scrollEventThrottle={16}
      >
        {pets.map((pet, index) => (
          <AnimatedPetCard
            key={pet.id}
            index={index}
            petData={{
              name: pet.name,
              breed: pet.race,
              // Usar image_url si existe, si no image
              image: pet.image_url || pet.image,
              weight: pet.weight,
              age: pet.age,
            }}
            onPress={() => handleCardPress(pet)}
            scrollX={scrollX}
            scrollY={scrollY}
          />
        ))}

        {/* Mensaje si no hay mascotas */}
        {pets.length === 0 && (
          <View
            style={[
              styles.carousel,
              { justifyContent: "center", alignItems: "center", width: 300 },
            ]}
          >
            <Text style={{ textAlign: "center", color: "#666" }}>
              No tienes mascotas registradas aún
            </Text>
          </View>
        )}
      </AnimatedScrollView>
    </View>
  );
}

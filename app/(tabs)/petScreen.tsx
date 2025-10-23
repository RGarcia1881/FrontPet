// app/(tabs)/petsScreen.tsx

import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { PetScene } from "@/components/ui/petScene";
import { petsScreenStyles as styles } from "@/styles/petScreenStyles";

export default function PetsScreen() {
  const handleAddMember = () => {
    console.log("Navegar a la pantalla para agregar una nueva mascota.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Título de la pantalla */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mi familia</Text>
          <Text style={styles.subtitle}>Toda tu tripulacion esta aquí.</Text>
        </View>

        {/* La escena interactiva de las mascotas */}
        <PetScene onAddMember={handleAddMember} />
      </ScrollView>
    </SafeAreaView>
  );
}

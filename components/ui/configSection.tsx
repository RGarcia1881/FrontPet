// components/config/ConfigSection.tsx (Revisado con Ionicons)

import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 🔥 Usando Ionicons
import { configScreenStyles as styles } from "@/styles/screen/settings/configScreenStyles";

interface ConfigSectionProps {
  iconName: keyof typeof Ionicons.glyphMap; // Nombre de icono de Ionicons
  title: string;
}

export function ConfigSection({ iconName, title }: ConfigSectionProps) {
  return (
    <View style={styles.sectionHeaderContainer}>
      {/* 🔥 Uso directo del componente Ionicons */}
      <Ionicons
        name={iconName}
        size={30}
        color={styles.sectionIcon.color}
        style={styles.sectionIcon}
      />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

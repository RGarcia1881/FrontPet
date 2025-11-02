// components/ui/PetCard.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "@/styles/screen/pets/petCardStyles";
import { AppColors } from "@/styles/global/theme";

interface PetCardProps {
  name: string;
  breed: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
}

export function PetCard({ name, breed, imageSource, onPress }: PetCardProps) {
  return (
    <View style={styles.card}>
      {/* Imagen de la mascota */}
      <Image
        source={imageSource}
        style={styles.petImage}
        alt={`Foto de ${name}`}
      />

      <View style={styles.infoContainer}>
        {/* Nombre */}
        <Text style={styles.petName} numberOfLines={1}>
          {name}
        </Text>

        {/* Raza */}
        <Text style={styles.petBreed} numberOfLines={1}>
          {breed}
        </Text>
      </View>

      {/* Botón de Huella (Ver) */}
      <TouchableOpacity
        style={styles.pawButtonContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <FontAwesome name="paw" size={35} color={AppColors.primary} />
        <Text style={styles.pawText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );
}

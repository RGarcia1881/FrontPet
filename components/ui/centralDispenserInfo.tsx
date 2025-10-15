// components/ui/CentralDispenserInfo.tsx

import React from "react";
import { View, Text, Pressable } from "react-native";
// Importamos los íconos de Expo
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
// 🔥 Importamos los estilos específicos para este componente
import { centralDispenserInfoStyles as styles } from "@/styles/centralDispenserInfoStyles";
// Importamos AppColors para darle color a los íconos
import { AppColors } from "@/styles/theme";

interface CentralDispenserInfoProps {
  name: string;
  location: string;
  status: string;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
  onSound: () => void;
}

export function CentralDispenserInfo({
  name,
  location,
  status,
  onEdit,
  onDelete,
  onView,
  onSound,
}: CentralDispenserInfoProps) {
  // El color de los íconos es el color claro de tu tema, definido en AppColors
  const iconColor = AppColors.light;
  const iconSize = 24;

  return (
    // El estilo 'infoCircle' define el tamaño y el fondo azul/gris.
    <View style={styles.infoCircle}>
      {/* Íconos de acción superiores (Edit y Delete) */}
      <View style={[styles.actionIconsContainer, styles.topIcons]}>
        {/* Ícono de Edición (Pencil/Pen) */}
        <Pressable onPress={onEdit}>
          <FontAwesome5
            name="pencil-alt"
            size={iconSize}
            color={iconColor}
            style={styles.actionIcon}
          />
        </Pressable>

        {/* Ícono de Eliminar (Trash) */}
        <Pressable onPress={onDelete}>
          <Ionicons
            name="trash"
            size={iconSize}
            color={iconColor}
            style={styles.actionIcon}
          />
        </Pressable>
      </View>

      {/* Información Central */}
      <Text style={[styles.infoText, styles.dispenserName]}>{name}</Text>
      <Text style={styles.infoText}>Ubicación: {location}</Text>
      <Text style={[styles.infoText, styles.statusText]}>
        Estatus: {status}
      </Text>

      {/* Íconos de acción inferiores (View y Sound) */}
      <View style={[styles.actionIconsContainer, styles.bottomIcons]}>
        {/* Ícono de Ver (Eye) */}
        <Pressable onPress={onView}>
          <Ionicons
            name="eye"
            size={iconSize}
            color={iconColor}
            style={styles.actionIcon}
          />
        </Pressable>

        {/* Ícono de Sonido (Volume) */}
        <Pressable onPress={onSound}>
          <Ionicons
            name="volume-medium"
            size={iconSize}
            color={iconColor}
            style={styles.actionIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

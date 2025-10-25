import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { centralDispenserInfoStyles as styles } from "@/styles/screen/dispenser/centralDispenserInfoStyles";
import { AppColors } from "@/styles/global/theme";

interface CentralDispenserInfoProps {
  name: string;
  location: string;
  status: string;
  // Hacemos todas las funciones opcionales (?) para evitar el error de tipado
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onSound?: () => void;
  // Añadimos la función específica para el botón Añadir
  onAddClick?: () => void;
}

export function CentralDispenserInfo({
  name,
  location,
  status,
  onEdit,
  onDelete,
  onView,
  onSound,
  onAddClick, // Recibimos la función de añadir
}: CentralDispenserInfoProps) {
  const iconColor = AppColors.light;
  const iconSize = 24;

  // 🔥 LÓGICA: Si tenemos la función onAddClick, renderizamos el botón grande de añadir.
  if (onAddClick) {
    return (
      <View style={styles.infoCircle}>
        <Pressable
          onPress={onAddClick}
          style={styles.bigAddButton} // Estilo para el botón grande
        >
          <Ionicons name="add" size={80} color={AppColors.primary} />
          <Text style={styles.addText}>Añadir Nuevo Dispensador</Text>
        </Pressable>
      </View>
    );
  }

  // Contenido normal para un dispensador real
  return (
    // El estilo 'infoCircle' define el tamaño y el fondo azul/gris.
    <View style={styles.infoCircle}>
      {/* Íconos de acción superiores (Edit y Delete). Solo si las funciones existen. */}
      <View style={[styles.actionIconsContainer, styles.topIcons]}>
        {onEdit && (
          <Pressable onPress={onEdit}>
            <FontAwesome5
              name="pencil-alt"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}

        {onDelete && (
          <Pressable onPress={onDelete}>
            <Ionicons
              name="trash"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}
      </View>

      {/* Información Central */}
      <Text style={[styles.infoText, styles.dispenserName]}>{name}</Text>
      <Text style={styles.infoText}>Ubicación: {location}</Text>
      <Text style={[styles.infoText, styles.statusText]}>
        Estatus: {status}
      </Text>

      {/* Íconos de acción inferiores (View y Sound). Solo si las funciones existen. */}
      <View style={[styles.actionIconsContainer, styles.bottomIcons]}>
        {onView && (
          <Pressable onPress={onView}>
            <Ionicons
              name="eye"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}

        {onSound && (
          <Pressable onPress={onSound}>
            <Ionicons
              name="volume-medium"
              size={iconSize}
              color={iconColor}
              style={styles.actionIcon}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

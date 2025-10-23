import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Switch,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 🔥 Usando Ionicons
import { configScreenStyles as styles } from "@/styles/configScreenStyles";

interface ConfigRowProps {
  // Ahora el nombre del icono debe ser un nombre válido de Ionicons
  iconName?: keyof typeof Ionicons.glyphMap;

  // 🔥🔥🔥 PROPIEDAD AÑADIDA PARA LA IMAGEN
  imageSource?: ImageSourcePropType;

  title: string;
  subtitle?: string;
  type: "navigation" | "toggle" | "info";
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  initialValue?: boolean;
}

export function ConfigRow({
  iconName,
  imageSource, // 🔥 Desestructurando la nueva propiedad
  title,
  subtitle,
  type,
  onPress,
  onToggle,
  initialValue = false,
}: ConfigRowProps) {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  const renderAccessory = () => {
    switch (type) {
      case "toggle":
        return (
          <Switch
            onValueChange={toggleSwitch}
            value={isEnabled}
            trackColor={{
              false: "#767577",
              true: styles.toggleActiveTrack.backgroundColor,
            }}
            thumbColor={
              isEnabled ? styles.toggleActiveThumb.backgroundColor : "#f4f3f4"
            }
          />
        );
      case "navigation":
        return (
          <View style={styles.navAccessory}>
            {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
            <Ionicons
              name="chevron-forward"
              size={20}
              color={styles.navIcon.color}
            />
          </View>
        );
      case "info":
      default:
        return subtitle ? (
          <Text style={styles.subtitleText}>{subtitle}</Text>
        ) : null;
    }
  };

  const handlePressOrToggle = () => {
    if (type === "toggle") {
      toggleSwitch();
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={styles.rowContainer}
      onPress={handlePressOrToggle} // Usamos la nueva función combinada
    >
      <View style={styles.iconWrapper}>
        {/* 🔥 Lógica CLAVE: Muestra la imagen si existe, si no, muestra el icono */}
        {imageSource ? (
          // Usamos el estilo userAvatar que asume que lo tienes en tus estilos
          <Image source={imageSource} style={styles.userAvatar} />
        ) : iconName ? (
          <Ionicons name={iconName} size={24} color={styles.icon.color} />
        ) : null}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        {type !== "navigation" &&
          subtitle && ( // Muestra el subtitle si no es navigation o si no se muestra como accessory
            <Text style={styles.rowSubtitle}>{subtitle}</Text>
          )}
      </View>

      {renderAccessory()}
    </Pressable>
  );
}

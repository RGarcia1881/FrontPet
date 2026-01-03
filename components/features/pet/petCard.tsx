// components/ui/PetCard.tsx - VERSIÓN COMPLETA
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "@/styles/screen/pets/petCardStyles";
import { AppColors } from "@/styles/global/theme";

interface PetCardProps {
  name: string;
  breed: string;
  imageSource: any;
  onPress: () => void;
}

export function PetCard({ name, breed, imageSource, onPress }: PetCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(`🖼️ PetCard "${name}":`);
  console.log("   imageSource:", imageSource);
  console.log("   Tipo:", typeof imageSource);
  console.log(
    "   ¿Es base64?:",
    typeof imageSource === "string" && imageSource.startsWith("data:image")
  );
  console.log(
    "   ¿Es URL?:",
    typeof imageSource === "string" && imageSource.startsWith("http")
  );
  console.log("   ¿Es null?:", imageSource === null || imageSource === "");

  // Función para determinar el source de la imagen
  const getImageSource = () => {
    // Caso 1: No hay imagen
    if (!imageSource || imageSource === "" || imageSource === "null") {
      console.log("   📌 Caso 1: No hay imagen, usando placeholder");
      return null;
    }

    // Caso 2: Es base64 string (data:image/...;base64,...)
    if (
      typeof imageSource === "string" &&
      imageSource.startsWith("data:image")
    ) {
      console.log("   📌 Caso 2: Es base64");
      return { uri: imageSource };
    }

    // Caso 3: Es URL (http:// o https://)
    if (
      typeof imageSource === "string" &&
      (imageSource.startsWith("http") || imageSource.startsWith("https"))
    ) {
      console.log("   📌 Caso 3: Es URL");
      return { uri: imageSource };
    }

    // Caso 4: Es require (objeto)
    if (typeof imageSource === "object" && imageSource.uri === undefined) {
      console.log("   📌 Caso 4: Es require");
      return imageSource;
    }

    // Caso 5: Cualquier otra cosa
    console.log("   📌 Caso 5: Tipo desconocido, usando placeholder");
    return null;
  };

  const source = getImageSource();
  const hasImage = source !== null;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {/* Loading indicator */}
        {hasImage && loading && !error && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={AppColors.primary} />
            <Text style={{ fontSize: 10, marginTop: 5, color: "#666" }}>
              Cargando...
            </Text>
          </View>
        )}

        {/* Imagen real */}
        {hasImage && (
          <Image
            source={source}
            style={[
              styles.petImage,
              loading && { opacity: 0.5 },
              error && { display: "none" },
            ]}
            onLoadStart={() => {
              console.log(`📥 Iniciando carga de imagen para ${name}`);
              setLoading(true);
              setError(false);
            }}
            onLoadEnd={() => {
              console.log(`✅ Imagen cargada para ${name}`);
              setLoading(false);
            }}
            onError={(e) => {
              console.log(`❌ Error cargando imagen para ${name}:`, {
                source,
                error: e.nativeEvent.error,
              });
              setError(true);
              setLoading(false);
            }}
            resizeMode="cover"
          />
        )}

        {/* Placeholder si no hay imagen o hay error */}
        {(!hasImage || error) && (
          <View style={styles.placeholderContainer}>
            <FontAwesome name="paw" size={50} color={AppColors.light} />
            <Text style={styles.placeholderText}>{name.charAt(0)}</Text>
            <Text
              style={{
                color: AppColors.light,
                fontSize: 10,
                marginTop: 5,
                opacity: 0.8,
              }}
            >
              {error ? "Error cargando" : "Sin imagen"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.petName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.petBreed} numberOfLines={1}>
          {breed}
        </Text>

        {/* Info debug (opcional) */}
        <Text
          style={{
            fontSize: 9,
            color: "#999",
            marginTop: 4,
            backgroundColor: "#f0f0f0",
            padding: 2,
            borderRadius: 3,
          }}
        >
          {hasImage
            ? typeof imageSource === "string"
              ? `${imageSource.substring(0, 30)}...`
              : "Imagen local"
            : "Sin imagen"}
        </Text>
      </View>

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

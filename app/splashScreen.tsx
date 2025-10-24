import React from "react";
import { View, Image, Text } from "react-native";
import { LoadingAnimation } from "@/components/ui/loadingAnimation";
import { splashStyles as styles } from "@/styles/splashScreenStyles";

// Asumimos que la imagen del logo del perro está en assets/images/dog-logo.png
const dogLogo = require("@/assets/images/Logo.png");

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Contenedor principal para centrar el logo y el título */}
      <View style={styles.mainContent}>
        {/* 🚨 NUEVO: Contenedor Exterior (Círculo de Contorno) */}
        <View style={styles.circleExt}>
          {/* Contenedor del Logo (Círculo Azul Relleno) */}
          <View style={styles.logoContainer}>
            <Image source={dogLogo} style={styles.logo} resizeMode="contain" />
          </View>
        </View>

        {/* Título de la App: Pawmatic en dos tonos */}
        <View style={styles.titleContainer}>
          <Text style={styles.titlePaw}>PAW</Text>
          <Text style={styles.titleMatic}>MATIC</Text>
        </View>
      </View>

      {/* Contenedor de la Animación de carga (Posición Absoluta) */}
      <View style={styles.loaderContainer}>
        <LoadingAnimation />
      </View>
    </View>
  );
}

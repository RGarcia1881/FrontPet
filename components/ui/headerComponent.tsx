import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { headerStyles as styles } from "@/styles/headerComponentStyles";
import { Stack } from "expo-router";
// Importa un icono, por ejemplo, de una librería o tu SVG local
// import { DogIcon } from '@/components/DogIcon';

/**
 * Pantalla principal de la aplicación (Home Screen).
 * Muestra la información de bienvenida, el logo, la imagen del usuario y el contenido principal.
 */
export function HeaderComponent() {
  // ⚠️ HARDCODED DATA (Datos fijos por ahora, como solicitaste)
  const userName = "Raul";
  const profileImageUrl = require("@/assets/images/Profile.jpg"); // Placeholder de imagen
  const logo = require("@/assets/images/LogoNegro.png"); // Placeholder de imagen

  // Función de prueba para simular la navegación o acción
  const handleProfilePress = () => {
    console.log("Navegar a la configuración de perfil.");
    // Ejemplo: router.push('/profile');
  };

  // Componente que simula tu icono de perrito (usando un simple texto o SVG)
  const AppLogoIcon = () => (
    <View style={styles.appLogo}>
      <Image source={logo} style={{ width: 60, height: 60 }} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ⭐️ HEADER SECTION (Cabecera) ⭐️ */}
      <View style={styles.headerContainer}>
        {/* 1. Logo y Texto de Bienvenida */}
        <View style={styles.welcomeSection}>
          {/* Icono del perrito */}
          <AppLogoIcon />

          {/* Texto Bienvenida + Nombre */}
          <View style={styles.textWrapper}>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <Text style={styles.userName} numberOfLines={1}>
              {userName}
            </Text>
          </View>
        </View>

        {/* 2. Imagen de Perfil del Usuario */}
        <TouchableOpacity onPress={handleProfilePress}>
          <Image source={profileImageUrl} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Contenido Principal de la Pantalla (Aquí irá el resto) */}
    </SafeAreaView>
  );
}

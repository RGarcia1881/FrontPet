import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { headerStyles as styles } from "@/styles/screen/home/GeneralUI/headerComponentStyles";

/**
 * Componente de Cabecera (Header Component).
 * Muestra información de bienvenida, logo, imagen de usuario y un menú de cierre de sesión.
 */
export function HeaderComponent() {
  const router = useRouter();

  // ⭐️ OBTENEMOS EL USUARIO DEL CONTEXTO
  const { signOut, user } = useAuth();

  // Estado para controlar la visibilidad del menú desplegable de opciones
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  // ⭐️ DATOS DINÁMICOS: Nombre
  const displayUserName = user
    ? `${user.first_name} ${user.last_name}`
    : "Mascota Amiga";

  // ⭐️ DATOS DINÁMICOS: Imagen de Perfil
  // Comprueba si el objeto de usuario tiene una propiedad 'image' con una URL válida.
  const profileImageSource = user?.image
    ? { uri: user.image } // Usa la URL de la imagen proporcionada por la API
    : require("@/assets/images/Profile.jpg"); // Usa la imagen placeholder local si no hay URL

  const logo = require("@/assets/images/LogoNegro.png"); // Placeholder de imagen del logo

  // Función para alternar la visibilidad del menú
  const handleProfilePress = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    setIsOptionsVisible(false); // Ocultar el menú
    try {
      await signOut();
      router.replace("/(auth)/welcomeScreen");
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
      // Podrías añadir un feedback visual de que el logout falló
    }
  };

  // Componente que simula tu icono de perrito
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
            {/* ⭐️ Nombre Dinámico ⭐️ */}
            <Text style={styles.userName} numberOfLines={1}>
              {displayUserName}
            </Text>
          </View>
        </View>

        {/* 2. Imagen de Perfil del Usuario y Contenedor de Opciones */}
        <View style={internalStyles.profileContainer}>
          <TouchableOpacity onPress={handleProfilePress}>
            {/* ⭐️ Imagen de Perfil Dinámica ⭐️ */}
            <Image source={profileImageSource} style={styles.profileImage} />
          </TouchableOpacity>

          {/* Menú Desplegable (Options Box) */}
          {isOptionsVisible && (
            <View style={internalStyles.optionsBox}>
              <TouchableOpacity
                onPress={handleLogout}
                style={internalStyles.optionButton}
              >
                <Text style={internalStyles.optionText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Contenido Principal de la Pantalla (Aquí irá el resto) */}
    </SafeAreaView>
  );
}

// Estilos internos para el menú desplegable (por simplicidad)
const internalStyles = StyleSheet.create({
  profileContainer: {
    // Contenedor necesario para posicionar el dropdown relativo al perfil
    position: "relative",
    zIndex: 10, // Asegura que esté por encima de otros elementos
  },
  optionsBox: {
    position: "absolute",
    top: 60, // Posición vertical debajo de la imagen (ajustar según el tamaño de la imagen)
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
    paddingVertical: 4,
  },
  optionButton: {
    padding: 12,
    alignItems: "flex-start",
  },
  optionText: {
    fontSize: 16,
    color: "#CC0000", // Color rojo para acción de peligro/cierre
    fontWeight: "600",
  },
});

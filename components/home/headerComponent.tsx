import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  // Se añade StyleSheet para estilos del dropdown
} from "react-native";
// MODIFICADO: Se añaden importaciones necesarias para la lógica
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext"; // Asegúrate de que la ruta sea correcta
import { headerStyles as styles } from "@/styles/screen/home/GeneralUI/headerComponentStyles";

/**
 * Componente de Cabecera (Header Component).
 * Muestra información de bienvenida, logo, imagen de usuario y un menú de cierre de sesión.
 */
export function HeaderComponent() {
  const router = useRouter();

  // ⭐️ MODIFICACIÓN CLAVE: Usamos useAuth para obtener el usuario
  const { signOut, user } = useAuth();

  // AÑADIDO: Estado para controlar la visibilidad del menú desplegable de opciones
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  // ⭐️ DATOS DINÁMICOS DEL USUARIO
  // Usamos el nombre y apellido del usuario, o un valor por defecto si no están cargados.
  const displayUserName = user
    ? `${user.first_name} ${user.last_name}`
    : "Mascota Amiga";

  // La URL de la imagen (debe ser accesible desde la web o un recurso local)
  // Usamos una imagen local por defecto si la URL no está disponible o no se proporciona
  const profileImageSource = user?.image
    ? { uri: user.image } // Si la DB proporciona una URL, úsala
    : require("@/assets/images/Profile.jpg"); // Placeholder local

  const logo = require("@/assets/images/LogoNegro.png"); // Placeholder de imagen

  // AÑADIDO: Función para alternar la visibilidad del menú
  const handleProfilePress = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  // AÑADIDO: Función para cerrar sesión
  const handleLogout = async () => {
    setIsOptionsVisible(false); // Ocultar el menú inmediatamente
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
            {/* ⭐️ CAMPO DINÁMICO ⭐️ */}
            <Text style={styles.userName} numberOfLines={1}>
              {displayUserName}
            </Text>
          </View>
        </View>

        {/* 2. Imagen de Perfil del Usuario y Contenedor de Opciones */}
        <View style={internalStyles.profileContainer}>
          <TouchableOpacity onPress={handleProfilePress}>
            {/* ⭐️ CAMPO DINÁMICO ⭐️ */}
            <Image source={profileImageSource} style={styles.profileImage} />
          </TouchableOpacity>

          {/* AÑADIDO: Menú Desplegable (Options Box) */}
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

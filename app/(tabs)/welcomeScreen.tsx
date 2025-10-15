import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { welcomeStyles as styles } from "@/styles/welcomeScreenStyles";
import { Stack } from "expo-router";

/**
 * Pantalla de Bienvenida (Onboarding) con el logo y opciones de inicio de sesión.
 *
 * NOTA: Debes reemplazar 'require' con la ruta real de tu imagen de perrito.
 * Usaremos una imagen genérica como ejemplo.
 */

const dogImage = require("@/assets/images/Dog1.png"); // Reemplaza con la ruta correcta de tu imagen

export default function WelcomeScreen() {
  // Función de ejemplo para la navegación
  const handleLogin = () => {
    // Aquí iría la navegación a la pantalla de Login
    console.log("Navegar a Iniciar Sesión");
    // Ejemplo: router.push('/login');
  };

  // Función de ejemplo para la navegación
  const handleRegister = () => {
    // Aquí iría la navegación a la pantalla de Registro
    console.log("Navegar a Registrarse");
    // Ejemplo: router.push('/register');
  };

  return (
    <View style={styles.container}>
      {/* Configuración de la cabecera (opcional si la usas fuera del Stack) */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Contenedor Superior con fondo azul y texto */}
      <View style={styles.topContainer}>
        <Text style={styles.mainText}>
          CONECTANDO{"\n"}
          AMOR, {"\n"}
          TECNOLOGÍA{"\n"}Y CROQUETAS
        </Text>
      </View>

      {/* Imagen del Perrito - *** DEBES REEMPLAZAR ESTA RUTA *** */}
      {/* Usamos un SVG en línea como placeholder si no tienes la imagen disponible */}
      <Image source={dogImage} style={styles.dogImage} />

      {/* Contenedor Inferior con fondo blanco y botones */}
      <View style={styles.bottomContainer}>
        <View style={styles.buttonGroup}>
          {/* Botón Iniciar Sesión */}
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, styles.loginText]}>
              Iniciar sesión
            </Text>
          </TouchableOpacity>

          {/* Botón Registrarse */}
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={handleRegister}
          >
            <Text style={[styles.buttonText, styles.registerText]}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

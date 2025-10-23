import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { loginStyles as styles } from "@/styles/loginScreenStyles";
import { Stack } from "expo-router";

/**
 * Pantalla de Inicio de Sesión (Login Screen).
 * Permite al usuario ingresar sus credenciales.
 */

const dogImage = require("@/assets/images/Dog2.png"); // Reemplaza con la ruta correcta de tu imagen

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, introduce tu correo y contraseña.");
      return;
    }
    // Lógica de autenticación iría aquí
    console.log(`Intentando iniciar sesión con: ${email} / ${password}`);
  };

  const handleForgotPassword = () => {
    // Lógica para navegar a la pantalla de recuperación de contraseña
    console.log("Navegar a Olvidé Contraseña");
    // Ejemplo: router.push('/forgot-password');
  };

  const handleRegister = () => {
    // Lógica para navegar a la pantalla de Registro
    console.log("Navegar a Registrarme");
    // Ejemplo: router.push('/register');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Configuración de la cabecera */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Título y Subtítulo */}
      <Text style={styles.headerTitle}>¡HOLA DE NUEVO!</Text>
      <Text style={styles.subtitle}>
        Inicia sesión y deja el resto a nosotros.
      </Text>

      {/* Campo de Correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo de Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Enlace de Olvidé Contraseña */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Enlace de Registrarme */}
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerLink}>Registrarme</Text>
      </TouchableOpacity>

      {/* Imagen del perro (Bull Terrier) - *** REEMPLAZA ESTA RUTA *** */}
      {/* Usamos un placeholder para simular la imagen */}
      <Image
        source={dogImage}
        style={styles.dogImage}
        // Si tienes la imagen en tu proyecto, usa:
        // source={require('../../assets/images/bull-terrier.png')}
      />
    </ScrollView>
  );
}

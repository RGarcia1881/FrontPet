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
import { loginStyles as styles } from "@/styles/auth/loginScreenStyles";
// MODIFICADO: Se añade Redirect para manejar la redirección si el usuario ya está autenticado
import { Stack, useRouter, Redirect } from "expo-router";
import { useAuth } from "@/context/authContext";
// Asumo que tienes este tipo definido en tu proyecto
import { LoginCredentials } from "@/api/auth";

/**
 * Pantalla de Inicio de Sesión (Login Screen).
 * Permite al usuario ingresar sus credenciales.
 */

const dogImage = require("@/assets/images/Dog2.png"); // Reemplaza con la ruta correcta de tu imagen

export default function LoginScreen() {
  const router = useRouter();
  // Se obtiene el estado de autenticación para la redirección inicial
  const { signIn, isLoading: isAuthLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Estado de carga local para el formulario
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      // Usamos Alert para simplicidad, pero se recomienda un modal personalizado
      Alert.alert("Error", "Por favor, introduce tu correo y contraseña.");
      return;
    }

    setLoading(true);

    const credentials: LoginCredentials = { email, password };

    try {
      await signIn(credentials);

      // *** SOLUCIÓN APLICADA: REDIRECCIÓN FORZADA ***
      // Usamos router.replace para navegar al home y reemplazar la pantalla de login
      // en el historial de navegación, asegurando que el usuario no pueda volver con "back".
      router.replace("/(tabs)/homeScreen");
    } catch (e: any) {
      // Usamos Alert para mostrar el error de autenticación del backend
      Alert.alert(
        "Error de Autenticación",
        e.message || "Error desconocido al iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // CORREGIDO: Redirección al grupo (auth) para recuperar contraseña
    // Asumiendo que la ruta es /app/(auth)/forgotPasswordScreen.tsx
    router.push("/homeScreen");
  };

  const handleRegister = () => {
    // CORREGIDO: Redirección al grupo (auth) para registrarse
    // Asumiendo que la ruta es /app/(auth)/registerScreen.tsx
    router.push("/(auth)/registerScreen");
  };

  // Redirección si el usuario ya está autenticado (protección del Login Screen)
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/homeScreen" />;
  }

  // Define si el botón debe estar deshabilitado
  const isButtonDisabled = loading || isAuthLoading;

  return (
    <ScrollView
      contentContainerStyle={styles.viewContainer}
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
        editable={!isButtonDisabled} // Deshabilitar mientras carga
      />

      {/* Campo de Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!isButtonDisabled} // Deshabilitar mientras carga
      />

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity
        // Añadido estilo de opacidad para el estado deshabilitado
        style={[styles.loginButton, isButtonDisabled && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={isButtonDisabled} // Deshabilitar el botón
      >
        {/* Muestra estado de carga en el texto del botón */}
        <Text style={styles.loginButtonText}>
          {isButtonDisabled ? "Cargando..." : "Iniciar sesión"}
        </Text>
      </TouchableOpacity>

      {/* Enlace de Registrarme */}
      <TouchableOpacity onPress={handleRegister} disabled={isButtonDisabled}>
        <Text style={styles.registerLink}>Registrarme</Text>
      </TouchableOpacity>

      {/* Imagen del perro (Bull Terrier) */}
      <Image source={dogImage} style={styles.dogImage} />
    </ScrollView>
  );
}

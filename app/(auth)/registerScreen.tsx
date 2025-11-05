import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
// Importaciones de Expo Router y Auth Context
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext"; // Usamos el hook useAuth
import { registerStyles as styles } from "@/styles/auth/registerScreenStyles";
// Importar RegisterData
import { RegisterData } from "@/api/auth";

/**
 * Pantalla de Registro (Register Screen).
 * Permite al usuario crear una nueva cuenta.
 */
export default function RegisterScreen() {
  const router = useRouter();

  // ⭐️ CORRECCIÓN: Cambiamos 'signUp' a 'register' para coincidir con IAuthContextValue
  const { register, isLoading: isAuthLoading } = useAuth();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // Generamos un 'username' único (obligatorio para la mayoría de las configuraciones de Django).
    const uniqueSuffix = Math.random().toString(36).substring(2, 6);
    // Sintaxis corregida
    const generatedUsername = `${name}_${lastName}_${uniqueSuffix}`
      .toLowerCase()
      .replace(/\s+/g, "");

    setLoading(true);

    // Mapeamos los campos del formulario a la estructura RegisterData de la API
    const data: RegisterData = {
      first_name: name,
      last_name: lastName,
      username: generatedUsername,
      email,
      password,
    };

    try {
      // ⭐️ CORRECCIÓN: Llamamos a la función 'register' del contexto.
      await register(data);

      // Redirección al home tras el éxito
      router.replace("/(tabs)/homeScreen");
    } catch (e: any) {
      Alert.alert(
        "Error de Registro",
        e.message || "Error desconocido al registrar."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.replace("/(auth)/loginScreen");
  };

  const pawImage = require("@/assets/images/paws.png"); // Reemplaza con la ruta correcta de tu imagen
  const isButtonDisabled = loading || isAuthLoading;

  return (
    <View style={{ flex: 1 }}>
      {/* IMAGEN DE HUELLAS - Asegúrate de reemplazar la URI con tu imagen local */}
      <Image source={pawImage} style={styles.pawPrintsImage} />

      <ScrollView
        contentContainerStyle={styles.viewContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Stack.Screen options={{ headerShown: false }} />

        {/* Título y Subtítulo */}
        <Text style={styles.headerTitle}>ÚNETE A LA MANADA</Text>
        <Text style={styles.subtitle}>
          Únete al club y deja las preocupaciones de la comida atrás.
        </Text>

        {/* Campos del formulario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#A0A0A0"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
          editable={!isButtonDisabled}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#A0A0A0"
          autoCapitalize="words"
          value={lastName}
          onChangeText={setLastName}
          editable={!isButtonDisabled}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!isButtonDisabled}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isButtonDisabled}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!isButtonDisabled}
        />

        {/* Botón de Registrarme */}
        <TouchableOpacity
          style={[styles.registerButton, isButtonDisabled && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={isButtonDisabled}
        >
          <Text style={styles.registerButtonText}>
            {isButtonDisabled ? "Registrando..." : "Registrarme"}
          </Text>
        </TouchableOpacity>

        {/* Enlace de Ya tengo cuenta */}
        <TouchableOpacity onPress={handleLogin} disabled={isButtonDisabled}>
          <Text style={[styles.loginLink, { marginBottom: 100 }]}>
            Ya tengo cuenta
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
import { registerStyles as styles } from "@/styles/auth/registerScreenStyles"; // ⭐️ Importa los estilos de registro
import { Stack } from "expo-router";

/**
 * Pantalla de Registro (Register Screen).
 * Permite al usuario crear una nueva cuenta.
 */
export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // Lógica de registro iría aquí (e.g., Firebase Auth)
    console.log(
      `Intentando registrar a ${name} ${lastName} con correo ${email}`
    );
  };

  const handleLogin = () => {
    // Lógica para navegar a la pantalla de Inicio de Sesión
    console.log("Navegar a Ya tengo cuenta");
    // Ejemplo: router.push('/login');
  };

  const pawImage = require("@/assets/images/paws.png"); // Reemplaza con la ruta correcta de tu imagen

  return (
    <View style={{ flex: 1 }}>
      {/* ⭐️ IMAGEN DE HUELLAS - Asegúrate de reemplazar la URI con tu imagen local */}
      <Image source={pawImage} style={styles.pawPrintsImage} />

      {/* ScrollView para el formulario (es scrollable) */}
      <ScrollView
        contentContainerStyle={styles.viewContainer}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Configuración de la cabecera */}
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
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#A0A0A0"
          autoCapitalize="words"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Botón de Registrarme */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Registrarme</Text>
        </TouchableOpacity>

        {/* Enlace de Ya tengo cuenta */}
        <TouchableOpacity onPress={handleLogin}>
          <Text style={[styles.loginLink, { marginBottom: 100 }]}>
            Ya tengo cuenta
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

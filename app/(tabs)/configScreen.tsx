// app/(tabs)/configScreen.tsx
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { configScreenStyles as styles } from "@/styles/screen/settings/configScreenStyles";
import { ConfigSection } from "@/components/ui/configSection";
import { ConfigRow } from "@/components/ui/configRow";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { UserProfileModal } from "@/components/features/user/userProfileModal";
import { UserProfileData } from "@/api/users";

// Simula la fuente de la imagen del usuario por defecto
const defaultProfileImage = require("@/assets/images/Profile.jpg");

export default function ConfigScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const wifiStatus = "Semillero Invst";

  const handlePress = (route: string) => {
    console.log(`Navegar a: ${route}`);
    // Aquí puedes agregar la lógica de navegación según sea necesario
  };
  const handleTermPress = (route: string) => {
    router.push(`/(legal)/Terms`);
  };

  const handleToggle = (setting: string, value: boolean) => {
    console.log(`${setting} cambiado a: ${value}`);
  };

  // Función específica para calibración
  const handleCalibrationPress = () => {
    router.push("/(hardware)/calibrationScreen");
  };

  // Función para abrir el modal de perfil
  const handleProfilePress = () => {
    if (isAuthenticated) {
      setShowProfileModal(true);
    } else {
      router.push("/(auth)/login");
    }
  };

  // Función para manejar el éxito de actualización del perfil
  const handleProfileUpdateSuccess = (updatedUser: UserProfileData) => {
    console.log("Perfil actualizado:", updatedUser);
    // No necesitamos hacer nada aquí porque el AuthContext ya se actualizó
    setShowProfileModal(false);
  };

  // Estado de carga mientras verificamos autenticación
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10, color: "#666" }}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Obtener datos dinámicos del usuario
  const userName = user
    ? `${user.first_name} ${user.last_name}`.trim()
    : "Iniciar Sesión";

  const profileImage =
    user?.image || user?.image_url
      ? { uri: user.image || user.image_url }
      : defaultProfileImage;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.screenTitle}>Ajustes.</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- SECCIÓN 1: USUARIO --- */}
        <View style={styles.sectionContainer}>
          <ConfigSection iconName="person" title="Usuario" />
          <ConfigRow
            imageSource={profileImage}
            title={userName}
            subtitle={user?.email || ""}
            type="navigation"
            onPress={handleProfilePress}
          />

          {/* Mostrar mensaje si no está autenticado */}
          {!isAuthenticated && (
            <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
              <Text
                style={{ color: "#666", fontSize: 14, textAlign: "center" }}
              >
                Inicia sesión para acceder a todas las funciones
              </Text>
            </View>
          )}
        </View>

        {/* --- SECCIÓN 2: DISPOSITIVO Y CONEXIÓN --- */}
        <View style={styles.sectionContainer}>
          <ConfigSection
            iconName="phone-portrait-outline"
            title="Dispositivo y Conexión"
          />
          <ConfigRow
            iconName="wifi-outline"
            title="Conexión Wi-Fi"
            subtitle={wifiStatus}
            type="navigation"
            onPress={() => handlePress("wifiSettings")}
          />
        </View>

        {/* --- SECCIÓN 3: CONFIGURACIONES DE LA APP --- */}
        <View style={styles.sectionContainer}>
          <ConfigSection
            iconName="cog-outline"
            title="Configuraciones de la App"
          />
          <ConfigRow
            iconName="notifications-outline"
            title="Notificaciones Push"
            subtitle="Recordatorios y alertas"
            type="toggle"
            initialValue={true}
            onToggle={(v) => handleToggle("notificaciones", v)}
          />
        </View>

        {/* --- SECCIÓN 4: ACCESO RÁPIDO --- */}
        <View style={styles.sectionContainer}>
          <ConfigSection
            iconName="heart-circle-outline"
            title="Acceso Rápido"
          />
          <ConfigRow
            iconName="settings-outline"
            title="Calibración del dispensador"
            type="navigation"
            onPress={handleCalibrationPress}
          />
        </View>

        {/* --- SECCIÓN 5: SOPORTE Y PRIVACIDAD --- */}
        <View style={styles.sectionContainer}>
          <ConfigSection
            iconName="shield-half-outline"
            title="Soporte y Privacidad"
          />
          <ConfigRow
            iconName="help-circle-outline"
            title="Ayuda y FAQ"
            type="navigation"
            onPress={() => handlePress("faq")}
          />
          <ConfigRow
            iconName="file-tray-full-outline"
            title="Términos de Servicio"
            type="navigation"
            onPress={() => handleTermPress("terms")}
          />
        </View>
      </ScrollView>

      {/* Modal de Perfil de Usuario */}
      <UserProfileModal
        visible={showProfileModal}
        user={user || null}
        onClose={() => setShowProfileModal(false)}
        onSuccess={handleProfileUpdateSuccess}
      />
    </SafeAreaView>
  );
}

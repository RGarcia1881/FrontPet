// app/(tabs)/configScreen.tsx

import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { configScreenStyles as styles } from "@/styles/screen/settings/configScreenStyles";
import { ConfigSection } from "@/components/ui/configSection";
import { ConfigRow } from "@/components/ui/configRow";
import { useRouter } from "expo-router";

// Simula la fuente de la imagen del usuario
const perfil = require("@/assets/images/Profile.jpg");

export default function ConfigScreen() {
  const router = useRouter();
  const wifiStatus = "Home_WiFI_1";

  const handlePress = (route: string) => {
    console.log(`Navegar a: ${route}`);
    // Aquí puedes agregar la lógica de navegación según sea necesario
  };

  const handleToggle = (setting: string, value: boolean) => {
    console.log(`${setting} cambiado a: ${value}`);
  };

  // Función específica para calibración
  const handleCalibrationPress = () => {
    router.push("/(hardware)/calibrationScreen");
  };

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
            imageSource={perfil}
            title="USUARIO"
            type="navigation"
            onPress={() => handlePress("userProfile")}
          />
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
          <ConfigRow
            iconName="alert-circle-outline"
            title="Aviso de nivel"
            subtitle="Notificar cuando el nivel esté bajo"
            type="toggle"
            initialValue={true}
            onToggle={(v) => handleToggle("nivelBajo", v)}
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
          <ConfigRow
            iconName="sparkles-outline"
            title="Efectos de sonido"
            subtitle="Sonidos de la app."
            type="toggle"
            initialValue={false}
            onToggle={(v) => handleToggle("sonidos", v)}
          />
          <ConfigRow
            iconName="moon-outline"
            title="Modo Oscuro"
            subtitle="Activa el modo oscuro."
            type="toggle"
            initialValue={false}
            onToggle={(v) => handleToggle("modoOscuro", v)}
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
            onPress={handleCalibrationPress} // ✅ Corregido
          />
          <ConfigRow
            iconName="paw-outline"
            title="Perfil de mascotas & info. de salud"
            type="navigation"
            onPress={() => handlePress("petProfile")}
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
            iconName="document-text-outline"
            title="Política de Privacidad"
            type="navigation"
            onPress={() => handlePress("privacy")}
          />
          <ConfigRow
            iconName="file-tray-full-outline"
            title="Términos de Servicio"
            type="navigation"
            onPress={() => handlePress("terms")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

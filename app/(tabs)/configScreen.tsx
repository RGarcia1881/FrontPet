// app/(tabs)/configScreen.tsx

import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
// 🔥 Importación de FontAwesome 5 (asumiendo que tus componentes internos la usan)
// Eliminamos la importación mixta de Ionicons y FontAwesome
import { configScreenStyles as styles } from "@/styles/configScreenStyles";
import { ConfigSection } from "@/components/ui/configSection";
import { ConfigRow } from "@/components/ui/configRow";

// Simula la fuente de la imagen del usuario (Asegúrate de cambiar esta ruta)
const perfil = require("@/assets/images/Profile.jpg");

export default function ConfigScreen() {
  const wifiStatus = "Home_WiFI_1";

  const handlePress = (route: string) => {
    console.log(`Navegar a: ${route}`);
  };

  const handleToggle = (setting: string, value: boolean) => {
    console.log(`${setting} cambiado a: ${value}`);
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
          {/* Icono de la sección: user-alt */}
          <ConfigSection iconName="person" title="Usuario" />
          <ConfigRow
            // 🔥 Usamos la imagen para el avatar, si tu ConfigRow lo soporta
            imageSource={perfil}
            title="USUARIO"
            type="navigation"
            onPress={() => handlePress("userProfile")}
          />
        </View>

        {/* --- SECCIÓN 2: DISPOSITIVO Y CONEXIÓN --- */}
        <View style={styles.sectionContainer}>
          {/* Icono de la sección: mobile-alt */}
          <ConfigSection
            iconName="phone-portrait-outline"
            title="Dispositivo y Conexión"
          />
          <ConfigRow
            iconName="wifi" // 📶
            title="Conexión Wi-Fi"
            subtitle={wifiStatus}
            type="navigation"
            onPress={() => handlePress("wifiSettings")}
          />
          <ConfigRow
            iconName="alert-sharp" // ✅
            title="Aviso de nivel"
            subtitle="Notificar cuando el nivel esté bajo"
            type="toggle"
            initialValue={true}
            onToggle={(v) => handleToggle("nivelBajo", v)}
          />
        </View>

        {/* --- SECCIÓN 3: CONFIGURACIONES DE LA APP --- */}
        <View style={styles.sectionContainer}>
          {/* Icono de la sección: cog */}
          <ConfigSection
            iconName="cog-outline"
            title="Configuraciones de la App"
          />
          <ConfigRow
            iconName="notifications" // 🔔
            title="Notificaciones Push"
            subtitle="Recordatorios y alertas"
            type="toggle"
            initialValue={true}
            onToggle={(v) => handleToggle("notificaciones", v)}
          />
          <ConfigRow
            iconName="sparkles" // 🔊
            title="Efectos de sonido"
            subtitle="Sonidos de la app."
            type="toggle"
            initialValue={false}
            onToggle={(v) => handleToggle("sonidos", v)}
          />
          <ConfigRow
            iconName="moon" // 🌙
            title="Modo Oscuro"
            subtitle="Activa el modo oscuro."
            type="toggle"
            initialValue={false}
            onToggle={(v) => handleToggle("modoOscuro", v)}
          />
        </View>

        {/* --- SECCIÓN 4: ACCESO RÁPIDO --- */}
        <View style={styles.sectionContainer}>
          {/* Icono de la sección: heart */}
          <ConfigSection
            iconName="heart-circle-outline"
            title="Acceso Rápido"
          />
          <ConfigRow
            title="Calibración del dispensador"
            type="navigation"
            onPress={() => handlePress("calibrationScreen")}
          />
          <ConfigRow
            title="Perfil de mascotas & info. de salud"
            type="navigation"
            onPress={() => handlePress("petProfile")}
          />
        </View>

        {/* --- SECCIÓN 5: SOPORTE Y PRIVACIDAD --- */}
        <View style={styles.sectionContainer}>
          {/* Icono de la sección: shield-alt */}
          <ConfigSection
            iconName="shield-half-outline"
            title="Soporte y Privacidad"
          />
          <ConfigRow
            title="Ayuda y FAQ"
            type="navigation"
            onPress={() => handlePress("faq")}
          />
          <ConfigRow
            title="Política de Privacidad"
            type="navigation"
            onPress={() => handlePress("privacy")}
          />
          <ConfigRow
            title="Términos de Servicio"
            type="navigation"
            onPress={() => handlePress("terms")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

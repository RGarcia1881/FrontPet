import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { checkPendingSchedules } from "@/services/scheduleService";
import { executeAutomaticFoodRoutine } from "@/services/autoDispatchService";
import {
  startWaterMonitor,
  stopWaterMonitor,
  checkAndDispenseWaterIfNeeded,
} from "@/services/waterMonitorService";

// Componente para verificar horarios y monitorear agua automáticamente
function ScheduleAndWaterChecker() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      console.log("🚫 [AUTO-SYSTEM] Usuario no autenticado o sin ID");
      stopWaterMonitor(); // Detener monitor de agua si no hay usuario
      return;
    }

    console.log("👤 [AUTO-SYSTEM] Usuario autenticado:", user.id);

    const performChecks = async () => {
      try {
        console.log(
          "⏰ [AUTO-SYSTEM] Ejecutando verificaciones automáticas..."
        );

        // 1. Verificar horarios de comida
        const shouldDispatchFood = await checkPendingSchedules(user.id);

        if (shouldDispatchFood) {
          console.log(
            "🍗 [AUTO-SYSTEM] Ejecutando dispensación automática de comida"
          );
          await executeAutomaticFoodRoutine();
        } else {
          console.log("💤 [AUTO-SYSTEM] No hay horarios de comida pendientes");
        }

        // 2. Verificar nivel de agua (esto también se ejecuta automáticamente cada minuto)
        console.log("💧 [AUTO-SYSTEM] Verificando nivel de agua...");
        const waterDispensed = await checkAndDispenseWaterIfNeeded();

        if (waterDispensed) {
          console.log("✅ [AUTO-SYSTEM] Agua dispensada automáticamente");
        }
      } catch (error) {
        console.error(
          "❌ [AUTO-SYSTEM] Error en verificaciones automáticas:",
          error
        );
      }
    };

    // Verificar inmediatamente al cargar la app
    console.log("🔍 [AUTO-SYSTEM] Verificación inicial al cargar app");
    performChecks();

    // Iniciar monitor de agua (se ejecuta en su propio intervalo)
    console.log("🚀 [AUTO-SYSTEM] Iniciando monitor de agua...");
    startWaterMonitor();

    // Configurar intervalo general para verificaciones (cada minuto)
    const checkInterval = setInterval(performChecks, 60000); // 1 minuto
    console.log("🔄 [AUTO-SYSTEM] Intervalo general configurado: 60 segundos");

    return () => {
      console.log("🧹 [AUTO-SYSTEM] Limpiando recursos...");
      clearInterval(checkInterval);
      stopWaterMonitor();
    };
  }, [isAuthenticated, user?.id]);

  return null;
}

// Componente para cargar el estado inicial del monitor de agua
function WaterMonitorInitializer() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      return;
    }

    // Cargar configuración inicial del monitor de agua
    const initializeWaterMonitor = async () => {
      try {
        // Aquí podrías cargar configuraciones personalizadas del usuario
        console.log("💧 [WATER-MONITOR] Inicializando configuración...");

        // Opcional: Cargar umbral personalizado desde AsyncStorage
        // const customThreshold = await AsyncStorage.getItem('user_water_threshold');
        // if (customThreshold) {
        //   console.log(`💧 [WATER-MONITOR] Umbral personalizado: ${customThreshold}g`);
        // }
      } catch (error) {
        console.error("❌ [WATER-MONITOR] Error inicializando:", error);
      }
    };

    initializeWaterMonitor();
  }, [isAuthenticated, user?.id]);

  return null;
}

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Galindo: require("../assets/fonts/Galindo-Regular.ttf"),
  });

  // Solo esperamos que carguen las fuentes.
  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Componente principal que maneja todas las automatizaciones */}
      {/* <ScheduleAndWaterChecker /> */}

      {/* Inicializador para configuraciones adicionales */}
      {/* <WaterMonitorInitializer /> */}

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

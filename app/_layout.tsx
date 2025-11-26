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
import { executeAutomaticFoodRoutine } from "@/services/autoDispatchService"; // ✅ Importación correcta

// Componente para verificar horarios automáticamente
function ScheduleChecker() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      console.log("🚫 [SCHEDULE] Usuario no autenticado o sin ID");
      return;
    }

    console.log("👤 [SCHEDULE] Usuario autenticado:", user.id);

    const checkAndDispatch = async () => {
      try {
        console.log("⏰ [SCHEDULE] Ejecutando verificación programada...");
        const shouldDispatch = await checkPendingSchedules(user.id);

        if (shouldDispatch) {
          console.log(
            "🚀 [SCHEDULE] Ejecutando dispensación automática de comida"
          );
          await executeAutomaticFoodRoutine();
        } else {
          console.log(
            "💤 [SCHEDULE] No hay horarios pendientes en este momento"
          );
        }
      } catch (error) {
        console.error("❌ [SCHEDULE] Error en verificación automática:", error);
      }
    };

    // Verificar inmediatamente al cargar
    console.log("🔍 [SCHEDULE] Verificación inicial al cargar app");
    checkAndDispatch();

    // Configurar intervalo para verificar cada minuto
    const interval = setInterval(checkAndDispatch, 60000); // 1 minuto
    console.log("🔄 [SCHEDULE] Intervalo configurado: 60 segundos");

    return () => {
      console.log("🧹 [SCHEDULE] Limpiando intervalo");
      clearInterval(interval);
    };
  }, [isAuthenticated, user?.id]);

  return null; // Este componente no renderiza nada visual
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
      {/* Renderizamos el ScheduleChecker aquí */}
      <ScheduleChecker />

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

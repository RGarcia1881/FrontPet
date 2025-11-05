import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router"; // Importante: NO importar Redirect
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context/authContext"; // No necesitamos useAuth aquí

// Evita que la splash screen se oculte automáticamente (si aún la usa nativamente)
// import * as ExpoSplashScreen from "expo-splash-screen";
// ExpoSplashScreen.preventAutoHideAsync();

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

  // NO HAY LOGICA DE REDIRECCIÓN AQUÍ
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Simplemente definimos las rutas que existen */}
        {/* La lógica de redirección se mueve a app/index.tsx y app/splashScreen.tsx */}
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

// ==========================================================
// 2. Componente RootLayout (Proveedor de Autenticación)
// ==========================================================
export default function RootLayout() {
  return (
    // Es CRÍTICO envolver todo el contenido en el AuthProvider
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

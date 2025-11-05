import React, { useEffect, useState } from "react"; // 1. Importar useState
import { View, Image, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { LoadingAnimation } from "@/components/ui/loadingAnimation";
import { splashStyles as styles } from "@/styles/splashScreenStyles";
import { useAuth } from "@/context/authContext";

// Asumimos que la imagen del logo del perro está en assets/images/dog-logo.png
const dogLogo = require("@/assets/images/Logo.png");

export default function SplashScreen() {
  // Estado de autenticación
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // 2. Nuevo estado para el temporizador
  // (Controla si ya pasaron los 3 segundos)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // 3. Efecto para el temporizador de 3 segundos
  useEffect(() => {
    // Inicia un temporizador que cambiará 'minTimeElapsed' a true después de 3000ms
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3000); // 3 segundos

    // Limpieza: si el componente se desmonta antes, cancelamos el temporizador
    return () => clearTimeout(timer);
  }, []); // El array vacío asegura que esto solo se ejecute una vez (al montar)

  // 4. Lógica de redirección (Modificada)
  useEffect(() => {
    // AHORA REDIRIGIMOS SOLO SI AMBAS CONDICIONES SE CUMPLEN:
    // 1. El AuthContext terminó de cargar (!isLoading)
    // 2. Ya pasaron los 3 segundos (minTimeElapsed)
    if (!isLoading && minTimeElapsed) {
      if (isAuthenticated) {
        // Usuario logueado: Redirigir al Home.
        router.replace("/(tabs)/homeScreen");
      } else {
        // Usuario no logueado: Redirigir a la pantalla de Bienvenida.
        router.replace("/(auth)/welcomeScreen");
      }
    }
  }, [isLoading, isAuthenticated, router, minTimeElapsed]); // 5. Añadir minTimeElapsed a las dependencias

  // 6. Retornar el diseño de la UI
  // (Se mostrará mientras isLoading=true O minTimeElapsed=false)
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Contenedor principal para centrar el logo y el título */}
      <View style={styles.mainContent}>
        {/* ... (El resto de su UI de Splash) ... */}
        <View style={styles.circleExt}>
          <View style={styles.logoContainer}>
            <Image source={dogLogo} style={styles.logo} resizeMode="contain" />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titlePaw}>PAW</Text>
          <Text style={styles.titleMatic}>MATIC</Text>
        </View>
      </View>

      {/* Contenedor de la Animación de carga (Posición Absoluta) */}
      <View style={styles.loaderContainer}>
        <LoadingAnimation />
      </View>
    </View>
  );
}

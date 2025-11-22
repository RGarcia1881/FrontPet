import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
// 🔥 Importamos FontAwesome5 para los iconos de las pestañas
import { FontAwesome5 } from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
// Eliminamos la importación de IconSymbol ya que usaremos FontAwesome5
// import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/features/layout/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
// 🔥 Asumimos que AppColors es necesario para definir el color base de la aplicación.
import { AppColors } from "@/styles/global/theme";

/**
 * Componente que renderiza un icono para la pestaña.
 * Usamos la misma función auxiliar que habíamos definido antes.
 * @param name Nombre del icono de FontAwesome5
 * @param color Color del icono (viene de las props de Tabs)
 */
function TabBarIcon(props: {
  name: keyof typeof FontAwesome5.glyphMap;
  color: string;
}) {
  return <FontAwesome5 size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // Usamos AppColors.primary para la consistencia del color activo
  // Opcional: podrías usar Colors[colorScheme ?? "light"].tint si quieres seguir el esquema de color.
  const activeTintColor =
    AppColors.primary || Colors[colorScheme ?? "light"].tint;

  return (
    <Tabs
      screenOptions={{
        // ...
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarButton: HapticTab,

        // 🚨 NO usamos tabBarBackground, pero si lo tuvieras, asegúrate de que no tenga bordes.
        // tabBarBackground: TabBarBackground,

        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "white",
            // 🔥 SOLUCIÓN 1 (iOS): Eliminar el borde superior por defecto de la barra
            borderTopWidth: 0,
            // Puedes añadir una sombra personalizada si lo deseas, por ejemplo:
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          default: {
            backgroundColor: "white",
            // 🔥 SOLUCIÓN 2 (Android/Web): Eliminar la elevación/sombra por defecto
            elevation: 0,
            borderTopWidth: 0,
          },
        }),
      }}
    >
      {/* 1. HOME (Inicio) - Pantalla añadida al inicio */}
      <Tabs.Screen
        name="homeScreen" // Usamos el nombre de archivo existente
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* 2. SCHEDULES (Horarios / Tareas) */}
      <Tabs.Screen
        name="scheduleScreen" // Asegúrate de que este archivo exista en (tabs)/schedules.tsx
        options={{
          title: "Horarios",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />

      {/* 3. PETS (Mascotas) */}
      <Tabs.Screen
        name="petScreen" // Asegúrate de que este archivo exista en (tabs)/pets.tsx
        options={{
          title: "Mascotas",
          tabBarIcon: ({ color }) => <TabBarIcon name="dog" color={color} />,
        }}
      />

      {/* 4. DISPENSER (Dispensador) */}
      <Tabs.Screen
        name="dispenserScreen" // Asegúrate de que este archivo exista en (tabs)/dispenser.tsx
        options={{
          title: "Dispensador",
          tabBarIcon: ({ color }) => <TabBarIcon name="bone" color={color} />,
        }}
      />

      {/* 5. CONFIG (Configuración) */}
      <Tabs.Screen
        name="configScreen" // Asegúrate de que este archivo exista en (tabs)/config.tsx
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}

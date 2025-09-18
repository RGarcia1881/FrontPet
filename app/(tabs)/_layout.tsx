import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="pets"
        options={{
          title: "Mascotas",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="pawprint.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dispensers"
        options={{
          title: "Dispensadores",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cube.box.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calibrationScreen"
        options={{
          title: "Calibrar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="scale.3d" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videoStreamScreen"
        options={{
          title: "Cámara",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="video.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="createPet"
        options={{
          title: "CrearM",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Usuarios",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.3.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

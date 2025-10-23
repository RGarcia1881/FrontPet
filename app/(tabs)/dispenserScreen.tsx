// app/(tabs)/dispenserScreen.tsx

import React from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { dispenserScreenStyles as styles } from "@/styles/dispenserScreenStyles";
import { CentralDispenserInfo } from "@/components/ui/centralDispenserInfo";
import { AnimatedDispenser } from "@/components/ui/animatedDispenser";

// --- DATOS INICIALES ---
const DISPENSERS_DATA = [
  {
    id: 1,
    name: "Disp. 1 (Sala)",
    location: "Sala",
    status: "Activo",
    waterLevel: 75,
    foodLevel: 30,
    isConnected: true,
    hasPower: true,
    position: "center",
  },
  {
    id: 2,
    name: "Disp. 2 (Cocina)",
    location: "Cocina",
    status: "Inactivo",
    waterLevel: 20,
    foodLevel: 90,
    isConnected: false,
    hasPower: true,
    position: "right",
  },
  {
    id: 3,
    name: "Disp. 3 (Exterior)",
    location: "Exterior",
    status: "Activo",
    waterLevel: 50,
    foodLevel: 50,
    isConnected: true,
    hasPower: false,
    position: "bottom",
  },
  {
    id: 99,
    name: "Añadir",
    location: "",
    status: "",
    waterLevel: 0,
    foodLevel: 0,
    isConnected: true,
    hasPower: true,
    position: "add",
  },
];

export default function DispenserScreen() {
  const [dispensers, setDispensers] = React.useState(DISPENSERS_DATA);
  // Ahora mainDispenser puede ser el ID 99
  const mainDispenser = dispensers.find((d) => d.position === "center");

  // Funciones de acción
  const handleEdit = () =>
    console.log(`Editar Dispensador ${mainDispenser?.id}`);
  const handleDelete = () =>
    console.log(`Eliminar Dispensador ${mainDispenser?.id}`);
  const handleView = () =>
    console.log(`Ver detalles de Dispensador ${mainDispenser?.id}`);
  const handleSound = () =>
    console.log(`Activar sonido en Dispensador ${mainDispenser?.id}`);

  // 🔥 handleAdd ahora es una función que solo se llamará desde AnimatedDispenser
  const handleAdd = () =>
    console.log("Añadir nuevo dispensador (Activado desde el centro)");

  // LÓGICA DE ROTACIÓN CIRCULAR (TODO GIRA)
  const handleSelectDispenser = (selectedId: number) => {
    // 🔥 ELIMINAMOS la condición 'if (selectedId === 99) { return handleAdd(); }'
    // para que el ID 99 pueda rotar al centro.

    setDispensers((prevDispensers) => {
      const currentCenter = prevDispensers.find((d) => d.position === "center");
      const selectedDispenser = prevDispensers.find((d) => d.id === selectedId);

      if (
        !currentCenter ||
        !selectedDispenser ||
        selectedId === currentCenter.id
      ) {
        return prevDispensers;
      }

      // Orden de rotación: Derecha -> Abajo -> Izquierda (Add) -> Derecha
      const rotationSequence = {
        right: "bottom",
        bottom: "add",
        add: "right",
      };

      // Posición a la que se moverá el antiguo centro
      const positionSelectedLeft = selectedDispenser.position as
        | "right"
        | "bottom"
        | "add";
      const targetPositionForOldCenter = rotationSequence[positionSelectedLeft];

      return prevDispensers.map((d) => {
        if (d.id === selectedId) {
          // 1. El seleccionado (incluyendo el ID 99) va al centro
          return { ...d, position: "center" };
        } else if (d.id === currentCenter.id) {
          // 2. El antiguo centro rota al siguiente spot en la secuencia
          return { ...d, position: targetPositionForOldCenter };
        } else if (d.position !== "center") {
          // 3. Los otros dos periféricos rotan una posición
          const newPosition =
            rotationSequence[d.position as "right" | "bottom" | "add"];
          return { ...d, position: newPosition || d.position };
        }
        return d;
      });
    });
  };

  // Props del círculo central
  const centralInfoProps = mainDispenser
    ? {
        name: mainDispenser.name,
        location: mainDispenser.location,
        status: mainDispenser.status,
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
        onSound: handleSound,
        // Pasamos handleAdd solo si el dispensador central es el botón '+'
        onAddClick: mainDispenser.id === 99 ? handleAdd : undefined,
      }
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Título y Subtítulo */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mis ayudantes</Text>
          <Text style={styles.subtitle}>
            Revisa el nivel y el funcionamiento de tus dispensadores.
          </Text>
        </View>

        {/* 2. CONTENEDOR DE LA ANIMACIÓN (Rotación) */}
        <View style={styles.dispenserAnimationContainer}>
          {dispensers.map((disp) => (
            <AnimatedDispenser
              key={disp.id}
              dispenser={disp}
              // Usaremos esta función para rotar, no para ejecutar handleAdd
              onSelect={handleSelectDispenser}
            />
          ))}
        </View>

        {/* 3. Contenedor Circular Principal (Elementos Fijos) */}
        <View style={styles.circularContainer}>
          {/* CÍRCULO DE INFORMACIÓN CENTRAL */}
          {/* 🔥 Pasamos 'onAddClick' al CentralDispenserInfo */}
          {centralInfoProps && <CentralDispenserInfo {...centralInfoProps} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { dispenserScreenStyles as styles } from "@/styles/screen/dispenser/dispenserScreenStyles";
import { CentralDispenserInfo } from "@/components/features/dispenser/centralDispenserInfo";
import { AnimatedDispenser } from "@/components/features/dispenser/animatedDispenser";
import {
  checkPendingSchedules,
  clearExecutedSchedules,
} from "@/services/scheduleService";
import { executeAutomaticFoodRoutine } from "@/services/autoDispatchService";
import { useAuth } from "@/context/authContext";

// --- TIPOS CORREGIDOS (Solo 4 posiciones) ---
type DispenserPosition = "top" | "right" | "bottom" | "left";

interface DispenserData {
  id: number;
  name: string;
  location: string;
  status: string;
  waterLevel: number;
  foodLevel: number;
  isConnected: boolean;
  hasPower: boolean;
  position: DispenserPosition;
}

// --- DATOS INICIALES (3 DISPENSADORES + BOTÓN AÑADIR) ---
const DISPENSERS_DATA: DispenserData[] = [
  {
    id: 1,
    name: "Disp. 1 (Sala)",
    location: "Sala",
    status: "Activo",
    waterLevel: 75,
    foodLevel: 30,
    isConnected: true,
    hasPower: true,
    position: "top", // FOCO INICIAL
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
    position: "left",
  },
];

export default function DispenserScreen() {
  const { user } = useAuth();
  const [dispensers, setDispensers] = React.useState(DISPENSERS_DATA);
  const mainDispenser = dispensers.find((d) => d.position === "top");

  // Funciones de acción existentes
  const handleEdit = () =>
    console.log(`Editar Dispensador ${mainDispenser?.id}`);
  const handleDelete = () =>
    console.log(`Eliminar Dispensador ${mainDispenser?.id}`);
  const handleView = () =>
    console.log(`Ver detalles de Dispensador ${mainDispenser?.id}`);
  const handleSound = () =>
    console.log(`Activar sonido en Dispensador ${mainDispenser?.id}`);
  const handleAdd = () => {
    console.log("Añadir nuevo dispensador");
  };

  // ✅ NUEVAS FUNCIONES PARA COMIDA Y AGUA
  const handleFood = () => {
    console.log(`Activar comida en dispensador ${mainDispenser?.id}`);
  };

  const handleWater = () => {
    console.log(`Activar agua en dispensador ${mainDispenser?.id}`);
  };

  // --- LÓGICA DE GIRO HORARIO SIMPLE ---

  type PositionKey = DispenserPosition;

  // 🔥 CICLO DE GIRO HORARIO (Clockwise): El que estaba en X se mueve a Y
  // top -> right -> bottom -> left -> top
  const CLOCKWISE_CYCLE: Record<PositionKey, PositionKey> = {
    top: "right",
    right: "bottom",
    bottom: "left",
    left: "top",
  };

  // LÓGICA DE ROTACIÓN CONDICIONAL
  const handleSelectDispenser = (selectedId: number) => {
    setDispensers((prevDispensers) => {
      const selectedDispenser = prevDispensers.find((d) => d.id === selectedId);

      if (!selectedDispenser || selectedDispenser.position !== "right") {
        return prevDispensers;
      }

      const rotatedDispensers = prevDispensers.map((d) => {
        const oldPosition = d.position as PositionKey;
        const newPosition = CLOCKWISE_CYCLE[oldPosition];

        return { ...d, position: newPosition };
      });

      return rotatedDispensers;
    });
  };

  // Props del círculo central
  const centralInfoProps = mainDispenser
    ? {
        name: mainDispenser.name,
        location: mainDispenser.location,
        status: mainDispenser.status,
        waterLevel: mainDispenser.waterLevel,
        foodLevel: mainDispenser.foodLevel,
        onUpdateWaterLevel: (level: number) => {
          console.log(`💧 Actualizando waterLevel a: ${level}%`);
          setDispensers((prev) =>
            prev.map((d) => (d.id === 1 ? { ...d, waterLevel: level } : d))
          );
        },
        onUpdateFoodLevel: (level: number) => {
          console.log(`🍽️ Actualizando foodLevel a: ${level}%`);
          setDispensers((prev) =>
            prev.map((d) => (d.id === 1 ? { ...d, foodLevel: level } : d))
          );
        },
        onEdit: mainDispenser.id !== 99 ? handleEdit : undefined,
        onDelete: mainDispenser.id !== 99 ? handleDelete : undefined,
        onView: mainDispenser.id !== 99 ? handleView : undefined,
        onSound: mainDispenser.id !== 99 ? handleSound : undefined,
        onFood: mainDispenser.id !== 99 ? handleFood : undefined,
        onWater: mainDispenser.id !== 99 ? handleWater : undefined,
        onAddClick: mainDispenser.id === 99 ? handleAdd : undefined,
      }
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mis ayudantes</Text>
          <Text style={styles.subtitle}>
            Revisa el nivel y el funcionamiento de tus dispensadores.
          </Text>
        </View>

        <View style={styles.dispenserAnimationContainer}>
          {dispensers.map((disp) => (
            <AnimatedDispenser
              key={disp.id}
              dispenser={disp as any}
              onSelect={handleSelectDispenser}
            />
          ))}
        </View>

        <View style={styles.circularContainer} pointerEvents="box-none">
          {centralInfoProps && <CentralDispenserInfo {...centralInfoProps} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

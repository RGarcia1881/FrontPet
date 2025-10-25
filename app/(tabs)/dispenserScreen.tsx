import React from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { dispenserScreenStyles as styles } from "@/styles/screen/dispenser/dispenserScreenStyles";
import { CentralDispenserInfo } from "@/components/features/dispenser/centralDispenserInfo";
import { AnimatedDispenser } from "@/components/features/dispenser/animatedDispenser";

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
    position: "left", // Botón Añadir en la última posición periférica disponible
  },
];

export default function DispenserScreen() {
  // El dispensador principal es ahora el que está en "top"
  const [dispensers, setDispensers] = React.useState(DISPENSERS_DATA);
  const mainDispenser = dispensers.find((d) => d.position === "top");

  // Funciones de acción
  const handleEdit = () =>
    console.log(`Editar Dispensador ${mainDispenser?.id}`);
  const handleDelete = () =>
    console.log(`Eliminar Dispensador ${mainDispenser?.id}`);
  const handleView = () =>
    console.log(`Ver detalles de Dispensador ${mainDispenser?.id}`);
  const handleSound = () =>
    console.log(`Activar sonido en Dispensador ${mainDispenser?.id}`);

  // Acción de Añadir
  const handleAdd = () => {
    console.log(
      "Añadir nuevo dispensador (Activado desde la posición de Foco)"
    );
  };

  // --- LÓGICA DE ROTACIÓN CONDICIONAL (4 POSICIONES PERIFÉRICAS) ---

  // Las 4 posiciones son periféricas entre sí, pero una de ellas ('top') es el foco visual
  type PositionKey = DispenserPosition;

  // 🔥 Secuencia de Rotación Horaria (Clockwise)
  // left -> top -> right -> bottom -> left
  const CLOCKWISE_SEQUENCE: Record<PositionKey, PositionKey> = {
    top: "right",
    right: "bottom",
    bottom: "left",
    left: "top",
  };

  // 🔥 Secuencia de Rotación Antihoraria (Counter-Clockwise)
  // right -> top -> left -> bottom -> right
  const COUNTER_CLOCKWISE_SEQUENCE: Record<PositionKey, PositionKey> = {
    top: "left",
    left: "bottom",
    bottom: "right",
    right: "top",
  };

  /**
   * Determina la secuencia de rotación basándose en la posición del dispensador seleccionado.
   * @param selectedPosition Posición del elemento clickeado.
   * @returns La secuencia de rotación a aplicar.
   */
  const getRotationSequence = (selectedPosition: PositionKey) => {
    // REGLA: DISP DERECHO HORARIO, DISP IZQ ANTIHORARIO
    if (selectedPosition === "right" || selectedPosition === "bottom") {
      // Clic en RIGHT o BOTTOM rota en sentido HORARIO (los ítems se mueven Clockwise)
      return CLOCKWISE_SEQUENCE;
    }

    // Clic en LEFT rota en sentido ANTIHORARIO (los ítems se mueven Counter-Clockwise)
    return COUNTER_CLOCKWISE_SEQUENCE;
  };

  // LÓGICA DE ROTACIÓN CIRCULAR (TODO GIRA)
  const handleSelectDispenser = (selectedId: number) => {
    setDispensers((prevDispensers) => {
      // El foco es el que está en 'top'
      const currentFocus = prevDispensers.find((d) => d.position === "top");
      const selectedDispenser = prevDispensers.find((d) => d.id === selectedId);

      if (
        !currentFocus ||
        !selectedDispenser ||
        selectedId === currentFocus.id // Si ya está en el foco, no hacer nada
      ) {
        return prevDispensers;
      }

      // La posición del dispensador clicado (ej: "left", "right", "bottom")
      const positionSelected = selectedDispenser.position as PositionKey;

      // 1. EL INTERCAMBIO
      const updatedDispensers = prevDispensers.map((d) => {
        if (d.id === selectedId) {
          // El dispensador clicado se mueve al "top" (foco)
          return { ...d, position: "top" as PositionKey };
        } else if (d.id === currentFocus.id) {
          // El antiguo dispensador del "top" se mueve al slot que dejó el seleccionado
          return { ...d, position: positionSelected };
        }
        return d;
      });

      // 2. LA ROTACIÓN DE LOS OTROS 2 PERIFÉRICOS
      const nonRotatingPeripheralId = currentFocus.id; // El que acaba de salir del foco

      // Obtenemos la secuencia de rotación
      const sequence = getRotationSequence(positionSelected);

      return updatedDispensers.map((d) => {
        // Rotar solo si:
        // a) Es un dispensador periférico (no está en "top")
        // b) NO es el dispensador que acaba de moverse del foco a un slot periférico (currentFocus.id)
        if (
          d.position !== "top" &&
          d.id !== selectedId &&
          d.id !== nonRotatingPeripheralId
        ) {
          const oldPosition = d.position as PositionKey;
          const newPosition = sequence[oldPosition]; // Avanza un paso
          return { ...d, position: newPosition };
        }
        return d;
      });
    });
  };

  // Props del círculo central (fijo en la pantalla)
  const centralInfoProps = mainDispenser
    ? {
        name: mainDispenser.name,
        location: mainDispenser.location,
        status: mainDispenser.status,
        // Las acciones se pasan si NO es el botón Añadir
        onEdit: mainDispenser.id !== 99 ? handleEdit : undefined,
        onDelete: mainDispenser.id !== 99 ? handleDelete : undefined,
        onView: mainDispenser.id !== 99 ? handleView : undefined,
        onSound: mainDispenser.id !== 99 ? handleSound : undefined,
        // La acción de Añadir se pasa solo si ES el botón '+'
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
              dispenser={disp as any}
              onSelect={handleSelectDispenser}
            />
          ))}
        </View>

        {/* 3. Contenedor Circular Principal (Elementos Fijos) */}
        <View style={styles.circularContainer}>
          {/* CÍRCULO DE INFORMACIÓN CENTRAL */}
          {/* Muestra la información del dispensador que está en el slot 'top' */}
          {centralInfoProps && <CentralDispenserInfo {...centralInfoProps} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

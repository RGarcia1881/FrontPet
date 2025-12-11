// services/autoDispatchService.ts

import { handleFoodRoutine } from "@/handlers/esp32/esp32Handlers";

export const executeAutomaticFoodRoutine = async (): Promise<boolean> => {
  try {
    console.log("🤖 [AUTO-DISPATCH] Iniciando rutina automática de comida...");

    // Setters compatibles con React.Dispatch<SetStateAction<T>>
    const dummySetMessage: React.Dispatch<React.SetStateAction<string>> = (
      value
    ) => {
      if (typeof value === "function") {
        // Si es una función (como en setState(prev => prev + 'x'))
        const result = value(""); // Ejecutar la función con un estado inicial vacío
        console.log(`📢 [AUTO-DISPATCH] Función devuelve: ${result}`);
      } else {
        // Si es un valor directo
        console.log(`📢 [AUTO-DISPATCH]: ${value}`);
      }
    };

    const dummySetMessageType: React.Dispatch<
      React.SetStateAction<"success" | "error">
    > = (value) => {
      if (typeof value === "function") {
        const result = value("success"); // Ejecutar la función con un estado inicial 'success'
        console.log(`📊 [AUTO-DISPATCH] Tipo función devuelve: ${result}`);
      } else {
        console.log(`📊 [AUTO-DISPATCH] Tipo: ${value}`);
      }
    };

    const dummySetLoading: React.Dispatch<React.SetStateAction<boolean>> = (
      value
    ) => {
      if (typeof value === "function") {
        const result = value(false); // Ejecutar la función con un estado inicial false
        console.log(`🔄 [AUTO-DISPATCH] Loading función devuelve: ${result}`);
      } else {
        console.log(`🔄 [AUTO-DISPATCH] Loading: ${value}`);
      }
    };

    await handleFoodRoutine(
      dummySetMessage,
      dummySetMessageType,
      dummySetLoading
    );

    console.log("✅ [AUTO-DISPATCH] Rutina automática de comida completada");
    return true;
  } catch (error) {
    console.error(
      "❌ [AUTO-DISPATCH] Error en rutina automática de comida:",
      error
    );
    return false;
  }
};

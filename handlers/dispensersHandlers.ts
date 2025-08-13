// handlers/dispensersHandlers.ts

import { deleteDispenser, updateDispenser, Dispenser } from "@/api/dispensers";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";



// A single function to handle all the save logic and validation
export const handleSaveEditDispenser = async (
  id: number,
  ubication: string,
  status: string,
  timetable: string,
  foodContainer: string,
  waterContainer: string,
  foodPlate: string,
  waterPlate: string,
  userId: number | null,
  petId: number | null,
  dispensers: Dispenser[],
  setDispensers: (dispensers: Dispenser[]) => void,
  setFilteredDispensers: (dispensers: Dispenser[]) => void,
  setEditingDispenserId: (id: number | null) => void
) => {
  const newFC = Number(foodContainer);
  const newWC = Number(waterContainer);
  const newStatus = status.toLowerCase();
  const newFP = foodPlate.toLowerCase();
  const newWP = waterPlate.toLowerCase();

  if (!ubication.trim()) {
    Alert.alert("Error", "La ubicación es obligatoria.");
    return;
  }
  if (isNaN(newFC) || !Number.isInteger(newFC)) {
    Alert.alert("Error", "La capacidad de comida debe ser un número entero.");
    return;
  }
  if (isNaN(newWC) || !Number.isInteger(newWC)) {
    Alert.alert("Error", "La capacidad de agua debe ser un número entero.");
    return;
  }
  if (newStatus !== 'true' && newStatus !== 'false') {
    Alert.alert("Error", "El Estado debe ser 'true' o 'false'.");
    return;
  }
  if (newFP !== 'true' && newFP !== 'false') {
    Alert.alert("Error", "El Plato de Comida debe ser 'true' o 'false'.");
    return;
  }
  if (newWP !== 'true' && newWP !== 'false') {
    Alert.alert("Error", "El Plato de Agua debe ser 'true' o 'false'.");
    return;
  }
  if (userId === null) {
    Alert.alert("Error", "Debe seleccionar un usuario.");
    return;
  }
  if (petId === null) {
    Alert.alert("Error", "Debe seleccionar una mascota.");
    return;
  }

  try {
    const updatedData = {
      ubication: ubication.trim(),
      status: newStatus === 'true',
      timetable: timetable.trim(),
      FC: newFC,
      WC: newWC, // Using 'toilet' as per your type definition
      FP: newFP === 'true',
      WP: newWP === 'true',
      user: userId,
      pet: petId,
    };

    await updateDispenser(id, updatedData);

    const updatedDispensers = dispensers.map((dispenser) =>
      dispenser.id === id ? { ...dispenser, ...updatedData } : dispenser
    );

    setDispensers(updatedDispensers);
    setFilteredDispensers(updatedDispensers);
    setEditingDispenserId(null);

    Toast.show({
      type: "success",
      text1: "Dispensador actualizado",
      text2: "Los cambios se guardaron correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar el dispensador:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo actualizar el dispensador.",
    });
  }
};

export const handleDeleteDispenser = async (
  id: number,
  dispensers: Dispenser[],
  setDispensers: (dispensers: Dispenser[]) => void,
  setFilteredDispensers: (dispensers: Dispenser[]) => void
) => {
  try {
    await deleteDispenser(id);
    const updated = dispensers.filter((dispenser) => dispenser.id !== id);
    setDispensers(updated);
    setFilteredDispensers(updated);
    Toast.show({
      type: "success",
      text1: "Dispensador eliminado",
      text2: "El dispensador fue eliminado correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar el dispensador:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo eliminar el dispensador.",
    });
  }
};
import { Alert } from "react-native";
import { createDispenser, Dispenser } from "@/api/dispensers";

// Define a new type for the data sent during dispenser creation
type CreateDispenserData = Omit<Dispenser, 'id'>;

export const handleSubmit = async ({
  ubication, // Corrected to ubication
  status,
  timetable,
  FC,
  WC,
  FP,
  WP,
  userId,
  petId,
  setLoading,
  router,
}: {
  ubication: string; // Corrected to ubication
  status: string;
  timetable: string;
  FC: string;
  WC: string;
  FP: string;
  WP: string;
  userId: number | null;
  petId: number | null;
  setLoading: (loading: boolean) => void;
  router: any;
}) => {
  const newFC = Number(FC);
  const newWC = Number(WC);
  const newStatus = status.toLowerCase() === 'true';
  const newFP = FP.toLowerCase() === 'true';
  const newWP = WP.toLowerCase() === 'true';

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
  if (!timetable.trim()) {
    Alert.alert("Error", "El horario es obligatorio.");
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

  setLoading(true);

  try {
    const dispenserData: CreateDispenserData = {
      ubication: ubication.trim(), // Corrected to ubication
      status: newStatus,
      timetable: timetable.trim(),
      FC: newFC,
      WC: newWC, // Using WC
      FP: newFP,
      WP: newWP,
      user: userId,
      pet: petId,
    };

    console.log("Enviando:", dispenserData);

    await createDispenser(dispenserData);
    Alert.alert("Éxito", "Dispensador creado");
    router.push("/dispensers");
  } catch (error: any) {
    console.error("Error API:", error.response?.data ?? error.message);
    Alert.alert("Error", "No se pudo crear el dispensador");
  } finally {
    setLoading(false);
  }
};
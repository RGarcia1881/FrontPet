import { Alert } from "react-native";
import { createPet } from "@/api/pets";
import { Pet } from "@/types/pet"; // Import the Pet type

// Define a new type for the data sent during pet creation,
// as the 'id' is not yet assigned and 'image' is optional.
type CreatePetData = Omit<Pet, 'id'> & {
  image?: string;
};

export const handleSubmit = async ({
  name,
  weight,
  age,
  race,
  image,
  userId,
  setLoading,
  router,
}: {
  name: string;
  weight: string;
  age: string;
  race: string;
  image: string;
  userId: number | null;
  setLoading: (loading: boolean) => void;
  router: any;
}) => {
  if (!name.trim()) {
    Alert.alert("Error", "El nombre es obligatorio");
    return;
  }
  if (!weight || isNaN(Number(weight))) {
    Alert.alert("Error", "El peso debe ser un número");
    return;
  }
  if (!age || isNaN(Number(age))) {
    Alert.alert("Error", "La edad debe ser un número");
    return;
  }
  if (!race.trim()) {
    Alert.alert("Error", "La raza es obligatoria");
    return;
  }
  if (userId === null) {
    Alert.alert("Error", "Debe seleccionar un usuario");
    return;
  }

  setLoading(true);

  try {
    // Create the pet data object, using the 'CreatePetData' type
    const petData: CreatePetData = {
      name: name.trim(),
      weight: Number(weight),
      age: Number(age),
      race: race.trim(),
      user: userId,
    };
    if (image.trim()) {
      petData.image = image.trim();
    }

    console.log("Enviando:", petData);

    await createPet(petData);
    Alert.alert("Éxito", "Mascota creada");
    router.push("/pets");
  } catch (error: any) {
    console.error("Error API:", error.response?.data ?? error.message);
    Alert.alert("Error", "No se pudo crear la mascota");
  } finally {
    setLoading(false);
  }
};
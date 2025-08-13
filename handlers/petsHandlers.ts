import { deletePet, updatePet } from "@/api/pets";
import Toast from "react-native-toast-message";
import { Pet } from "@/types/pet";

export const handleDeletePet = async (
  id: number,
  pets: Pet[],
  setPets: (pets: Pet[]) => void,
  setFilteredPets: (pets: Pet[]) => void
) => {
  try {
    await deletePet(id);
    const updated = pets.filter((pet) => pet.id !== id);
    setPets(updated);
    setFilteredPets(updated);
    Toast.show({
      type: "success",
      text1: "Mascota eliminada",
      text2: "La mascota fue eliminada correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar la mascota:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo eliminar la mascota.",
    });
  }
};

export const handleSaveEditPet = async (
  id: number,
  editName: string,
  editWeight: string,
  editAge: string,
  editRace: string,
  pets: Pet[],
  setPets: (pets: Pet[]) => void,
  setFilteredPets: (pets: Pet[]) => void,
  setEditingPetId: (id: number | null) => void
) => {
  try {
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("weight", editWeight);
    formData.append("age", editAge);
    formData.append("race", editRace);
    formData.append("user", String(pets.find((p) => p.id === id)?.user ?? 0));

    await updatePet(id, formData);

    const updatedPets = pets.map((pet) =>
      pet.id === id
        ? {
            ...pet,
            name: editName,
            weight: Number(editWeight),
            age: Number(editAge),
            race: editRace,
          }
        : pet
    );

    setPets(updatedPets);
    setFilteredPets(updatedPets);
    setEditingPetId(null);

    Toast.show({
      type: "success",
      text1: "Mascota actualizada",
      text2: "Los cambios se guardaron correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar la mascota:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo actualizar la mascota.",
    });
  }
};

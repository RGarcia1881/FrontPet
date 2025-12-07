// context/petContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as petService from "@/api/pets";
import { Pet, PetCreatePayload, PetUpdatePayload } from "@/api/pets";
import { useAuth } from "@/context/authContext";

interface PetContextType {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  selectedPet: Pet | null;

  // Operaciones CRUD
  fetchPets: () => Promise<void>;
  getPet: (id: number) => Promise<Pet | null>;
  createPet: (petData: PetCreatePayload) => Promise<Pet>;
  updatePet: (id: number, petData: PetUpdatePayload) => Promise<Pet>;
  deletePet: (id: number) => Promise<void>;

  // Selección de mascota
  selectPet: (pet: Pet | null) => void;

  // Estado de formulario
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const usePets = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePets debe ser usado dentro de PetProvider");
  }
  return context;
};

interface PetProviderProps {
  children: ReactNode;
}

export const PetProvider: React.FC<PetProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Cargar mascotas cuando el usuario se autentica
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchPets();
    } else {
      setPets([]);
      setSelectedPet(null);
    }
  }, [isAuthenticated, user]);

  // Obtener todas las mascotas
  const fetchPets = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const data = await petService.getPets();
      setPets(data);
    } catch (err) {
      setError("Error al cargar las mascotas");
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener mascota específica
  const getPet = async (id: number): Promise<Pet | null> => {
    try {
      const pet = await petService.getPetById(id);
      return pet;
    } catch (err) {
      console.error("Error obteniendo mascota:", err);
      return null;
    }
  };

  // Crear nueva mascota
  const createPet = async (petData: PetCreatePayload): Promise<Pet> => {
    setLoading(true);
    setError(null);

    try {
      const newPet = await petService.createPet(petData);

      // Actualizar lista local
      setPets((prev) => [...prev, newPet]);

      return newPet;
    } catch (err) {
      const errorMsg = "Error al crear la mascota";
      setError(errorMsg);
      console.error("Error creating pet:", err);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar mascota
  const updatePet = async (
    id: number,
    petData: PetUpdatePayload
  ): Promise<Pet> => {
    setLoading(true);
    setError(null);

    try {
      const updatedPet = await petService.updatePet(id, petData);

      // Actualizar lista local
      setPets((prev) => prev.map((pet) => (pet.id === id ? updatedPet : pet)));

      // Actualizar mascota seleccionada si es la misma
      if (selectedPet?.id === id) {
        setSelectedPet(updatedPet);
      }

      return updatedPet;
    } catch (err) {
      const errorMsg = "Error al actualizar la mascota";
      setError(errorMsg);
      console.error("Error updating pet:", err);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar mascota
  const deletePet = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await petService.deletePet(id);

      // Actualizar lista local
      setPets((prev) => prev.filter((pet) => pet.id !== id));

      // Deseleccionar si es la mascota actual
      if (selectedPet?.id === id) {
        setSelectedPet(null);
      }
    } catch (err) {
      const errorMsg = "Error al eliminar la mascota";
      setError(errorMsg);
      console.error("Error deleting pet:", err);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Manejo del formulario
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedPet(null); // Resetear selección al cerrar
  };

  // Seleccionar mascota
  const selectPet = (pet: Pet | null) => {
    setSelectedPet(pet);
    if (pet) {
      setIsFormOpen(true); // Abrir formulario en modo edición
    }
  };

  const value = {
    pets,
    loading,
    error,
    selectedPet,
    fetchPets,
    getPet,
    createPet,
    updatePet,
    deletePet,
    selectPet,
    isFormOpen,
    openForm,
    closeForm,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

// api/pets.ts

import API from './api';

export type Pet = {
  id: number;
  name: string;
  weight: number;
  age: number;
  race: string;
  image: string; // URL de la imagen
  image_url?: string; // URL completa (opcional)
  user: number;
};

// 🔥 CAMBIO: Usar image_base64 en lugar de image
export type CreatePetData = {
  name: string;
  weight: number;
  age: number;
  race: string;
  image_base64?: string; // Base64 de la imagen
};

export type UpdatePetData = {
  name?: string;
  weight?: number;
  age?: number;
  race?: string;
  image_base64?: string; // Base64 de la imagen o string vacío para eliminar
};

// Obtener todas las mascotas del usuario
export const getPets = async (): Promise<Pet[]> => {
  const res = await API.get('/pets/');
  return res.data;
};

// Obtener mascota por ID
export const getPetById = async (id: number): Promise<Pet> => {
  const res = await API.get(`/pets/${id}/`);
  return res.data;
};

// Crear nueva mascota
export const createPet = async (petData: CreatePetData): Promise<Pet> => {
  console.log('📤 [PETS API] Creando mascota con datos:', {
    ...petData,
    image_base64: petData.image_base64 ? 
      `${petData.image_base64.substring(0, 30)}... [${petData.image_base64.length} chars]` : 
      'No hay imagen'
  });
  
  const res = await API.post('/pets/', petData);
  console.log('📥 [PETS API] Respuesta creación:', res.data);
  return res.data;
};

// Actualizar mascota
export const updatePet = async (id: number, petData: UpdatePetData): Promise<Pet> => {
  console.log('📤 [PETS API] Actualizando mascota ID:', id, 'con datos:', {
    ...petData,
    image_base64: petData.image_base64 ? 
      `${petData.image_base64.substring(0, 30)}... [${petData.image_base64.length} chars]` : 
      'No hay imagen'
  });
  
  const res = await API.patch(`/pets/${id}/`, petData);
  console.log('📥 [PETS API] Respuesta actualización:', res.data);
  return res.data;
};

// Eliminar mascota
export const deletePet = async (id: number): Promise<void> => {
  await API.delete(`/pets/${id}/`);
};

// 🔥 OPCIONAL: Función para convertir imagen a base64
export const convertImageToBase64 = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error convirtiendo imagen a base64:', error);
    throw error;
  }
};
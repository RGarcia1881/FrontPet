// api/pets.ts

import API from "./api";

export type Pet = {
  id: number;
  name: string;
  weight: number;
  age: number;
  race: string;
  image: string; // URL relativa o nombre de archivo (de Django)
  image_url?: string; // URL completa construida
  user: number;
};

const getBackendBaseUrl = (): string => {
  const baseURL = API.defaults.baseURL || "http://localhost:8000/api";

  // Remover /api del final si existe
  if (baseURL.endsWith("/api")) {
    return baseURL.slice(0, -4); // Remueve "/api"
  }

  // Si es localhost con puerto pero sin /api
  if (baseURL.includes("localhost") || baseURL.includes("192.168")) {
    // Ya debería ser la URL base correcta
    return baseURL.replace("/api", "");
  }

  return baseURL;
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
  try {
    console.log("🐕 [API] Obteniendo mascotas...");
    const res = await API.get("/pets/");
    const backendUrl = getBackendBaseUrl();

    console.log("🐕 [API] Respuesta cruda del backend:", res.data);

    // Procesar cada mascota
    const processedPets = res.data.map((pet: any) => {
      console.log(`🐕 Procesando ${pet.name}:`);
      console.log("   - image field:", pet.image);
      console.log("   - Tipo de image:", typeof pet.image);

      let imageUrl = null;

      // CASO 1: Si image es un string base64 (data:image/...;base64,...)
      if (typeof pet.image === "string" && pet.image.startsWith("data:image")) {
        console.log("   📸 Es base64, usando directamente");
        // Para React Native, base64 puede ser usado directamente
        return { ...pet, image: pet.image };
      }

      // CASO 2: Si image es una URL completa
      if (typeof pet.image === "string" && pet.image.startsWith("http")) {
        console.log("   🌐 Es URL completa:", pet.image);
        return { ...pet, image: pet.image };
      }

      // CASO 3: Si image es una ruta relativa (empieza con /)
      if (typeof pet.image === "string" && pet.image.startsWith("/")) {
        imageUrl = `${backendUrl}${pet.image}`;
        console.log("   🔗 Construyendo URL completa:", imageUrl);
        return { ...pet, image: imageUrl };
      }

      // CASO 4: Si image es solo un nombre de archivo
      if (typeof pet.image === "string" && pet.image.length > 0) {
        imageUrl = `${backendUrl}/media/${pet.image}`;
        console.log("   📁 Asumiendo está en /media/:", imageUrl);
        return { ...pet, image: imageUrl };
      }

      // CASO 5: Si no hay imagen
      console.log("   ❌ No hay imagen válida, usando placeholder");
      return {
        ...pet,
        image: null, // Marcamos como null para usar placeholder
      };
    });

    console.log("🐕 [API] Mascotas procesadas:", processedPets);
    return processedPets;
  } catch (error) {
    console.error("❌ [API] Error en getPets:", error);
    throw error;
  }
};

// Obtener mascota por ID
export const getPetById = async (id: number): Promise<Pet> => {
  const res = await API.get(`/pets/${id}/`);
  return res.data;
};

// Crear nueva mascota
export const createPet = async (petData: CreatePetData): Promise<Pet> => {
  console.log("📤 [PETS API] Creando mascota con datos:", {
    ...petData,
    image_base64: petData.image_base64
      ? `${petData.image_base64.substring(0, 30)}... [${
          petData.image_base64.length
        } chars]`
      : "No hay imagen",
  });

  const res = await API.post("/pets/", petData);
  console.log("📥 [PETS API] Respuesta creación:", res.data);
  return res.data;
};

// Actualizar mascota
export const updatePet = async (
  id: number,
  petData: UpdatePetData
): Promise<Pet> => {
  console.log("📤 [PETS API] Actualizando mascota ID:", id, "con datos:", {
    ...petData,
    image_base64: petData.image_base64
      ? `${petData.image_base64.substring(0, 30)}... [${
          petData.image_base64.length
        } chars]`
      : "No hay imagen",
  });

  const res = await API.patch(`/pets/${id}/`, petData);
  console.log("📥 [PETS API] Respuesta actualización:", res.data);
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
    console.error("Error convirtiendo imagen a base64:", error);
    throw error;
  }
};

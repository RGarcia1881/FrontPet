import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
// Importamos la función getPets y el tipo PetData
import { getPets, PetData } from "@/api/pets";
// Importamos PetScene para renderizar la lista
import { PetScene } from "./petScene";

// -- Interfaces --

// PetSceneItem es el tipo de datos que maneja la vista
export type PetSceneItem = PetData;

/**
 * Componente contenedor que gestiona la carga de datos desde la API de Django usando getPets().
 * Aplica el filtro de usuario localmente.
 */
export const PetListLoader: React.FC = () => {
  const [pets, setPets] = useState<PetSceneItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- SIMULACIÓN DE ID DE USUARIO ---
  // En un entorno real, este ID vendría del contexto de autenticación (e.g., JWT).
  // Lo fijamos a '1' para que coincida con los datos de prueba en api.ts.
  const CURRENT_USER_ID = 1;

  // Función para obtener los datos de la API
  const fetchPets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log(
      `🔎 Intentando cargar mascotas. ID de usuario actual: ${CURRENT_USER_ID}`
    );

    try {
      // 1. Obtener TODAS las mascotas (como lo hace getPets en api.ts al llamar a /pets/)
      const allPets = await getPets();

      console.log(`✅ Total de mascotas recibidas: ${allPets.length}`);

      // 2. Filtrar localmente para solo mostrar las del usuario actual
      // En un sistema real, el backend debería filtrar esto.
      const userPets = allPets.filter((pet) => pet.user === CURRENT_USER_ID);

      // 3. Ordenar las mascotas por el 'id' (o el campo 'order' si existiera)
      const sortedPets = userPets.sort((a, b) => a.id - b.id);

      setPets(sortedPets as PetSceneItem[]);

      // MÁS DEPURACIÓN: Imprimimos las mascotas encontradas
      console.log(
        `✅ Mascotas filtradas para el Usuario ${CURRENT_USER_ID}: ${sortedPets.length}`
      );
      if (sortedPets.length > 0) {
        console.log(
          "🐾 Lista de Mascotas del Usuario:",
          sortedPets.map((p) => ({ id: p.id, name: p.name, ownerId: p.user }))
        );
      } else {
        console.log("⚠️ No se encontraron mascotas para este usuario.");
      }
    } catch (e: any) {
      console.error(
        "❌ Error al obtener datos de la API de Django:",
        e.message
      );
      setError(
        `Fallo al cargar datos: ${e.message}. Revisa la consola para más detalles.`
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Ejecuta la carga al montar el componente
  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // Función de ejemplo para añadir miembro
  const handleAddMember = useCallback(() => {
    console.log("Navegar a la pantalla de añadir mascota...");
  }, []);

  // Estilos internos
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#F5F5F5",
    },
    loadingText: {
      marginTop: 10,
      color: "#FF6347",
      fontWeight: "600",
    },
    errorText: {
      marginTop: 20,
      color: "red",
      textAlign: "center",
      paddingHorizontal: 15,
    },
    retryButton: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#FF6347",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    retryButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });

  if (isLoading && pets.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={styles.loadingText}>
          Cargando tripulación (vía API Django)...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {error}
          {"\n\n"}
          Asegúrate que tu API de Django esté corriendo y respondiendo en el
          endpoint correcto.
        </Text>
        <TouchableOpacity onPress={fetchPets} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Reintentar Carga</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <PetScene onAddMember={handleAddMember} pets={pets} />;
};

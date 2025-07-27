import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { getPets, deletePet } from "@/api/pets";
import Toast from "react-native-toast-message";

type Pet = {
  id: number;
  name: string;
  weight: number;
  age: number;
  race: string;
  image: string;
  user: number;
};

export default function PetsScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
        setFilteredPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const searchPets = () => {
    if (!searchName.trim()) {
      setFilteredPets(pets);
      return;
    }

    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchName.trim().toLowerCase())
    );
    setFilteredPets(filtered);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePet(id);
      const updated = pets.filter((pet) => pet.id !== id);
      setPets(updated);
      setFilteredPets(updated);
      Toast.show({
        type: "success",
        text1: "Mascota eliminada",
        text2: `La mascota fue eliminada correctamente.`,
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando mascotas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mascotas</Text>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre"
          value={searchName}
          onChangeText={setSearchName}
          onSubmitEditing={searchPets}
          returnKeyType="search"
        />
        <Button title="Buscar" onPress={searchPets} />
      </View>

      {filteredPets.length === 0 ? (
        <Text>No se encontraron mascotas con ese nombre.</Text>
      ) : (
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Raza: {item.race}</Text>
              <Text>Peso: {item.weight} kg</Text>
              <Text>Edad: {item.age} años</Text>
              <Button
                title="Eliminar"
                onPress={() => handleDelete(item.id)}
                color="red"
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "600" },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
});

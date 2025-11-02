import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import { getPets } from "@/api/pets";
import { Pet } from "@/types/pet";
import { petsStyles as styles } from "@/styles/_test/petsStyles";
import { handleDeletePet, handleSaveEditPet } from "@/handlers/petsHandlers";

export default function PetsScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  const [editingPetId, setEditingPetId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editRace, setEditRace] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
        setFilteredPets(data);
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre"
          value={searchName}
          onChangeText={setSearchName}
          onSubmitEditing={searchPets}
        />
        <Button title="Buscar" onPress={searchPets} />
      </View>

      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editingPetId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Nombre"
                />
                <TextInput
                  style={styles.input}
                  value={editWeight}
                  onChangeText={setEditWeight}
                  placeholder="Peso"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={editAge}
                  onChangeText={setEditAge}
                  placeholder="Edad"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={editRace}
                  onChangeText={setEditRace}
                  placeholder="Raza"
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    title="Guardar"
                    onPress={() =>
                      handleSaveEditPet(
                        item.id,
                        editName,
                        editWeight,
                        editAge,
                        editRace,
                        pets,
                        setPets,
                        setFilteredPets,
                        setEditingPetId
                      )
                    }
                  />
                  <Button
                    title="Cancelar"
                    onPress={() => setEditingPetId(null)}
                    color="gray"
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Raza: {item.race}</Text>
                <Text>Peso: {item.weight} kg</Text>
                <Text>Edad: {item.age} años</Text>
                <View style={{ flexDirection: "row", gap: 8, marginTop: 5 }}>
                  <Button
                    title="Editar"
                    onPress={() => {
                      setEditingPetId(item.id);
                      setEditName(item.name);
                      setEditWeight(String(item.weight));
                      setEditAge(String(item.age));
                      setEditRace(item.race);
                    }}
                  />
                  <Button
                    title="Eliminar"
                    onPress={() =>
                      handleDeletePet(item.id, pets, setPets, setFilteredPets)
                    }
                    color="red"
                  />
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

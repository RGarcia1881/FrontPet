import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { createPet } from "@/api/pets";
import { getUsers, User } from "@/api/users";

export default function CreatePet() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [race, setRace] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        if (usersData.length > 0) {
          setUserId(usersData[0].id);
        }
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los usuarios");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
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
      // Crear objeto sin campo image si está vacío
      const petData: any = {
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

  if (loadingUsers) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Mascota</Text>

      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
      />

      <Text>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Peso"
        keyboardType="numeric"
      />

      <Text>Edad (años):</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Edad"
        keyboardType="numeric"
      />

      <Text>Raza:</Text>
      <TextInput
        style={styles.input}
        value={race}
        onChangeText={setRace}
        placeholder="Raza"
      />

      <Text>Imagen (URL):</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="URL de imagen"
      />

      <Text>Usuario:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userId}
          onValueChange={(itemValue) => setUserId(itemValue)}
        >
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.name} value={user.id} />
          ))}
        </Picker>
      </View>

      <Button
        title={loading ? "Creando..." : "Crear"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
  },
});

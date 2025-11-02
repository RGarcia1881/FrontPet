import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { getUsers, User } from "@/api/users";
import { createPetStyles as styles } from "@/styles/_test/createPetsStyles"; // Note: You'll need to update the path
import { handleSubmit } from "@/handlers/createPetHandlers"; // Note: You'll need to update the path

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
        onPress={() =>
          handleSubmit({
            name,
            weight,
            age,
            race,
            image,
            userId,
            setLoading,
            router,
          })
        }
        disabled={loading}
      />
    </ScrollView>
  );
}

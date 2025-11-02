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
import { getPets, Pet } from "@/api/pets";
import { createDispenserStyles as styles } from "@/styles/_test/createDispenserStyles";
import { handleSubmit } from "@/handlers/createDispenserHandlers";

export default function CreateDispenser() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);

  const [ubication, setUbication] = useState(""); // Corrected to ubication
  const [status, setStatus] = useState("true"); // Default to 'true'
  const [timetable, setTimetable] = useState("");
  const [FC, setFC] = useState("");
  const [WC, setWC] = useState("");
  const [FP, setFP] = useState("true"); // Default to 'true'
  const [WP, setWP] = useState("true"); // Default to 'true'
  const [userId, setUserId] = useState<number | null>(null);
  const [petId, setPetId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const usersData = await getUsers();
        const petsData = await getPets();
        setUsers(usersData);
        setPets(petsData);
        if (usersData.length > 0) {
          setUserId(usersData[0].id);
        }
        if (petsData.length > 0) {
          setPetId(petsData[0].id);
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "No se pudieron cargar los datos de usuarios y mascotas"
        );
      } finally {
        setLoadingDropdowns(false);
      }
    };
    fetchDropdowns();
  }, []);

  if (loadingDropdowns) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Dispensador</Text>

      <Text>Ubicación:</Text>
      <TextInput
        style={styles.input}
        value={ubication}
        onChangeText={setUbication}
        placeholder="Ubicación"
      />

      <Text>Estado:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Activo" value="true" />
          <Picker.Item label="Inactivo" value="false" />
        </Picker>
      </View>

      <Text>Horario:</Text>
      <TextInput
        style={styles.input}
        value={timetable}
        onChangeText={setTimetable}
        placeholder="Horario (Ej. L-V 08:00-18:00)"
      />

      <Text>Capacidad Comida:</Text>
      <TextInput
        style={styles.input}
        value={FC}
        onChangeText={setFC}
        placeholder="Capacidad de Comida (ej. 100)"
        keyboardType="numeric"
      />

      <Text>Capacidad Agua:</Text>
      <TextInput
        style={styles.input}
        value={WC}
        onChangeText={setWC}
        placeholder="Capacidad de Agua (ej. 50)"
        keyboardType="numeric"
      />

      <Text>Plato de Comida:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={FP}
          onValueChange={(itemValue) => setFP(itemValue)}
        >
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>

      <Text>Plato de Agua:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={WP}
          onValueChange={(itemValue) => setWP(itemValue)}
        >
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>

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

      <Text>Mascota:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={petId}
          onValueChange={(itemValue) => setPetId(itemValue)}
        >
          {pets.map((pet) => (
            <Picker.Item key={pet.id} label={pet.name} value={pet.id} />
          ))}
        </Picker>
      </View>

      <Button
        title={loading ? "Creando..." : "Crear"}
        onPress={() =>
          handleSubmit({
            ubication,
            status,
            timetable,
            FC,
            WC,
            FP,
            WP,
            userId,
            petId,
            setLoading,
            router,
          })
        }
        disabled={loading}
      />
    </ScrollView>
  );
}

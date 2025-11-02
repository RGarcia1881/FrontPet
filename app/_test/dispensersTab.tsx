// components/DispensersScreen.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getDispensers, Dispenser } from "@/api/dispensers";
import { getUsers, User } from "@/api/users";
import { getPets, Pet } from "@/api/pets";
import { dispenserStyles as styles } from "@/styles/_test/dispenserStyles";
import {
  handleDeleteDispenser,
  handleSaveEditDispenser,
} from "@/handlers/dispensersHandlers";

export default function DispensersScreen() {
  const [dispensers, setDispensers] = useState<Dispenser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredDispensers, setFilteredDispensers] = useState<Dispenser[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);

  const [editingDispenserId, setEditingDispenserId] = useState<number | null>(
    null
  );
  const [editUbication, setEditUbication] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editTimetable, setEditTimetable] = useState("");
  const [editFC, setEditFC] = useState("");
  const [editWC, setEditWC] = useState("");
  const [editFP, setEditFP] = useState("");
  const [editWP, setEditWP] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editPetId, setEditPetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDispensers = async () => {
      try {
        const data = await getDispensers();
        setDispensers(data);
        setFilteredDispensers(data);
      } finally {
        setLoading(false);
      }
    };
    fetchDispensers();
  }, []);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const usersData = await getUsers();
        const petsData = await getPets();
        setUsers(usersData);
        setPets(petsData);
      } catch (error) {
        Alert.alert(
          "Error",
          "No se pudieron cargar los datos de usuarios y mascotas."
        );
      } finally {
        setLoadingDropdowns(false);
      }
    };
    fetchDropdownData();
  }, []);

  const searchDispensers = () => {
    if (!searchLocation.trim()) {
      setFilteredDispensers(dispensers);
      return;
    }
    const filtered = dispensers.filter((dispenser) =>
      dispenser.ubication
        .toLowerCase()
        .includes(searchLocation.trim().toLowerCase())
    );
    setFilteredDispensers(filtered);
  };

  if (loading || loadingDropdowns) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispensadores</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por ubicación"
          value={searchLocation}
          onChangeText={setSearchLocation}
          onSubmitEditing={searchDispensers}
        />
        <Button title="Buscar" onPress={searchDispensers} />
      </View>

      <FlatList
        data={filteredDispensers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editingDispenserId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editUbication}
                  onChangeText={setEditUbication}
                  placeholder="Ubicación"
                />
                <TextInput
                  style={styles.input}
                  value={editStatus}
                  onChangeText={setEditStatus}
                  placeholder="Estado (true/false)"
                />
                <TextInput
                  style={styles.input}
                  value={editTimetable}
                  onChangeText={setEditTimetable}
                  placeholder="Horario"
                />
                <TextInput
                  style={styles.input}
                  value={editFC}
                  onChangeText={setEditFC}
                  placeholder="Capacidad de Comida"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={editWC}
                  onChangeText={setEditWC}
                  placeholder="Capacidad de Agua"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={editFP}
                  onChangeText={setEditFP}
                  placeholder="Plato de Comida (true/false)"
                />
                <TextInput
                  style={styles.input}
                  value={editWP}
                  onChangeText={setEditWP}
                  placeholder="Plato de Agua (true/false)"
                />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={editUserId}
                    onValueChange={(itemValue) => setEditUserId(itemValue)}
                  >
                    {users.map((user) => (
                      <Picker.Item
                        key={user.id}
                        label={user.name}
                        value={user.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={editPetId}
                    onValueChange={(itemValue) => setEditPetId(itemValue)}
                  >
                    {pets.map((pet) => (
                      <Picker.Item
                        key={pet.id}
                        label={pet.name}
                        value={pet.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.buttonGroup}>
                  <Button
                    title="Guardar"
                    onPress={() =>
                      handleSaveEditDispenser(
                        item.id,
                        editUbication,
                        editStatus,
                        editTimetable,
                        editFC,
                        editWC,
                        editFP,
                        editWP,
                        editUserId,
                        editPetId,
                        dispensers,
                        setDispensers,
                        setFilteredDispensers,
                        setEditingDispenserId
                      )
                    }
                  />
                  <Button
                    title="Cancelar"
                    onPress={() => setEditingDispenserId(null)}
                    color="gray"
                  />
                </View>
              </>
            ) : (
              <>
                <Text>Ubicación: {item.ubication}</Text>
                <Text>Estado: {item.status ? "Activo" : "Inactivo"}</Text>
                <Text>Horario: {item.timetable}</Text>
                <Text>Capacidad Comida: {item.FC}</Text>
                <Text>Capacidad Agua: {item.WC}</Text>
                <Text>Plato Comida: {item.FP ? "Sí" : "No"}</Text>
                <Text>Plato Agua: {item.WP ? "Sí" : "No"}</Text>
                <Text>
                  Usuario:{" "}
                  {users.find((u) => u.id === item.user)?.name || "N/A"}
                </Text>
                <Text>
                  Mascota: {pets.find((p) => p.id === item.pet)?.name || "N/A"}
                </Text>
                <View style={styles.buttonGroup}>
                  <Button
                    title="Editar"
                    onPress={() => {
                      setEditingDispenserId(item.id);
                      setEditUbication(item.ubication);
                      setEditStatus(item.status ? "true" : "false");
                      setEditTimetable(item.timetable);
                      setEditFC(String(item.FC));
                      setEditWC(String(item.WC));
                      setEditFP(item.FP ? "true" : "false");
                      setEditWP(item.WP ? "true" : "false");
                      setEditUserId(item.user);
                      setEditPetId(item.pet);
                    }}
                  />
                  <Button
                    title="Eliminar"
                    onPress={() =>
                      handleDeleteDispenser(
                        item.id,
                        dispensers,
                        setDispensers,
                        setFilteredDispensers
                      )
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

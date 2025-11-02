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
import { getUsers, User } from "@/api/users";
import { userScreenStyles as styles } from "@/styles/_test/userScreenStyles";
import {
  handleDeleteUser,
  handleSaveEditUser,
} from "@/handlers/userScreenHandlers";

export default function UserScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchUsers = () => {
    if (!searchName.trim()) {
      setFilteredUsers(users);
      return;
    }
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchName.trim().toLowerCase()) ||
        user.email.toLowerCase().includes(searchName.trim().toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o email"
          value={searchName}
          onChangeText={setSearchName}
          onSubmitEditing={searchUsers}
        />
        <Button title="Buscar" onPress={searchUsers} />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editingUserId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Nombre"
                />
                <TextInput
                  style={styles.input}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  value={editPassword}
                  onChangeText={setEditPassword}
                  placeholder="Nueva Contraseña (opcional)"
                  secureTextEntry
                />
                <View style={styles.buttonGroup}>
                  <Button
                    title="Guardar"
                    onPress={() =>
                      handleSaveEditUser(
                        item.id,
                        editName,
                        editEmail,
                        editPassword,
                        users,
                        setUsers,
                        setFilteredUsers,
                        setEditingUserId
                      )
                    }
                  />
                  <Button
                    title="Cancelar"
                    onPress={() => setEditingUserId(null)}
                    color="gray"
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Email: {item.email}</Text>
                <View style={styles.buttonGroup}>
                  <Button
                    title="Editar"
                    onPress={() => {
                      setEditingUserId(item.id);
                      setEditName(item.name);
                      setEditEmail(item.email);
                      setEditPassword(""); // Clear password field on edit
                    }}
                  />
                  <Button
                    title="Eliminar"
                    onPress={() =>
                      Alert.alert(
                        "Confirmar eliminación",
                        `¿Estás seguro de que quieres eliminar a ${item.name}?`,
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Eliminar",
                            style: "destructive",
                            onPress: () =>
                              handleDeleteUser(
                                item.id,
                                users,
                                setUsers,
                                setFilteredUsers
                              ),
                          },
                        ]
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

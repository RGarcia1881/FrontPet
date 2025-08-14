import { deleteUser, updateUser } from "@/api/users";
import { User } from "@/api/users";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export const handleSaveEditUser = async (
  id: number,
  name: string,
  email: string,
  password: string,
  users: User[],
  setUsers: (users: User[]) => void,
  setFilteredUsers: (users: User[]) => void,
  setEditingUserId: (id: number | null) => void
) => {
  if (!name.trim()) {
    Alert.alert("Error", "El nombre es obligatorio.");
    return;
  }
  if (!email.trim()) {
    Alert.alert("Error", "El email es obligatorio.");
    return;
  }

  const updatedData: { name: string; email: string; password?: string } = {
    name: name.trim(),
    email: email.trim(),
  };

  if (password.trim()) {
    updatedData.password = password.trim();
  }

  try {
    await updateUser(id, updatedData);

    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...updatedData } : user
    );

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditingUserId(null);

    Toast.show({
      type: "success",
      text1: "Usuario actualizado",
      text2: "Los cambios se guardaron correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    Alert.alert("Error", "No se pudo actualizar el usuario.");
  }
};

export const handleDeleteUser = async (
  id: number,
  users: User[],
  setUsers: (users: User[]) => void,
  setFilteredUsers: (users: User[]) => void
) => {
  try {
    await deleteUser(id);
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    setFilteredUsers(updated);
    Toast.show({
      type: "success",
      text1: "Usuario eliminado",
      text2: "El usuario fue eliminado correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    Alert.alert("Error", "No se pudo eliminar el usuario.");
  }
};
import { deleteUser, updateUser, RetrievedUser, UserUpdatePayload } from "@/api/users";
import Toast from "react-native-toast-message";

// Nota: Hemos eliminado Alert de react-native. En el ambiente web se prefiere Toast o modales.

/**
 * Maneja la lógica para guardar la edición de un usuario.
 * @param id El ID del usuario a actualizar.
 * @param name El nuevo nombre.
 * @param email El nuevo email.
 * @param password El nuevo password (opcional).
 * @param users Lista actual de usuarios en el estado.
 * @param setUsers Función para actualizar la lista de usuarios.
 * @param setFilteredUsers Función para actualizar la lista filtrada.
 * @param setEditingUserId Función para cerrar el modo edición.
 */
export const handleSaveEditUser = async (
  id: number,
  name: string,
  email: string,
  password: string,
  users: RetrievedUser[], // Usamos el tipo correcto sin password
  setUsers: (users: RetrievedUser[]) => void,
  setFilteredUsers: (users: RetrievedUser[]) => void,
  setEditingUserId: (id: number | null) => void
) => {
  if (!name.trim() || !email.trim()) {
    Toast.show({
      type: "error",
      text1: "Error de Validación",
      text2: "El nombre y el email son obligatorios.",
    });
    return;
  }

  // Se construye el payload con el tipo UserUpdatePayload
  const updatedData: UserUpdatePayload = {
    name: name.trim(),
    email: email.trim(),
  };

  if (password.trim()) {
    updatedData.password = password.trim();
  }

  try {
    // 1. Llamada a la API (usa PATCH para enviar solo los campos necesarios)
    await updateUser(id, updatedData);

    // 2. Actualizar el estado local (optimista)
    // Solo actualizamos name y email, ya que el password no se guarda en el estado local (RetrievedUser)
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name: updatedData.name!, email: updatedData.email! } : user
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
    Toast.show({
      type: "error",
      text1: "Error de API",
      text2: "No se pudo actualizar el usuario. Revisa la consola para más detalles.",
    });
  }
};

/**
 * Maneja la lógica para eliminar un usuario.
 * @param id El ID del usuario a eliminar.
 * @param users Lista actual de usuarios en el estado.
 * @param setUsers Función para actualizar la lista de usuarios.
 * @param setFilteredUsers Función para actualizar la lista filtrada.
 */
export const handleDeleteUser = async (
  id: number,
  users: RetrievedUser[], // Usamos el tipo correcto
  setUsers: (users: RetrievedUser[]) => void,
  setFilteredUsers: (users: RetrievedUser[]) => void
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
    Toast.show({
      type: "error",
      text1: "Error de API",
      text2: "No se pudo eliminar el usuario. Intenta de nuevo.",
    });
  }
};

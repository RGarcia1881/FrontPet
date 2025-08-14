import { Alert } from "react-native";
import { createUser, User } from "@/api/users";

// Define a new type for the data sent during user creation
type CreateUserData = Omit<User, 'id'>;

export const handleSubmit = async ({
  name,
  email,
  password,
  setLoading,
  router,
}: {
  name: string;
  email: string;
  password: string;
  setLoading: (loading: boolean) => void;
  router: any;
}) => {
  if (!name.trim()) {
    Alert.alert("Error", "El nombre es obligatorio.");
    return;
  }
  if (!email.trim()) {
    Alert.alert("Error", "El email es obligatorio.");
    return;
  }
  if (!password.trim()) {
    Alert.alert("Error", "La contraseña es obligatoria.");
    return;
  }

  setLoading(true);

  try {
    const userData: CreateUserData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    console.log("Enviando:", userData);

    await createUser(userData);
    Alert.alert("Éxito", "Usuario creado");
    router.push("/users");
  } catch (error: any) {
    console.error("Error API:", error.response?.data ?? error.message);
    Alert.alert("Error", "No se pudo crear el usuario.");
  } finally {
    setLoading(false);
  }
};
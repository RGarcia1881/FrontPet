import API from "@/api/api";
import Toast from "react-native-toast-message";

export const fetchDispensers = async (setData: (data: any) => void) => {
  try {
    const response = await API.get("dispensers/");
    setData(response.data);
    Toast.show({
      type: "success",
      text1: "Dispensadores cargadas",
      text2: `Se encontraron ${response.data.length} dispensadores 🐾`,
    });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error de conexión",
      text2: "No se pudo conectar al backend 💥",
    });
    console.error("Error al cargar dispensadores:", error);
  }
};
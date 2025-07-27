import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import API from "../../api/api"; // Ajusta el path según dónde lo pongas
import Toast from "react-native-toast-message";

export default function TestScreen() {
  const [data, setData] = useState(null);

  const fetchMascotas = async () => {
    try {
      const response = await API.get("pets/");
      setData(response.data);
      Toast.show({
        type: "success",
        text1: "Mascotas cargadas",
        text2: `Se encontraron ${response.data.length} mascotas 🐾`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error de conexión",
        text2: "No se pudo conectar al backend 💥",
      });
      console.error("Error al cargar mascotas:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Cargar mascotas" onPress={fetchMascotas} />
      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
    </View>
  );
}

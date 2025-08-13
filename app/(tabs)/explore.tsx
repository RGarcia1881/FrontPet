import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { testScreenStyles as styles } from "@/styles/testScreenStyles";
import { fetchMascotas } from "@/handlers/testScreenHandlers";

export default function TestScreen() {
  const [data, setData] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Cargar mascotas"
          onPress={() => fetchMascotas(setData)}
        />
      </View>
      {data && (
        <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
      )}
    </View>
  );
}

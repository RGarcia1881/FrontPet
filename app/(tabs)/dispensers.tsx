import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { dispenserScreenStyles as styles } from "@/styles/dispenserScreenStyles";
import { fetchDispensers } from "@/handlers/dispenserScreenHandlers";

export default function DispensersScreen() {
  const [data, setData] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Cargar dispensadores"
          onPress={() => fetchDispensers(setData)}
        />
      </View>
      {data && (
        <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
      )}
    </View>
  );
}

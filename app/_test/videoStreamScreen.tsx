import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import WebView from "react-native-webview";
import { videoStreamStyles as styles } from "@/styles/videoStreamStyles";
import { VIDEO_STREAM_URL } from "@/api/raspi";

export default function VideoStreamScreen() {
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  const { width } = Dimensions.get("window");
  const videoSize = width * 0.8; // 80% del ancho de la pantalla

  const toggleVideo = () => {
    setIsCameraVisible(!isCameraVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cámara del Dispensador</Text>

      <View style={styles.videoContainerWrapper}>
        <View
          style={[
            styles.videoContainer,
            {
              width: videoSize,
              height: videoSize,
              borderRadius: videoSize / 2,
            },
          ]}
        >
          {isCameraVisible ? (
            <WebView
              source={{ uri: VIDEO_STREAM_URL }}
              style={styles.scaledWebView}
            />
          ) : (
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>Video oculto.</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Button
          title={isCameraVisible ? "Ocultar video" : "Mostrar video"}
          onPress={toggleVideo}
        />
      </View>
    </View>
  );
}

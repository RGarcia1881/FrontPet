// app/(legal)/termsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  Modal,
  Linking,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TermsScreen() {
  const router = useRouter();
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleAccept = () => {
    setShowAcceptModal(true);
  };

  const handleCloseModal = () => {
    setShowAcceptModal(false);
    router.back();
  };

  const handleOpenPrivacyPolicy = () => {
    // Aquí puedes agregar un enlace a tu política de privacidad
    // O la ruta donde tengas la política
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerTitle: "Términos y Condiciones",
          headerLeft: () => (
            <Pressable onPress={handleGoBack} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </Pressable>
          ),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Términos y Condiciones de Servicio
        </Text>

        <Text style={{ fontSize: 16, color: "#666", marginBottom: 30 }}>
          Bienvenido(a) a la aplicación del Dispensador Inteligente para
          Mascotas ("PawMatic"). El acceso y uso de esta plataforma implica la
          aceptación plena de los presentes Términos y Condiciones, elaborados
          conforme a la legislación aplicable en los Estados Unidos Mexicanos.
        </Text>

        {/* 1. Aceptación de los términos */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            1. Aceptación de los términos
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            Al registrarte y utilizar la Aplicación, declaras que has leído y
            aceptado estos Términos y Condiciones. En caso de no estar de
            acuerdo, deberás abstenerte de usar la plataforma.
          </Text>
        </View>

        {/* 2. Descripción del servicio */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            2. Descripción del servicio
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            La Aplicación permite al usuario:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Operar y gestionar un dispensador inteligente para mascotas.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Supervisar funciones como cámara, historial de alimentación y
              notificaciones.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Configurar horarios, porciones y acciones remotas.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Visualizar estadísticas generadas por el dispositivo.
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
            La prestación del servicio está sujeta a disponibilidad tecnológica
            y de red.
          </Text>
        </View>

        {/* 3. Registro y responsabilidad del usuario */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            3. Registro y responsabilidad del usuario
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            Al registrarte, aceptas:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Proporcionar datos reales, exactos y actualizados.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Proteger la confidencialidad de tu contraseña.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Notificar cualquier uso no autorizado de tu cuenta.
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
            El usuario será responsable de las acciones realizadas dentro de su
            cuenta, conforme al artículo 16 de la Ley Federal de Protección al
            Consumidor.
          </Text>
        </View>

        {/* 4. Uso permitido */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            4. Uso permitido
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            El usuario se compromete a:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Hacer uso personal y no comercial de la Aplicación.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • No realizar ingeniería inversa, manipulación del software,
              ataques, o accesos no autorizados.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • No emplear el servicio para actividades ilícitas conforme al
              marco legal mexicano.
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
            Cualquier incumplimiento podrá derivar en suspensión o cancelación
            inmediata de la cuenta.
          </Text>
        </View>

        {/* 5. Protección de datos personales */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            5. Protección de datos personales
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            El tratamiento de datos personales se realiza conforme a la Ley
            Federal de Protección de Datos Personales en Posesión de los
            Particulares (LFPDPPP).
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            Los datos del usuario serán utilizados únicamente para:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Operación y funcionamiento de la Aplicación.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Procesamiento de información necesaria para el dispositivo.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Contacto para temas de soporte, avisos o actualizaciones.
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
            El usuario podrá ejercer sus derechos ARCO (Acceso, Rectificación,
            Cancelación y Oposición) conforme a lo establecido en la LFPDPPP.
          </Text>
        </View>

        {/* 6. Relación con el dispositivo inteligente */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            6. Relación con el dispositivo inteligente
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            El desempeño de la Aplicación depende de:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • La conexión del usuario a internet.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • El estado físico del dispensador inteligente.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Condiciones externas no atribuibles a la Aplicación.
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
            No se garantiza el funcionamiento óptimo cuando existan fallas
            externas, modificaciones no autorizadas o uso indebido del
            dispositivo.
          </Text>
        </View>

        {/* 7. Propiedad intelectual */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            7. Propiedad intelectual
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            Todo contenido, código, diseño, interfaz y elementos gráficos son
            propiedad exclusiva del desarrollador y están protegidos por la Ley
            Federal del Derecho de Autor. Queda prohibida su reproducción o
            modificación sin autorización previa.
          </Text>
        </View>

        {/* 8. Actualizaciones y modificaciones */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            8. Actualizaciones y modificaciones
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            Nos reservamos el derecho de modificar:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • La Aplicación
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Los servicios ofrecidos
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Los presentes Términos y Condiciones
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
            Los cambios se publicarán en la misma Aplicación y entrarán en vigor
            al momento de su publicación.
          </Text>
        </View>

        {/* 9. Limitación de responsabilidad */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            9. Limitación de responsabilidad
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            No seremos responsables por:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Daños derivados del uso inadecuado del dispositivo o la
              Aplicación.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Pérdida de información por fallos externos.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Mal funcionamiento causado por terceros, redes ajenas o cortes
              eléctricos.
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
            El usuario utiliza el sistema bajo su propio riesgo.
          </Text>
        </View>

        {/* 10. Cancelación o suspensión del servicio */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            10. Cancelación o suspensión del servicio
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10 }}>
            Podremos suspender o cancelar una cuenta cuando:
          </Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Se detecte uso indebido.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Se violen los presentes Términos y Condiciones.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 5 }}>
              • Exista riesgo para la seguridad del sistema o de otros usuarios.
            </Text>
          </View>
        </View>

        {/* 11. Legislación aplicable y jurisdicción */}
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            11. Legislación aplicable y jurisdicción
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            Estos Términos y Condiciones se rigen por las leyes vigentes de los
            Estados Unidos Mexicanos. Cualquier controversia será sometida a los
            tribunales competentes de la entidad donde resida el desarrollador,
            salvo pacto en contrario.
          </Text>
        </View>

        {/* Botones de aceptación */}
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Pressable
            onPress={handleGoBack}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderWidth: 1,
              borderColor: "#FF3B30",
              borderRadius: 10,
              flex: 1,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "#FF3B30", textAlign: "center" }}>
              Rechazar
            </Text>
          </Pressable>

          <Pressable
            onPress={handleAccept}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 30,
              backgroundColor: "#007AFF",
              borderRadius: 10,
              flex: 1,
              marginLeft: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Aceptar Términos
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            fontSize: 12,
            color: "#999",
            textAlign: "center",
            marginTop: 30,
            marginBottom: 40,
          }}
        >
          Última actualización: Diciembre 2024
        </Text>
      </ScrollView>

      {/* Modal de aceptación */}
      <Modal visible={showAcceptModal} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              padding: 25,
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              ✅ Términos Aceptados
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                marginBottom: 20,
                lineHeight: 22,
              }}
            >
              Has aceptado los Términos y Condiciones de PawMatic. Tu
              registro/uso del servicio implica tu conformidad con lo
              establecido.
            </Text>
            <Pressable
              onPress={handleCloseModal}
              style={{
                backgroundColor: "#007AFF",
                paddingVertical: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Continuar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

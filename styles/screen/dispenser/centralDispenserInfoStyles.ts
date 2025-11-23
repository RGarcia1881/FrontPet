import { StyleSheet, Dimensions } from "react-native";
import { AppColors, AppFonts } from "@/styles/global/theme";

// --- CONSTANTES ---
const ICON_SIZE = 30;
const { width } = Dimensions.get("window");
const VIDEO_SIZE = width * 0.8;

export const centralDispenserInfoStyles = StyleSheet.create({
  // --- CÍRCULO DE INFORMACIÓN CENTRAL ---
  infoCircle: {
    width: "70%",
    height: "70%",
    borderRadius: 1000,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10,
    alignSelf: "center",
    aspectRatio: 1,
  },

  // Texto de información general
  infoText: {
    fontFamily: AppFonts.primary,
    color: AppColors.light,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 25,
  },

  // Estilos del nombre del dispensador
  dispenserName: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: -10,
  },

  // Estilos del texto de estado (para resaltar)
  statusText: {
    fontWeight: "bold",
    color: "#D4F5FF",
    marginBottom: 20,
  },

  // Contenedor de íconos de acción (base para posicionamiento absoluto)
  actionIconsContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },

  // Estilo individual para el ícono de acción
  actionIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },

  // Posición para los íconos superiores (Edit/Delete)
  topIcons: {
    top: 25,
  },

  // Posición para los íconos inferiores (View/Sound)
  bottomIcons: {
    bottom: 35,
  },

  // --- NUEVOS ESTILOS PARA EL BOTÓN GRANDE DE AÑADIR (id: 99) ---
  bigAddButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: AppColors.light,
    borderWidth: 3,
    borderColor: AppColors.primary,
  },
  addText: {
    color: AppColors.primary,
    fontFamily: AppFonts.primary,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },

  // ============================================================
  // ESTILOS PARA LA CÁMARA (NUEVOS)
  // ============================================================

  // Contenedor principal del modal
  cameraModalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  // Header del modal
  cameraModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },

  cameraModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    fontFamily: AppFonts.primary,
  },

  cameraModalCloseButton: {
    padding: 8,
  },

  // Contenedor del video
  cameraVideoContainerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  cameraVideoContainer: {
    backgroundColor: "#000",
    overflow: "hidden",
    borderWidth: 2,
    zIndex: -1,
    borderColor: "#ccc",
    width: "110%", // Ajustado para el círculo
    height: "110%", // Ajustado para el círculo
    borderRadius: 1000, // Mismo border radius que el círculo padre
    marginTop: -10, // Ajuste de posición
    marginBottom: -10, // Ajuste de posición
  },

  cameraScaledWebView: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scale: 1.9 }], // Ajustado para el nuevo tamaño
  },

  cameraMessageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 1000, // Mismo border radius
  },

  cameraMessageText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: AppFonts.system,
    textAlign: "center",
  },

  // Controles del modal
  cameraControls: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },

  cameraButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    zIndex: 10,
  },

  cameraButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: AppFonts.primary,
    zIndex: 1,
  },

  // ============================================================
  // ESTILOS PARA EL MODO VOZ (NUEVOS)
  // ============================================================

  // Espectro de audio
  audioSpectrum: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 60,
    marginBottom: 15,
    gap: 4,
  },

  audioBar: {
    width: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },

  // Timer de grabación
  timerText: {
    color: AppColors.light,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "monospace",
    marginBottom: 5,
  },

  // Texto de estado de voz
  voiceStatusText: {
    color: AppColors.light,
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },

  // Overlay de carga
  voiceLoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    zIndex: 10,
  },

  voiceLoadingText: {
    color: AppColors.light,
    marginTop: 8,
    fontSize: 12,
  },

  // ============================================================
  // ESTILOS COMPARTIDOS (NUEVOS)
  // ============================================================

  // Loading overlay general (renombrado para evitar conflicto)
  generalLoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    zIndex: 10,
  },

  generalLoadingText: {
    color: AppColors.light,
    marginTop: 10,
    fontSize: 14,
  },
});
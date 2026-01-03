// styles/screen/pets/petCardStyles.ts
import { StyleSheet } from "react-native";
import { AppColors, AppFonts } from "@/styles/global/theme";

export const styles = StyleSheet.create({
  // Contenedor de la tarjeta
  card: {
    width: 250,
    height: 280,
    backgroundColor: AppColors.light,
    borderRadius: 20,
    marginRight: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: AppColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // ✅ AGREGADO: Contenedor para la imagen
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 210,
    overflow: "hidden",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  // ✅ AGREGADO: Contenedor de carga
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  // ✅ AGREGADO: Contenedor placeholder
  placeholderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.primary,
  },

  // ✅ AGREGADO: Texto del placeholder
  placeholderText: {
    color: AppColors.light,
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },

  // Imagen del perro
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // Contenido inferior
  infoContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  // Nombre de la mascota
  petName: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: AppFonts.primary,
    color: AppColors.dark,
    marginBottom: 2,
  },

  // Raza o subtítulo
  petBreed: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: AppFonts.system,
    color: AppColors.subtext,
  },

  // Contenedor del botón 'Ver'
  pawButtonContainer: {
    position: "absolute",
    bottom: 15,
    right: 10,
    borderRadius: 30,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  pawText: {
    fontSize: 10,
    fontWeight: "bold",
    color: AppColors.primary,
    marginTop: -3,
    fontFamily: AppFonts.system,
  },
});

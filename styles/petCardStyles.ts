// styles/petCardStyles.ts

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/global/theme'; 

export const styles = StyleSheet.create({
    // Contenedor de la tarjeta (con sombra y bordes redondeados)
    card: {
        width: 250, // Ancho fijo para las tarjetas del carrusel
        height: 280, // Altura fija
        backgroundColor: AppColors.light,
        borderRadius: 20,
        marginRight: 15, // Espacio entre tarjetas
        overflow: 'hidden', // Importante para que la imagen se recorte en el borde
        
        // Sombra simple (Android)
        elevation: 5,
        // Sombra (iOS)
        shadowColor: AppColors.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    
    // Imagen del perro (ocupa la mayor parte superior)
    petImage: {
        width: '100%',
        height: 210, 
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    
    // Contenido inferior (nombre, raza, botón)
    infoContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    
    // Nombre de la mascota
    petName: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
        color: AppColors.dark,
        marginBottom: 2,
    },
    
    // Raza o subtítulo
    petBreed: {
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: AppFonts.system,
        color: AppColors.subtext, // Usamos el color de subtexto
    },
    
    // Contenedor del botón 'Ver' (lo posicionaremos absolutamente)
    pawButtonContainer: {
        position: 'absolute',
        bottom: 15, // Distancia desde el fondo
        right: 10,  // Distancia desde la derecha
        
         // Fondo blanco para la huella
        borderRadius: 30, 
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        
        // Sombra de la huella
    },
    pawText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: AppColors.primary,
        marginTop: -3, // Ajuste fino para centrar el texto "Ver"
        fontFamily: AppFonts.system,
    },
});
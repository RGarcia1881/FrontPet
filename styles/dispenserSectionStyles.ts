// dispenserSectionStyles.ts

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/theme'; 

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        backgroundColor: AppColors.light,
    },
    
    // 1. Header (Mis dispensadores. | Ver dispensadores)
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'light',
        fontFamily: AppFonts.primary,
        color: AppColors.text,
    },
    viewButton: {
        backgroundColor: AppColors.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    viewButtonText: {
        color: AppColors.light,
        fontWeight: '600',
        fontSize: 14,
        fontFamily: AppFonts.system,
    },

    // 2. Carrusel/Contenido central (Iconos, Imagen del Dispensador, Sala)
    dispenserCarousel: {
        alignItems: 'center',
    },
    dispenserName: {
        fontSize: 20,
        fontWeight: 'light',
        marginTop: 10,
        marginBottom: 0,
        fontFamily: AppFonts.primary,
        color: AppColors.text,
    },

    // Contenedor principal del dispensador (FUSIONADO y CORREGIDO)
    dispenserContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        width: '100%',
        position: 'relative', // Necesario para que los hijos absolutos se posicionen
    },

    // Contenedor para los íconos de estado (Rayos y WiFi)
    statusIcons: {
        position: 'absolute',
        left: -20, // Ajustado a 35 para que no se salga tanto
        top: '20%',
        alignItems: 'flex-start',
        zIndex: 10,
    },
    iconWrapper: {
        marginBottom: 10,
    },

    // Flechas de navegación (a los lados)
    arrow: {
        padding: 20,
        color: AppColors.text, 
    },

    // Contenedor que agrupará la imagen y los niveles de llenado
    dispenserVisualWrapper: {
        width: 250, 
        height: 250, 
        position: 'relative', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    // Estilo para la imagen del dispensador (FUSIONADO y CORREGIDO)
    dispenserImage: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain',
        position: 'absolute', 
        zIndex: 2, 
    },

    // Estilos para los niveles de agua y comida (los rectángulos de color)
    levelContainer: {
        position: 'absolute',
        bottom: 30, 
        zIndex: 1, 
        borderRadius: 10,
        opacity: 0.5, 
    },
    waterLevel: {
        left: '6%', 
        width: '48%', 
        maxHeight: '78%',
        // Usamos AppColors.waterColor o puedes usar AppColors.secondary si lo deseas
        backgroundColor: AppColors.secondary, 
    },
    foodLevel: {
        right: '5%', 
        width: '41%', 
        maxHeight: '78%',
        // Usamos AppColors.orange
        backgroundColor: AppColors.orange, 
    },

    // Estilos para los textos de porcentaje y los íconos (gota/hueso)
    levelOverlay: {
        position: 'absolute',
        zIndex: 3, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    waterOverlay: {
        left: '18%', 
        bottom: '4%',
        width: '28%',
        height: '100%',
    },
    foodOverlay: {
        right: '7%', 
        bottom: '4%',
        width: '35%',
        height: '100%',
    },
    levelText: {
        fontFamily: AppFonts.primary,
        fontSize: 18,
        fontWeight: 'light',
        color: AppColors.dark,
        marginTop: 5,
    },
    
    // Botón de Huella (Ver)
    pawButton: {
        marginTop: 0,
        padding: 0,
        borderRadius: 30, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    pawText: {
        color: AppColors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
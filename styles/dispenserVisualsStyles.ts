// styles/dispenserVisualsStyles.ts

import { StyleSheet } from 'react-native';
// Asegúrate de que esta ruta sea correcta para tus constantes
import { AppColors, AppFonts } from '@/styles/global/theme';

export const dispenserVisualsStyles = StyleSheet.create({
    // Contenedor que agrupará la imagen y los niveles de llenado
    dispenserVisualWrapper: {
        width: 200, 
        height: 200, 
        position: 'relative', 
        justifyContent: 'center',
        alignItems: 'center',
        // Margen negativo para superponer el círculo central en DispenserScreen.tsx
        marginBottom: 10, 
        zIndex: 2,
    },
    
    // Imagen del Dispensador (encima de los niveles)
    dispenserImage: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain',
        position: 'absolute', 
        zIndex: 2, 
    },

    // --- ESTILOS DE NIVELES DE LLENADO ---
    levelContainer: {
        position: 'absolute',
        bottom: 30, // Posicionamiento vertical dentro de la imagen
        zIndex: 1, 
        borderRadius: 10,
        opacity: 0.5, 
    },
    waterLevel: {
        left: '6%', 
        width: '48%', 
        maxHeight: '78%',
        backgroundColor: AppColors.secondary, // Color Azul/Agua
    },
    foodLevel: {
        right: '5%', 
        width: '41%', 
        maxHeight: '78%',
        backgroundColor: AppColors.orange, // Color Naranja/Comida
    },

    // --- ESTILOS DE OVERLAYS (TEXTOS DE PORCENTAJE) ---
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
    
    // --- ESTILOS DE ÍCONOS DE ESTADO (WiFi y Energía) ---
    statusIcons: {
        position: 'absolute',
        left: -20, // Posicionado a la izquierda del dispensador
        top: '20%',
        alignItems: 'flex-start',
        zIndex: 10,
    },
    iconWrapper: {
        marginBottom: 10,
    },
});
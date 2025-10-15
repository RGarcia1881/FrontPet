// styles/centralDispenserInfoStyles.ts

import { StyleSheet } from 'react-native';
// Asegúrate de que esta ruta sea correcta
import { AppColors, AppFonts } from '@/styles/theme';

// --- CONSTANTES ---
const ICON_SIZE = 30;
const BLUE_GREY = '#6A8BAB'; // Color de fondo del círculo central

export const centralDispenserInfoStyles = StyleSheet.create({
    // --- CÍRCULO DE INFORMACIÓN CENTRAL ---
    infoCircle: {
        width: '70%', 
        height: '70%',
        // Usamos un valor grande para asegurar el círculo, aunque el tamaño se controla por 'width' y 'height'
        borderRadius: 1000, 
        backgroundColor: AppColors.primary, // Color azul claro
        justifyContent: 'center', // Centra el contenido (texto) verticalmente
        alignItems: 'center', // Centra el contenido (texto) horizontalmente
        padding: 20,
        position: 'relative', // CLAVE: para posicionar los íconos internos de forma absoluta
    },
    
    // Texto de información general
    infoText: {
        fontFamily: AppFonts.primary,
        color: AppColors.light,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 25,
    },

    // Estilos del nombre del dispensador
    dispenserName: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: -10, // Ajuste para el centrado visual del grupo de texto
    },
    
    // Estilos del texto de estado (para resaltar)
    statusText: {
        fontWeight: 'bold',
        color: '#D4F5FF', // Color más claro/brillante para el estado
        marginBottom: 20,
    },

    // Contenedor de íconos de acción (base para posicionamiento absoluto)
    actionIconsContainer: {
        position: 'absolute', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%', // Ocupa el 80% del círculo infoCircle
    },

    // Estilo individual para el ícono de acción
    actionIcon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        // El color del ícono se controla en el componente con tintColor (o el prop 'color' de Ionicons),
        // pero este estilo asegura su tamaño si usas Image.
        // Si usas @expo/vector-icons, el prop 'size' y 'color' es más directo.
    },
    
    // Posición para los íconos superiores (Edit/Delete)
    topIcons: {
        top: 25, 
    },
    
    // Posición para los íconos inferiores (View/Sound)
    bottomIcons: {
        bottom: 35, 
    },
});
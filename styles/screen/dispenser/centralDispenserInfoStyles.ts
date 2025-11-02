import { StyleSheet } from 'react-native';
// Asegúrate de que esta ruta sea correcta
import { AppColors, AppFonts } from '@/styles/global/theme';

// --- CONSTANTES ---
const ICON_SIZE = 30;
// const BLUE_GREY = '#6A8BAB'; // No se usa, se elimina

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
        // Aseguramos que el botón Añadir se vea bien con la sombra del círculo principal
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
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
        // Hacemos el círculo un poco más pequeño que el contenedor principal
        width: 180, 
        height: 180,
        borderRadius: 999,
        backgroundColor: AppColors.light, // Fondo claro para el botón '+'
        borderWidth: 3,
        borderColor: AppColors.primary,
    },
    addText: {
        color: AppColors.primary, // Texto del botón Añadir en color primario
        fontFamily: AppFonts.primary,
        fontWeight: '600',
        fontSize: 14,
        marginTop: 5,
        textAlign: "center",
    },
});

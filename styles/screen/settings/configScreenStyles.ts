// styles/configScreenStyles.ts

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { AppColors, AppFonts } from '@/styles/global/theme'; // Ajusta la ruta

const { width } = Dimensions.get('window');

// Colores de tu boceto (ajustar si tienes AppColors definidos)
const CONFIG_COLORS = {
    background: '#f8f8f8', // Fondo muy claro
    text: '#333333',
    sectionTitle: '#666666',
    separator: '#e0e0e0', // Línea de división sutil
    toggleActive: '#4CAF50', // Verde para el switch activo
    navIcon: '#aaaaaa', // Gris claro para el chevron
    primary: AppColors.primary, // Usa el primario de tu tema para el texto de la fila
};

export const configScreenStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CONFIG_COLORS.background,
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        fontFamily: AppFonts.primary,
        color: CONFIG_COLORS.text,
    },
    scrollContent: {
        paddingBottom: 100, // Espacio para la barra de pestañas
    },

    // --- SECCIÓN HEADER STYLES ---
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30, // Espacio superior entre secciones
        paddingBottom: 10,
        backgroundColor: CONFIG_COLORS.background,
    },
    sectionIcon: {
        color: CONFIG_COLORS.sectionTitle,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: CONFIG_COLORS.sectionTitle,
        fontFamily: AppFonts.primary,
    },
    sectionContainer: {
        borderTopWidth: 1,
        borderTopColor: CONFIG_COLORS.separator,
    },

    // --- ROW STYLES ---
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white', // Fondo de cada fila
        borderBottomWidth: 1,
        borderBottomColor: CONFIG_COLORS.separator,
    },
    iconWrapper: {
        marginRight: 15,
        width: 24, // Para alinear bien el texto
    },
    icon: {
        color: CONFIG_COLORS.primary,
    },
    textContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 16,
        color: CONFIG_COLORS.text,
        fontFamily: AppFonts.primary,
    },
    rowSubtitle: {
        fontSize: 12,
        color: CONFIG_COLORS.sectionTitle,
        fontFamily: AppFonts.primary,
        marginTop: 2,
    },

    // 🔥 ESTILO PARA EL AVATAR DEL USUARIO
    userAvatar: { 
        width: 40, 
        height: 40,
        left:-5,
        borderRadius: 20, // Hace el círculo (la mitad del width/height)
    },

    // --- ACCESSORIES ---
    navAccessory: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitleText: {
        fontSize: 14,
        color: CONFIG_COLORS.sectionTitle,
        marginRight: 5,
        fontFamily: AppFonts.primary,
    },
    navIcon: {
        color: CONFIG_COLORS.navIcon,
    },
    toggleActiveTrack: {
        backgroundColor: CONFIG_COLORS.toggleActive,
    },
    toggleActiveThumb: {
        backgroundColor: 'white',
    }
});
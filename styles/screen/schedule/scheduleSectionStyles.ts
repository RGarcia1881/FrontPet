// scheduleSectionStyles.ts

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/global/theme';
import { useTheme } from '@react-navigation/native';

const colors = {
    // Colores basados en tus estilos anteriores y la captura de pantalla.
    primaryBlue: '#7799B7',
    darkText: '#333',
    mediumText: '#555',
    lightGray: '#f0f0f0', // Usado para el encabezado de la tabla
    lightBackground: '#fff',
    buttonColor: '#9FBAC7', // Color del botón 'Ver Horarios'
    tableBorder: '#000', // Borde negro para la tabla
    error: '#FF3B30',
    loading: '#007AFF',
};

export const styles = StyleSheet.create({

    container: {
        width: '100%', 
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: AppColors.light,
    },

    // 1. Contenedor de la parte superior (Saludo y Botón)
    headerContainer: {
        flexDirection: 'row', // Saludo y Botón en la misma fila
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    
    // Estilos del Saludo
    greetingText: {
        fontSize: 28,
        fontWeight: 'bold', 
        fontFamily: 'System', 
        color: colors.darkText,
    },
    
    // Estilos del Botón
    viewButton: {
        backgroundColor: colors.buttonColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    viewButtonText: {
        color: colors.lightBackground,
        fontWeight: '600',
        fontSize: 14,
        fontFamily: 'System',
    },

    // 2. Contenedor del contenido inferior (Imagen y Tabla)
    contentContainer: {
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },

    // Sección de la imagen
    imageContainer: {
        width: '100%', // Ocupa todo el ancho
        height: 250, // Altura ajustada
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15, // Espacio entre la imagen y la tabla
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    // Sección de la tabla
    scheduleContainer: {
        width: '100%', // Ocupa todo el ancho
    },
    scheduleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.darkText,
    },
    table: {
        borderWidth: 5,
        borderColor: colors.tableBorder,
        borderRadius: 8,
    },
    tableRow: {
        flexDirection: 'row', // Las celdas dentro de la fila van en horizontal
    },
    tableHeader: {
        backgroundColor: AppColors.primary, // Color de fondo del encabezado
    },
    tableHeaderCell: {
        flex: 1, // Distribuye el ancho equitativamente entre las celdas
        padding: 8,
        borderRightWidth: 5,
        borderBottomWidth: 1,
        borderColor: colors.tableBorder,
        alignItems: 'center',
    },
    tableCell: {
        flex: 1, // Distribuye el ancho equitativamente entre las celdas
        padding: 8,
        borderRightWidth: 5,
        borderBottomWidth: 1,
        borderColor: colors.tableBorder,
        alignItems: 'center',
    },
    cellText: {
        fontSize: 11,
        color: colors.darkText,
    },
    lastCell: {
        borderRightWidth: 0, // Remueve el borde derecho de la última celda
    },
    lastRow: {
        borderBottomWidth: 0, // Remueve el borde inferior de la última fila
    },

    // ===== NUEVOS ESTILOS PARA ESTADOS ADICIONALES =====

    // Estilos para estado de carga
    loadingContainer: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBackground,
        borderRadius: 8,
        marginVertical: 10,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: colors.mediumText,
        fontFamily: 'System',
    },

    // Estilos para estado de error
    errorContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBackground,
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.error,
    },
    errorText: {
        fontSize: 14,
        color: colors.error,
        textAlign: 'center',
        fontFamily: 'System',
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: colors.buttonColor,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    retryButtonText: {
        color: colors.lightBackground,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'System',
    },

    // Estilos para estado vacío
    emptyState: {
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBackground,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.lightGray,
        borderStyle: 'dashed',
    },
    emptyStateText: {
        fontSize: 14,
        color: colors.mediumText,
        fontStyle: 'italic',
        textAlign: 'center',
        fontFamily: 'System',
    },

    // Estilos para el texto del header (mejor contraste)
    headerText: {
        fontSize: 11,
        color: colors.lightBackground, // Texto blanco para mejor contraste en header
        fontWeight: 'bold',
        fontFamily: 'System',
    },
});
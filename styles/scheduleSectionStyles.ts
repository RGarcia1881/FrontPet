// scheduleSectionStyles.ts

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/theme';
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
};

export const styles = StyleSheet.create({

    container: {
        width: '100%', 
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: colors.lightBackground,
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
});
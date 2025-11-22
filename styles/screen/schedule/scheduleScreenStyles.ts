// styles/scheduleScreenStyles.ts

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/global/theme'; 

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.light, // Fondo de la pantalla
    },
    scrollContent: {
        paddingTop: 30, // Espacio superior
        flexGrow: 1,
    },
    titleContainer: {
        paddingHorizontal: 25,
        marginBottom: 30,
        alignItems: 'center', // Centra los títulos
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
        color: AppColors.dark,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: AppColors.subtext,
    },
    greetingBox: {
        alignItems: 'center',
        marginBottom: 0,
    },
    greetingText: {
        fontSize: 25,
        fontFamily: AppFonts.primary,
        color: AppColors.dark,
        marginBottom: 10,
    },
    scheduleImage: {
        width: '100%', 
        height: 450, 
        resizeMode: 'contain',
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
        color: AppColors.dark,
        paddingHorizontal: 25,
        marginBottom: 10,
        marginTop: -40,
    },
    table: {
        marginHorizontal: 25,
        borderWidth: 2,
        borderColor: AppColors.dark,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 45,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: AppColors.dark,
    },
    headerCell: {
        backgroundColor: AppColors.primary, // Color de fondo del encabezado
        borderBottomWidth: 2, // Borde más grueso para separar el encabezado
    },
    cellText: {
        fontSize: 14,
        color: AppColors.dark,
        fontFamily: AppFonts.system,
    },
    headerText: {
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
        color: AppColors.light, // Texto blanco para contraste en el header
    },
    button: {
        marginHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 25,
        marginBottom: 30,
        backgroundColor: AppColors.primary, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: AppColors.light,
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
    },
    // Nuevos estilos para estados adicionales
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: AppColors.subtext,
        fontFamily: AppFonts.system,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    errorText: {
        fontSize: 16,
        color: AppColors.error,
        fontFamily: AppFonts.system,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: AppColors.primary,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 25,
    },
    retryButtonText: {
        fontSize: 16,
        color: AppColors.light,
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
    },
    emptyState: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: AppColors.subtext,
        fontFamily: AppFonts.system,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    // Estilo para la última fila (sin borde inferior)
    lastRow: {
        borderBottomWidth: 0,
    },
    // Estilo para la última celda (sin borde derecho)
    lastCell: {
        borderRightWidth: 0,
    },
});
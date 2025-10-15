// styles/scheduleScreenStyles.ts

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/theme'; 

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.light, // Fondo de la pantalla
    },
    scrollContent: {
        paddingTop: 30, // Espacio superior
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
});
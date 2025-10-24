// styles/petsScreenStyles.ts

import { StyleSheet, Dimensions } from 'react-native';
import { AppColors, AppFonts } from '@/styles/global/theme';

const { width, height } = Dimensions.get('window');

export const petsScreenStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 100, // Espacio para el menú inferior
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: AppFonts.primary,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: AppColors.subtext,
        fontFamily: AppFonts.primary,
    },
    
    // --- ESTILOS DE LA ESCENA ---
    sceneContainer: {
        height: height * 0.5, 
        width: width,
        position: 'relative', 
    },
    
    // 🔥 ESTILO AGREGADO Y CORREGIDO para el fondo PNG único
    sceneBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    
    // --- Estilos para la Mascota y Botón 'Ver' ---
    petContainer: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 10, // Elevado para estar sobre el fondo
    },
    petImage: {
        width: 100,
        height: 100, 
    },
    petNameText: {
        fontWeight: 'light',
        backgroundColor: 'white',
        fontSize: 14,
        marginTop: -120,
        borderRadius: 10,
        fontFamily: AppFonts.primary,
    },
    viewButton: {
        backgroundColor: AppColors.primary,
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 15,
        marginTop: 95,
        zIndex: 5, 
    },
    viewButtonText: {
        color: AppColors.light,
        fontSize: 12,
        fontFamily: AppFonts.primary,
    },
    
    // --- Posicionamiento de las Mascotas ---
    petPosition1: {
        top: '55%', 
        left: '14%',
        scale: 1.1,
    },
    petPosition3: {
        top: '95%', 
        left: '30%',
        scale: 1.3,
    },
    petPosition2: {
        top: '55%', 
        left: '50%',
        zIndex: 10, 
        scale: 1.1,
    },
    petPosition4: {
        top: '95%', 
        left: '65%',
        scale: 1.2,
    },
    
    // --- Botón 'Agregar miembro' ---
    addMemberButton: {
        position: 'absolute',
        bottom: -180,
        alignSelf: 'center',
        backgroundColor: AppColors.primary,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 25,
        zIndex: 20, 
    },
    addMemberButtonText: {
        color: AppColors.light,
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
    },
});
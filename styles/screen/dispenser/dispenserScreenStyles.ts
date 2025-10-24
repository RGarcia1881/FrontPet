// styles/dispenserScreenStyles.ts

import { StyleSheet, Dimensions } from 'react-native';
import { AppColors, AppFonts } from '@/styles/global/theme'; 

const { width } = Dimensions.get('window');

// --- CONSTANTES GLOBALES ---
const CIRCULAR_CONTAINER_SIZE = width * 0.9; 
const SMALL_DISPENSER_SIZE = 75; 
const BLUE_GREY = '#6A8BAB'; 
const ICON_SIZE = 24; 

export const dispenserScreenStyles = StyleSheet.create({
    // --- ESTILOS GENERALES DE LA PANTALLA ---
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.light,
    },
    scrollContent: {
        paddingTop: 30,
        paddingBottom: 100,
        alignItems: 'center',
    },
    titleContainer: {
        marginBottom: 40,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: AppFonts.primary,
        color: AppColors.dark,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: AppColors.subtext,
        textAlign: 'center',
    },
    
    // --- CONTENEDOR DE LA ANIMACIÓN (Centro de Rotación) ---
    dispenserAnimationContainer: {
        width: CIRCULAR_CONTAINER_SIZE,
        height: CIRCULAR_CONTAINER_SIZE,
        marginBottom: -(CIRCULAR_CONTAINER_SIZE / 3), 
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -70,
    },
    
    // --- DISEÑO CIRCULAR EXTERIOR (Contenedor principal sin borde) ---
    circularContainer: {
        width: CIRCULAR_CONTAINER_SIZE,
        height: CIRCULAR_CONTAINER_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', 
        zIndex: 1,
    },
    
    // 🔥 ELIMINADO: circleBorder estilo (ya no se usa)
    
    // BASE PARA AnimatedDispenser
    dispenserWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        width: 250, 
        height: 250, 
    },

    // --- ESTILOS DE ELEMENTOS (Pequeños y Botón) ---
    smallDispenserImage: { 
        width: SMALL_DISPENSER_SIZE, 
        height: SMALL_DISPENSER_SIZE, 
        resizeMode: 'contain' 
    },
    smallDispenserLabel: { 
        textAlign: 'center', 
        fontSize: 10, 
        color: AppColors.dark 
    },

    // Estilo visual para el botón (+), sin posicionamiento absoluto
    addButtonVisual: { 
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 30,
        color: AppColors.light,
        lineHeight: 30, 
    },

    // --- ESTILOS DEL CÍRCULO CENTRAL (CentralDispenserInfo) ---
    infoCircle: {
        width: '70%', 
        height: '70%',
        borderRadius: (CIRCULAR_CONTAINER_SIZE * 0.7) / 2, 
        backgroundColor: BLUE_GREY, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative', 
    },
    
    infoText: {
        fontFamily: AppFonts.system,
        color: AppColors.light,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 25,
    },

    dispenserName: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: -10,
    },
    
    statusText: {
        fontWeight: 'bold',
        color: '#D4F5FF', 
        marginBottom: 20,
    },

    actionIconsContainer: {
        position: 'absolute', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },

    actionIcon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        tintColor: AppColors.light,
    },
    
    topIcons: {
        top: 25, 
    },
    
    bottomIcons: {
        bottom: 25, 
    },
});
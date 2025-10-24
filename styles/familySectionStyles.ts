// styles/familySectionStyles.ts

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/global/theme'; 

export const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 60,
        marginBottom: 30,

    },
    title: {
        fontSize: 18,
        fontWeight: 'light',
        fontFamily: AppFonts.primary,
        backgroundColor: AppColors.light,
        color: AppColors.dark,
        paddingHorizontal: 20, // Se mantiene aquí para el título
        marginBottom: 15,
    },
    // 🔥 CLAVE: Usamos 'paddingLeft' aquí y ajustamos los márgenes de las tarjetas.
    carousel: {
        paddingLeft: 20, // El padding inicial para la primera tarjeta
        paddingRight: 5, // Un pequeño padding de cierre.
    }
});
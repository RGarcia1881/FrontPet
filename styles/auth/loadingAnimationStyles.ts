import { StyleSheet } from 'react-native';

// Color principal, que es el azul claro de Pawmatic
export const PRIMARY_COLOR = '#85aac3'; 

export const loadingAnimationStyles = StyleSheet.create({
    // Estos estilos se mantuvieron para referencia, pero solo necesitamos el PRIMARY_COLOR
    // para la nueva animación SVG.
    loadingBox: {
        width: 150,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end', 
        gap: 10,
    },
    bar: {
        width: 20,
        backgroundColor: PRIMARY_COLOR, 
        borderRadius: 2, 
    },
    // Nuevos estilos para centrar el spinner 50x50
    spinnerContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

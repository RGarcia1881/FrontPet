// styles/newPetCardStyles.ts (CORREGIDO y OPTIMIZADO)

import { StyleSheet } from 'react-native';
import { AppColors, AppFonts } from '@/styles/theme'; 

export const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative', // Necesario para posicionar la imagen 'absolute' dentro
        
        flexDirection: 'row', // Permite que el texto y la imagen se coloquen uno al lado del otro
        alignItems: 'center', // Alinea los elementos verticalmente al centro
        justifyContent: 'space-between', // Espacia el texto/botón y la imagen
        
        backgroundColor: AppColors.primary, 
        borderRadius: 15,
        paddingHorizontal: 20,
        // 🔥 Ajustamos el padding vertical para dar espacio a la imagen que sobresale.
        // Esto evita que el contenido de arriba/abajo se solape si la imagen es muy grande.
        paddingVertical: 15, 
        minHeight: 150, // Asegura un tamaño mínimo para la tarjeta
        
        marginHorizontal: 20, 
        marginTop: 20,
        // No necesitamos overflow: 'visible' explícitamente en RN para esto
    },
    
    textButtonContainer: {
        // Permite que este contenedor tome el espacio restante sin invadir el espacio de la imagen
        flex: 1, 
        maxWidth: '65%', // Ocupa un 65% del ancho para dejar espacio a la imagen
        marginRight: 10, // Pequeño margen entre el texto y la imagen
    },
    
    titleText: {
        fontSize: 24,
        fontWeight: 'light',
        fontFamily: AppFonts.primary,
        color: AppColors.light,
        marginBottom: 10,
    },
    
    addButton: {
        backgroundColor: AppColors.light,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignSelf: 'flex-start', // Alinea el botón a la izquierda dentro de su contenedor
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: 'light',
        fontFamily: AppFonts.primary,
        color: AppColors.dark,
    },

    petImage: {
        position: 'absolute', // Saca la imagen del flujo normal para posicionarla libremente
        
        width: 170, 
        height: 170,
        resizeMode: 'contain',
        
        // Ajustes para posicionar la imagen fuera de los límites de la tarjeta
        right: -10, // Un poco hacia la derecha, fuera del borde
        bottom: 0, // Alineado con la parte inferior de la tarjeta
        // Ajusta estos valores según cómo quieras que se vea la imagen en relación con la tarjeta.
    },
});
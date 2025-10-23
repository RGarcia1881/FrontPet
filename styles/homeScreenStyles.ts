import { StyleSheet, Dimensions } from 'react-native';
import { AppColors, AppFonts } from '@/styles/theme';


const colors = {
primaryBlue: '#7799B7',
darkText: '#333',
mediumText: '#555',
lightGray: '#f5f5f5',
lightBackground: '#fff',
};

export const homeStyles = StyleSheet.create({
// Contenedor principal de la pantalla
container: {
flex: 1,
backgroundColor: AppColors.light,
},
// Estilo para el contenido principal (donde irá el resto de la app)
content: {
paddingHorizontal: 0,
paddingTop: 0,
backgroundColor: AppColors.light,
},
});

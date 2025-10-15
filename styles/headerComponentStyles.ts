import { StyleSheet, Dimensions } from 'react-native';

const colors = {
primaryBlue: '#85aac3',
darkText: '#333',
mediumText: '#555',
lightGray: '#f5f5f5',
lightBackground: '#fff',
};

export const headerStyles = StyleSheet.create({

container: {
flex: 1,
backgroundColor: colors.lightBackground,
},

// ⭐️ ESTILOS DEL HEADER (Cabecera) ⭐️
headerContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingHorizontal: 20,
paddingTop: 40, // Espacio para el notch y barra de estado
paddingBottom: 0,
backgroundColor: colors.lightBackground,
borderBottomWidth: 0, // No border, looks cleaner
},

// Contenedor del logo y el texto de bienvenida
welcomeSection: {
flexDirection: 'row',
alignItems: 'center',
flex: 1,
},

// Icono del perrito (simulado con un View/Text para SVG/Icono)
appLogo: {
width: 80,
height: 80,
borderRadius: 15, // Placeholder para el icono del perrito
justifyContent: 'center',
alignItems: 'center',
marginRight: 10,
},

// Sección de texto de Bienvenida
textWrapper: {
// Permite que el texto se comprima un poco si el nombre es largo
maxWidth: '70%',
},

welcomeText: {
fontFamily: 'Galindo',
fontSize: 14,
color: colors.mediumText,
opacity: 0.6,
lineHeight: 18,
},

userName: {
fontFamily: 'Galindo',
fontSize: 18,
fontWeight: 'bold',
color: colors.darkText,
lineHeight: 22,
},

// Imagen de perfil del usuario
profileImage: {
width: 80,
height: 80,
borderRadius: 55,
backgroundColor: '#ccc', // Placeholder
},
});

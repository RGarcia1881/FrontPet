import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const colors = {
  primaryBlue: '#85aac3', 
  lightGray: '#f5f5f5',
  darkText: '#333',
  lightText: '#0c0d0f',
};

export const registerStyles = StyleSheet.create({
  // Contenedor principal para la pantalla
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  
  // Contenedor para ScrollView (necesario para la pantalla de registro con más campos)
  viewContainer: {
    flexGrow: 1, // Permite que el contenido se extienda y active el scroll
    justifyContent: 'center', // Centrado Vertical
    alignItems: 'center', // Centrado Horizontal
    paddingTop: 80, 
    paddingBottom: 50,
  },
  
  headerTitle: {
    fontFamily: 'Galindo',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: 10,
  },
  
  subtitle: {
    fontSize: 16,
    fontFamily: 'Galindo',
    color: colors.lightText,
    opacity: 0.3,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    fontFamily: 'Galindo',
    color: colors.darkText,
    borderWidth: 1,
    borderRadius: 12, 
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  
  registerButton: {
    height: 50,
    width: '100%',
    backgroundColor: colors.primaryBlue,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Galindo',
  },
  
  loginLink: {
    fontSize: 16,
    fontFamily: 'Galindo',
    color: colors.lightText,
    opacity: 0.3,
    textAlign: 'center',
    marginBottom: 40,
  },

  // ⭐️ ESTILO PARA IMAGEN DE HUELLAS - Opacidad incrementada a 0.5
  pawPrintsImage: {
    position: 'absolute',
    bottom: -160,
    right: -50,
    width: 400, 
    height:400, 
    resizeMode: 'contain',
    opacity: 1, // Más visible
    zIndex: 1, 
  },
});

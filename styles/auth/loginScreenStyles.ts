import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const colors = {
  primaryBlue: '#7799B7', 
  lightGray: '#f5f5f5',
  darkText: '#333',
  lightText: '#0c0d0f',
};

export const loginStyles = StyleSheet.create({
  // Contenedor principal: Ocupa toda la pantalla y aplica padding horizontal.
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  
  // ⭐️ ¡CORRECCIÓN CLAVE! Este contenedor reemplaza a scrollContainer.
  // Es un View simple que centra su contenido vertical y horizontalmente.
  viewContainer: {
    flex: 1, // Asegura que ocupe el espacio disponible
    justifyContent: 'center', // Centrado Vertical
    alignItems: 'center', // Centrado Horizontal
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
    marginBottom:20,
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
  
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Galindo',
    color: colors.lightText,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  
  loginButton: {
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
  
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Galindo',
  },
  
  registerLink: {
    fontSize: 16,
    fontFamily: 'Galindo',
    color: colors.lightText,
    opacity: 0.3,
    textAlign: 'center',
    marginBottom: 40,
  },
  
  dogImage: {
    width: 250,
    height: 300,
    marginTop: -20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

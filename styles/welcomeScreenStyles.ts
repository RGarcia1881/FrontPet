import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

// Colores basados en la imagen proporcionada
const colors = {
  primaryBlue: '#85aac3', // Azul claro/grisáceo del fondo superior
  backgroundWhite: '#f5f5f5', // Gris claro del fondo inferior/general
  darkText: '#333',
  buttonPrimary: '#7799B7', // Color de los botones
};

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  // Contenedor superior (azul) para el texto y la imagen
  topContainer: {
    height: height * 0.65, // Ocupa el 65% de la pantalla
    backgroundColor: colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 30,
    position: 'relative', // Necesario para posicionar la imagen
  },
  // Texto principal
  mainText: {
    fontFamily: 'Galindo',
    fontSize: 40,
    color: '#fff', // Texto en blanco
    textAlign: 'center',
    lineHeight: 60,
    marginBottom: 300,
    paddingBottom: 40, // Espacio extra para que el texto no choque con el perro
  },
  // Contenedor inferior (blanco) para los botones
  bottomContainer: {
    flex: 1,
    height: height * 0.35, // Ocupa el 35% de la pantalla
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 140, // Ajuste para dar espacio al perro
    paddingHorizontal: 20,
  },
  // Estilo para la imagen del perro (la posicionaremos de forma absoluta)
  dogImage: {
    position: 'absolute',
    bottom: 150, // ⭐️ AJUSTE CLAVE 1: Subimos al perro para que quede mejor en la división
    width: 200, 
    height: 300, 
    resizeMode: 'contain',
    zIndex: 10,
    left: '50%', // ⭐️ AJUSTE CLAVE 2: Movemos al centro
    transform: [{ translateX: -100 }], // ⭐️ AJUSTE CLAVE 3: Centramos correctamente la imagen
  },
  // Contenedor de botones
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    // Eliminamos el margen superior para que los botones queden pegados a la parte superior del contenedor blanco
    marginTop: 0, 
  },
  // Estilo base para el botón
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Botón de iniciar sesión (relleno)
  loginButton: {
    backgroundColor: colors.buttonPrimary,
    borderWidth: 1,
    borderColor: colors.buttonPrimary,
  },
  // Botón de registrarse (contorno)
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.buttonPrimary,
  },
  // Texto de los botones
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Galindo', // Usamos Galindo para los botones también
  },
  loginText: {
    color: '#fff',
  },
  registerText: {
    color: colors.buttonPrimary,
  },
});

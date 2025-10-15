import { StyleSheet, Dimensions } from 'react-native';

// Color principal (azul claro, basado en el mockup)
const PRIMARY_COLOR = '#85aac3'; 

export const splashStyles = StyleSheet.create({
    container: {
        flex: 1,
        // 1. Fondo blanco (como se solicitó)
        backgroundColor: '#FFFFFF', 
        // Centra TODO el contenido de la pantalla horizontalmente
        alignItems: 'center',
        // Ocupa todo el espacio
    },
    // Contenedor que agrupa el Logo y el Título para centrado vertical
    mainContent: {
        // Centra el bloque de Logo y Título en el centro de la pantalla
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Este es el contenedor exterior sin relleno (solo contorno)
    circleExt: {
        width: 360, 
        height: 360,
        // Centra el logoContainer dentro de él
        justifyContent: 'center',
        alignItems: 'center',
        
        // 🚨 CORRECCIÓN: Mitad del width/height (360/2 = 180)
        borderRadius: 180, 
        
        // Contorno (borde sin fondo)
        borderWidth: 5, // Ajustado el ancho para que se vea como el mockup
        borderColor: PRIMARY_COLOR,
        
        marginBottom: 80, 
        
        // Eliminamos las sombras de aquí para que solo las tenga el círculo interior
    },
    logoContainer: {
        // Tamaño basado en el diseño
        width: 340, 
        height: 340,
        // Centra el logo DENTRO del círculo
        justifyContent: 'center',
        alignItems: 'center',
        
        // Círculo relleno (color 85aac3)
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 170, // Mitad del tamaño para un círculo (340/2 = 170)
        
        // Contorno (borderWidth simula el contorno interior)
        borderWidth: 10,
        borderColor: PRIMARY_COLOR,
        
        // Sombra para dar profundidad (efecto 3D/ovalado del mockup)
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    logo: {
        width: 250,
        height: 250,
        // El logo del perro debe ser blanco
        tintColor: 'white',
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 50, // Espacio antes de la animación de carga
    },
    // Paw (negro/gris oscuro)
    titlePaw: {
        fontSize: 34,
        fontFamily: 'Galindo',
        fontWeight: 'bold',
        color: '#333333', 
        letterSpacing: 2,
    },
    // Matic (gris claro/azul - color principal)
    titleMatic: {
        fontSize: 34,
        fontFamily: 'Galindo',
        fontWeight: 'bold',
        color: PRIMARY_COLOR, 
        letterSpacing: 2,
    },
    loaderContainer: {
        // Lo posicionamos en la parte inferior de la pantalla
        position: 'absolute',
        bottom: 50,
        // Asegura que la animación de carga esté centrada horizontalmente
        alignItems: 'center', 
        width: '100%',
    }
});

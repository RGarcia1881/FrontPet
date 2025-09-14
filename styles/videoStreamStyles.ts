import { StyleSheet } from 'react-native';

export const videoStreamStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  videoContainerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoContainer: {
    backgroundColor: '#000',
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#ccc',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  messageText: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  info: {
    color: '#007AFF',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  loadingContainer: {
    paddingVertical: 10,
  },
  spacer: {
    height: 10,
  },
  scaledWebView: {
    ...StyleSheet.absoluteFillObject,
    // Este truco escala la vista para rellenar el contenedor circular.
    // Asumimos una relación de aspecto 16:9, por lo que la escalamos 1.777 veces.
    transform: [{ scale: 1.35 }],
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  }
});

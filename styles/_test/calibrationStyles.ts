import { StyleSheet } from "react-native";

export const calibrationStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  messageText: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  success: {
    color: '#155724',
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  error: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  loadingContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  spacer: {
    height: 20,
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});

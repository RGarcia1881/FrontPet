// styles/esp32Styles.ts

import { StyleSheet } from "react-native";

export const esp32Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 15,
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonSpacer: {
    height: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    marginTop: 15,
    padding: 10,
    borderRadius: 6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#e6f7e6',
    color: '#34a853',
  },
  error: {
    backgroundColor: '#ffe6e6',
    color: '#ea4335',
  },
});
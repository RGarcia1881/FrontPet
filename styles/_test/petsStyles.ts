import { StyleSheet } from "react-native";

export const petsStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "600" },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 5,
  },
});
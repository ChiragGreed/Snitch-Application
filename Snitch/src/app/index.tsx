
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native! 👋</Text>

      <Text style={styles.subtitle}>
        My first Android application.
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Let's Go 🚀</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 12,
  },

  button: {
    backgroundColor: "#0f766e",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 28,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

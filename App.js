import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("login");

  return (
    <View style={styles.container}>
      {screen === "login" ? (
        <>
          <Text style={styles.title}>Midterm Exam</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#9ca3af"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />

            <Pressable>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressedButton,
              ]}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>

            <Pressable
              onPress={() => setScreen("register")}
              style={({ pressed }) => [
                styles.registerButton,
                pressed && styles.pressedRegisterButton,
              ]}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Register your account</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#9ca3af"
            />

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              placeholderTextColor="#9ca3af"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressedButton,
              ]}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>

            <Pressable
              onPress={() => setScreen("login")}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressedRegisterButton,
              ]}
            >
              <Text style={styles.backButtonText}>Back to Login</Text>
            </Pressable>
          </View>
        </>
      )}

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: "#f9fafb",
  },

  forgotPassword: {
    textAlign: "right",
    color: "#2563eb",
    marginBottom: 22,
    fontSize: 14,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },

  pressedButton: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  registerButton: {
    borderWidth: 1.5,
    borderColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  pressedRegisterButton: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  registerButtonText: {
    color: "#2563eb",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  backButton: {
    borderWidth: 1.5,
    borderColor: "#9ca3af",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  backButtonText: {
    color: "#4b5563",
    fontSize: 16,
    fontWeight: "600",
  },
});

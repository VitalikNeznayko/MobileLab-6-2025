import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Помилка входу", error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return Alert.alert("Введи email для скидання паролю");
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Лист зі скиданням паролю надіслано");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Увійти" onPress={handleLogin} color="#4CAF50" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Зареєструватися"
          onPress={() => navigation.navigate("Register")}
          color="#2196F3"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Забув пароль"
          onPress={handleResetPassword}
          color="#FF9800"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
});

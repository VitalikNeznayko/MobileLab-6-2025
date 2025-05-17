import { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: "",
        age: "",
        city: "",
      });

      Alert.alert("Успішна реєстрація");
      navigation.navigate("Login");
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
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Зареєструватися"
          onPress={handleRegister}
          color="#2196F3"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Вже є акаунт? Увійти"
          onPress={() => navigation.navigate("Login")}
          color="#757575"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

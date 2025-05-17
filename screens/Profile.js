import { useContext, useEffect, useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { AuthContext } from "../AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setAge(data.age);
          setProfession(data.profession);
        }
      } catch (error) {
        Alert.alert("Помилка при завантаженні профілю", error.message);
      }
    };

    fetchData();
  }, [user.uid]);

  const handleUpdate = async () => {
    try {
      const updatedData = {};
      if (name.trim() !== "") updatedData.name = name;
      if (age.trim() !== "") updatedData.age = age;
      if (profession.trim() !== "") updatedData.profession = profession;

      if (Object.keys(updatedData).length === 0) {
        Alert.alert("Введіть хоча б одне значення для оновлення");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), updatedData);
      Alert.alert("Профіль оновлено");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  const handleDelete = async () => {
    if (!password) {
      Alert.alert("Введи пароль для підтвердження");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      Alert.alert("Акаунт видалено");
    } catch (error) {
      Alert.alert("Помилка при видаленні", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Помилка при виході", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Імʼя:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Введіть своє ім'я"
      />

      <Text style={styles.label}>Вік:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Введіть свій вік"
      />

      <Text style={styles.label}>Професія:</Text>
      <TextInput
        style={styles.input}
        value={profession}
        onChangeText={setProfession}
        placeholder="Введіть професію"
      />

      <View style={styles.buttonWrapper}>
        <Button
          title="Оновити профіль"
          onPress={handleUpdate}
          color="#4CAF50"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Вийти" onPress={handleLogout} color="#757575" />
      </View>

      <View style={styles.deleteSection}>
        <Text style={styles.label}>
          Для видалення акаунта підтвердіть свій пароль:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.buttonWrapper}>
          <Button
            title="Видалити акаунт"
            onPress={handleDelete}
            color="#f44336"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonWrapper: {
    marginBottom: 15,
  },
  deleteSection: {
    marginTop: 40,
  },
});

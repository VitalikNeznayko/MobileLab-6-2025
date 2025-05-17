import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTTnUEnmTMbXTcwl1MiHsag4Pqqrllw3k",
  authDomain: "mobilelab4-15ad9.firebaseapp.com",
  projectId: "mobilelab4-15ad9",
  storageBucket: "mobilelab4-15ad9.firebasestorage.app",
  messagingSenderId: "1037748700546",
  appId: "1:1037748700546:web:028c9318125bf7dd4d3b9b",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

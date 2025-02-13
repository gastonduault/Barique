import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { Capacitor } from "@capacitor/core";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCpl7d07qzmKBqZjt8ZMMwgAG1c8bL8koQ",
  authDomain: "barique-c0e3a.firebaseapp.com",
  projectId: "barique-c0e3a",
  storageBucket: "barique-c0e3a.firebasestorage.app",
  messagingSenderId: "97526311048",
  appId: "1:97526311048:web:45ca1b8f589e99e846173d",
  measurementId: "G-2FQXXCZ84V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Fonction d'authentification avec Google
const signInWithGoogle = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      await signInWithRedirect(auth, provider);  // Redirection pour mobile
    } else {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    }
  } catch (error) {
    console.error("Erreur de connexion Google :", error);
  }
};

// Fonction de déconnexion
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
  }
};

export { auth, signInWithGoogle, logout };

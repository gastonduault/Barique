import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Capacitor } from "@capacitor/core";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

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

// Fonction d'authentification Google avec récupération du token Firebase
const signInWithGoogle = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      await GoogleAuth.initialize({
        clientId: "97526311048-tmiibfki5o5plfcjel513b0n4a5qan0e.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        grantOfflineAccess: true,
      });

      const response = await GoogleAuth.signIn();
      return {
        email: response.email,
        uid: response.id,
        nom: response.displayName,
        profile_picture: response.imageUrl,
        getIdToken: async () => response.authentication.idToken // Récupérer le token Firebase
      };
    } else {
      const result = await signInWithPopup(auth, provider);
      return {
        email: result.user.email,
        uid: result.user.uid,
        nom: result.user.displayName,
        profile_picture: result.user.photoURL,
        getIdToken: () => result.user.getIdToken() // Fonction pour récupérer le token Firebase
      };
    }
  } catch (error) {
    console.error("Erreur de connexion Google :", error);
    return null;
  }
};

// Fonction de déconnexion
const logout = async () => {
  try {
    await signOut(auth);
    if (Capacitor.isNativePlatform()) {
      await GoogleAuth.signOut();
    }
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
  }
};

export { auth, signInWithGoogle, logout, provider };

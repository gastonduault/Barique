import { initializeApp } from "firebase/app";
import { Capacitor } from "@capacitor/core";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithCredential } from "firebase/auth";


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

// Google auth with token firebase
const signInWithGoogle = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      await GoogleAuth.initialize({
        clientId: "97526311048-tmiibfki5o5plfcjel513b0n4a5qan0e.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        grantOfflineAccess: true,
      });

      const response = await GoogleAuth.signIn();

      const idTokenGoogle = response.authentication.idToken;

      // 💥 Nouvelle étape ici : on crée un credential Firebase avec le token Google
      const credential = GoogleAuthProvider.credential(idTokenGoogle);

      // 💥 On se connecte à Firebase avec ce credential
      const result = await signInWithCredential(auth, credential);

      // ✅ On récupère le vrai token Firebase (compatible avec auth.verify_id_token())
      const firebaseIdToken = await result.user.getIdToken();

      return {
        email: result.user.email,
        uid: result.user.uid,
        nom: result.user.displayName,
        profile_picture: result.user.photoURL,
        getIdToken: async () => firebaseIdToken
      };
    } else {
      const result = await signInWithPopup(auth, provider);
      return {
        email: result.user.email,
        uid: result.user.uid,
        nom: result.user.displayName,
        profile_picture: result.user.photoURL,
        getIdToken: () => result.user.getIdToken()
      };
    }
  } catch (error) {
    console.error("Erreur de connexion Google :", error);
    return null;
  }
};

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

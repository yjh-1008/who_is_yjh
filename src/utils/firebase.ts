import { initializeApp } from "firebase/app";
import firebaseConfig from "@/utils/firebaseConfig";
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";

initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };

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
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { auth, db };

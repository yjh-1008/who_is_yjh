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
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const database = getDatabase();
const auth = getAuth();
export { auth, db, storage, database };

import { initializeApp } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getDatabase } from "firebase/database";
import { ref, set, get } from "firebase/database";
const app = initializeApp();
const db = getFirestore();
export { app, db };

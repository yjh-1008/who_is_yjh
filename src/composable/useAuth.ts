import { ref, computed } from "vue";
import { auth } from "@/utils/firebase";
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";

export const firebaseUser = ref<User | null>(null);
const provider = new GoogleAuthProvider();
export const isSigned = computed(() => firebaseUser.value !== null);
export const useAuth = onAuthStateChanged(auth, (user) => {
  firebaseUser.value = user;
});

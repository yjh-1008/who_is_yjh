<template>
  <v-btn
    :icon="store.getters.getAuthState ? 'mdi-logout' : 'mdi-account'"
    size="large"
    @click="store.getters.getAuthState ? fsSignOut() : signIn()"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import {
  signInWithPopup,
  signOut,
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
const store = useStore();
const firebaseUser = ref<User | null>(null);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  firebaseUser.value = user;
  store.commit("setAuthState", user);
});
const provider = new GithubAuthProvider();
provider.setCustomParameters({
  allow_signup: "false",
});
const signIn = async () => {
  await signInWithPopup(auth, provider).catch((err) => {
    alert("에러 : " + err.message);
  });
};
const fsSignOut = () => {
  signOut(auth);
};
</script>

<template>
  <v-icon
    size="large"
    :icon="store.getters.getAuthState ? 'mdi-logout' : 'mdi-account'"
    @click="store.getters.getAuthState ? fsSignOut() : signIn()"
  />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
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
  console.log(firebaseUser.value);
  store.commit("setAuthState", user);
});
const provider = new GithubAuthProvider();
provider.setCustomParameters({
  allow_signup: "false",
});
const signIn = async () => {
  console.log("here");
  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      alert("에러 : " + err.message);
    });
};
const fsSignOut = () => {
  console.log("here");
  signOut(auth);
};
</script>

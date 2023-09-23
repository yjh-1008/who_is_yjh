<template>
  <v-icon
    size="large"
    v-if="firebaseUser"
    icon="mdi-account"
    @click="signOut(auth)"
  />
  <v-icon size="large" v-else icon="mdi-login" @click="signIn" />
</template>
<script setup lang="ts">
import firebaseConfig from "@/utils/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
  signInWithEmailAndPassword,
  GithubAuthProvider,
} from "firebase/auth";
import { useAuth, firebaseUser } from "@/composable/useAuth";
const auth = getAuth();
useAuth();
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
</script>

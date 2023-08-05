<template>
  <v-app>
    <v-main>
      <HeaderSection />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<script setup lang="ts">
import HeaderSection from "./components/HeaderSection.vue";
</script>

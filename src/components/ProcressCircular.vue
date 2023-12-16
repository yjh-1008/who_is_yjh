<template>
  <v-overlay
    :model-value="store.getters.getLoadingState"
    class="align-center justify-center"
  >
    <v-progress-circular
      :size="50"
      color="#82B1FF"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore();
</script>

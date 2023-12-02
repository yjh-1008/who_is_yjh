<template>
  <v-infinite-scroll ref="infinite" height="500" side="both">
    <div>
      <template v-for="card in cards" :key="card">
        <ProjectCard />
      </template>
    </div>
  </v-infinite-scroll>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import ProjectCard from "./ProjectCard.vue";
const size: Ref<number> = ref(300);
const virtualLength: Ref<number> = ref(10);
const cards: Ref<number[]> = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
</script>

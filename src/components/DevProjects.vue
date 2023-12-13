<template>
  <template v-for="project in props.projects" :key="project.title">
    <v-card style="overflow-y: auto">
      <ProjectCard :project="project" />
    </v-card>
  </template>
</template>

<script setup lang="ts">
import ProjectCard from "./ProjectCard.vue";
import { Dp } from "@/utils/types";
const props = defineProps<{
  projects: Dp[];
}>();
//life cycle
//method
</script>

<style>
.uploadBtn {
  position: absolute !important;
  z-index: 999;
  bottom: 50px;
  right: 50px;
}
.loadBtn {
  position: absolute !important;
  z-index: 999;
  bottom: 50px;
  right: 130px;
}
</style>

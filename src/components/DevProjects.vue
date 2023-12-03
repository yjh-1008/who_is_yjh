<template>
  <v-infinite-scroll ref="infinite" height="500" side="both">
    <div>
      <template v-for="card in cards" :key="card">
        <template v-for="project in projects" :key="project.title">
          <ProjectCard :project="project" />
        </template>
      </template>
    </div>
  </v-infinite-scroll>
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeMount } from "vue";
import ProjectCard from "./ProjectCard.vue";
import { getProjects } from "@/models/pofolCard";
import { Project } from "@/utils/types";
import GithubStacks from "@/components/GithubStacks.vue";
const size: Ref<number> = ref(300);
const virtualLength: Ref<number> = ref(10);
const cards: Ref<number[]> = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const projects: Ref<Project[]> = ref([]);
const qs = ref();
//life cycle
onBeforeMount(async () => {
  await load();
});

//method
const load = async () => {
  const querySnapshot = await getProjects(qs.value);
  qs.value = querySnapshot.docs;
  // console.log(querySnapshot);
  // if (querySnapshot.docs.length < 6) disabled.value = true;

  querySnapshot.docs.forEach(async (d) => {
    console.log(d.data());
    projects.value.unshift(d.data());
  });
};
</script>

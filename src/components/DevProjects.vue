<template>
  <v-btn
    v-if="store.getters.getAuthState"
    class="uploadBtn"
    icon="mdi-plus"
    color="blue-grey-darken-1"
    @click="dialog = true"
  ></v-btn>
  <template v-for="project in projects" :key="project.title">
    <v-card height="90vh" style="overflow-y: auto">
      <ProjectCard :project="project" />vm
      <v-card v-intersect="load"></v-card>
    </v-card>
  </template>
  <UploadProjectDialog
    :modelValue="dialog"
    @update:modelValue="(val) => (dialog = val)"
  />
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeMount } from "vue";
import ProjectCard from "./ProjectCard.vue";
import { getProjects } from "@/models/pofolCard";
import { Project } from "@/utils/types";
import { useStore } from "vuex";
import UploadProjectDialog from "./UploadProjectDialog.vue";
import GithubStacks from "@/components/GithubStacks.vue";
const size: Ref<number> = ref(300);
const virtualLength: Ref<number> = ref(10);
const projects: Ref<Project[]> = ref([]);
const qs = ref();
const disabled = ref<boolean>(false);
const store = useStore();
const dialog: Ref<boolean> = ref(false);
//life cycle
onBeforeMount(async () => {
  await load();
});

//method
const load = async () => {
  console.log("here");
  if (disabled.value) return;
  const querySnapshot = await getProjects(qs.value);
  qs.value = querySnapshot.docs;
  console.log(querySnapshot.docs.length);
  if (querySnapshot.docs.length < 2) disabled.value = true;
  // console.log(querySnapshot);
  // if (querySnapshot.docs.length < 6) disabled.value = true;

  querySnapshot.docs.forEach(async (d) => {
    console.log(d.data());
    projects.value.unshift(d.data());
  });
};
</script>

<style>
.uploadBtn {
  position: absolute !important;
  z-index: 999;
  bottom: 50px;
  right: 50px;
}
</style>

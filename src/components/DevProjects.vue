<template>
  <v-btn
    v-if="store.getters.getAuthState"
    class="uploadBtn"
    icon="mdi-plus"
    color="blue-grey-darken-1"
    @click="dialog = true"
  />
  <v-btn
    v-if="store.getters.getAuthState"
    class="loadBtn"
    icon="mdi-more"
    color="blue-grey-darken-1"
    :disabled="disabled"
    @click="load"
  />
  <template v-for="project in projects" :key="project.title">
    <v-card style="overflow-y: auto">
      <ProjectCard :project="project" />
    </v-card>
  </template>

  <UploadProjectDialog
    :modelValue="dialog"
    @update:modelValue="(val) => (dialog = val)"
  />
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import ProjectCard from "./ProjectCard.vue";
import { getProjects } from "@/models/pofolCard";
import { Dp } from "@/utils/types";
import { useStore } from "vuex";
import UploadProjectDialog from "./UploadProjectDialog.vue";
import GithubStacks from "@/components/GithubStacks.vue";
import { setImage } from "@/models/image";
const size: Ref<number> = ref(300);
const virtualLength: Ref<number> = ref(10);
const projects: Ref<Dp[]> = ref([]);
const qs = ref();
const disabled = ref<boolean>(false);
const store = useStore();
const dialog: Ref<boolean> = ref(false);
//life cycle
onMounted(async () => {
  await load();
});

//method
const load = async () => {
  if (disabled.value) return;
  const querySnapshot = await getProjects(qs.value);
  qs.value = querySnapshot.docs;
  console.log(querySnapshot.docs.length);
  querySnapshot.docs.forEach(async (d) => {
    projects.value.unshift(d.data());
  });
  if (querySnapshot.docs.length < 2) disabled.value = true;
};

const onClick = async () => {
  if (store.getters.getAuthState) dialog.value = true;
  else await load();
};
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

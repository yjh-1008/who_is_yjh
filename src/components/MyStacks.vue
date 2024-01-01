<template>
  <template v-for="project in props.record" :key="project.title">
    <v-card style="overflow-y: auto">
      <ProjectCard :project="project" />
    </v-card>
  </template>
</template>

<script setup lang="ts">
import MyCareer from "@/components/MyCareer.vue";
import { ref, Ref, onBeforeMount } from "vue";
import { Record } from "@/utils/types";
import { getRecord } from "@/models/record";
import ProjectCard from "./ProjectCard.vue";
const props = defineProps<{
  record: Record[];
}>();
const qs = ref();
const record: Ref<Record[]> = ref([]);
// onBeforeMount(async () => {
//   await load();
// });

// const load = async () => {
//   const querySnapshot = await getRecord(qs.value);
//   qs.value = querySnapshot.docs;
//   querySnapshot.docs.forEach((d) => {
//     record.value.unshift(d.data());
//   });
// };
</script>

<style script>
.container {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  height: fit-content;
}

@media (max-width: 1500px) {
  .container {
    display: grid;

    grid-template-columns: 1fr 1fr;
    height: fit-content;
  }
}
</style>

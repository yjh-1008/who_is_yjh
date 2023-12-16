<template>
  <div class="container mx-auto px-16 w-100">
    <template v-for="r in props.record" :key="r.title">
      <MyCareer :data="r" />
    </template>
  </div>
</template>

<script setup lang="ts">
import MyCareer from "@/components/MyCareer.vue";
import { ref, Ref, onBeforeMount } from "vue";
import { Record } from "@/utils/types";
import { getRecord } from "@/models/record";
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

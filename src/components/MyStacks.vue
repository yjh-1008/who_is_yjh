<template>
  <div class="d-flex flex-column">
    <template v-for="r in record" :key="r.title">
      <MyCareer :data="r" />
    </template>
    <!-- <MyCareer /> -->
  </div>
</template>

<script setup lang="ts">
import MyBadges from "@/components/MyBadges.vue";
import MyCareer from "@/components/MyCareer.vue";
import { ref, Ref, onBeforeMount } from "vue";
import { Record } from "@/utils/types";
import process from "process";
import { getRecord } from "@/models/record";
const pofolUrl = "https://www.notion.so/797e20874e794772b38b0ff3bf1ac90d?pvs=4";
const careers: Ref<Record[]> = ref([]);
const qs = ref();
const record: Ref<Record[]> = ref([]);
onBeforeMount(async () => {
  const querySnapshot = await getRecord(qs.value);
  qs.value = querySnapshot.docs;
  querySnapshot.docs.forEach((d) => {
    record.value.unshift(d.data());
  });
  console.log(record.value);
});

const onClick = (url: string) => {
  window.document.location = url;
};
</script>

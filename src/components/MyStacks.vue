<template>
  <div class="d-flex flex-column">
    <!-- <v-btn
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
    /> -->
    <template v-for="r in props.record" :key="r.title">
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
import { useStore } from "vuex";
import { getRecord } from "@/models/record";
const props = defineProps<{
  record: Record[];
}>();
const pofolUrl = "https://www.notion.so/797e20874e794772b38b0ff3bf1ac90d?pvs=4";
const careers: Ref<Record[]> = ref([]);
const qs = ref();
const record: Ref<Record[]> = ref([]);
onBeforeMount(async () => {
  await load();
});

const load = async () => {
  const querySnapshot = await getRecord(qs.value);
  qs.value = querySnapshot.docs;
  querySnapshot.docs.forEach((d) => {
    record.value.unshift(d.data());
  });
};

const onClick = (url: string) => {
  window.document.location = url;
};
</script>

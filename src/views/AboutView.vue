<template>
  <div class="d-flex loadBtn">
    <v-btn
      v-if="store.getters.getAuthState"
      class="my-3"
      icon="mdi-plus"
      color="blue-grey-darken-1"
      @click="openDialog"
    />
    <v-btn
      icon="mdi-more"
      color="blue-grey-darken-1"
      :disabled="disabled"
      @click="onLoad"
    />
  </div>

  <v-window v-model="windows" show-arrows>
    <v-window-item :value="0">
      <DevProjects :projects="projects" />
    </v-window-item>

    <v-window-item :key="1">
      <MyStacks :record="record" />
    </v-window-item>
  </v-window>
  <UploadProjectDialog
    :modelValue="projectDialog"
    @update:modelValue="(val:boolean) => (projectDialog = val)"
  />
  <UploadRecordDialog
    :windows="windows"
    :modelValue="recordDialog"
    @update:modelValue="(val:boolean) => (recordDialog = val)"
  />
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getProjects } from "@/models/pofolCard";
import { getRecord } from "@/models/record";
import { getProfile } from "@/models/pofol";
import DevProjects from "@/components/DevProjects.vue";
import { Record, Dp } from "@/utils/types";
import MyStacks from "@/components/MyStacks.vue";
import UploadProjectDialog from "@/components/UploadProjectDialog.vue";
import UploadRecordDialog from "@/components/UploadRecordDialog.vue";
import { QuerySnapshot } from "firebase-admin/firestore";
const store = useStore();
const windows = ref(0);
const pdf = ref();
const disabled = ref<boolean>(false);
const projectDialog: Ref<boolean> = ref(false);
const recordDialog: Ref<boolean> = ref(false);
const projects: Ref<Dp[]> = ref([]);
const record: Ref<Record[]> = ref([]);
const qs = ref();

//method
const load = async () => {
  if (disabled.value) return;
  await getProjects(qs.value).then((querySnapshot) => {
    qs.value = querySnapshot.docs;
    querySnapshot.docs.forEach(async (d) => {
      projects.value.unshift(d.data());
    });
    if (querySnapshot.docs.length < 2) disabled.value = true;
  });
};

const onRecordLoad = async () => {
  if (disabled.value) return;
  const querySnapshot = await getRecord(qs.value);
  qs.value = querySnapshot.docs;
  querySnapshot.docs.forEach((d) => {
    record.value.unshift(d.data());
  });
  if (querySnapshot.docs.length < 2) disabled.value = true;
};
const onLoad = async () => {
  store.commit("setLoadingState", true);
  if (windows.value) await onRecordLoad();
  else await load();
  store.commit("setLoadingState", false);
};
watch(
  () => windows.value,
  (c) => {
    disabled.value = false;
    qs.value = undefined;
    projects.value = [];
    record.value = [];
    onLoad();
  },
  { immediate: true }
);

const openDialog = () => {
  if (windows.value) recordDialog.value = true;
  else projectDialog.value = true;
};
</script>
<style scoped>
.github_commits {
  float: left;
  width: 100%;
  max-width: 963px;
  max-height: 154px !important;
}

img {
  width: 200px;
  height: 250px;
}
</style>

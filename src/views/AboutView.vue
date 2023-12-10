<template>
  <v-window v-model="windows" show-arrows>
    <v-window-item :value="0">
      <DevProjects />
    </v-window-item>

    <v-window-item :key="1">
      <MyStacks />
    </v-window-item>
  </v-window>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { getProfile } from "@/models/pofol";
import DevProjects from "@/components/DevProjects.vue";
import MyStacks from "@/components/MyStacks.vue";
const store = useStore();
const windows = ref(-1);
const pdf = ref();
// onMounted(async () => {});
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

<template>
  <v-overlay v-if="!content" />
  <template v-else>
    <v-card density="comfortable" class="mx-auto w-100 viewer-title">
      <v-card-title>
        <div class="d-flex justify-center">
          <div class="title w-50">
            <v-text-field :value="content.title" readonly>
              <template v-slot:append>
                <v-btn v-if="authState" @click="onModify" size="large">
                  수정
                </v-btn>
              </template>
            </v-text-field>
          </div>
        </div>
      </v-card-title>
      <v-card-subtitle>
        <div class="w-50 mx-auto">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
              <v-expansion-panel-text>
                <div>카테고리: {{ content.category }}</div>
                <v-chip-group>
                  <v-chip v-for="chip in content.tags" :key="chip">{{
                    chip
                  }}</v-chip>
                </v-chip-group>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card-subtitle>

      <TuiViewer :content="(content.postContent as string)" />
    </v-card>
  </template>

  <v-btn></v-btn>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { getPost } from "@/models/content";
import { Content } from "@/utils/types";
import TuiViewer from "./editor/TuiViewer.vue";
import { useStore } from "vuex";

const store = useStore();
const authState = computed(() => store.getters.getAuthState);
const props = defineProps<{
  id: string;
}>();
const content = ref<Content | null>();

onMounted(async () => {
  console.log(props.id);
  return getPost(props.id).then((data) => {
    // console.log(data);
    content.value = data;
  });
});

const onModify = () => {
  console.log("modify");
};
</script>

<style>
.viewer-title {
  text-align: center;
}
.title {
  width: 500px;
}
</style>

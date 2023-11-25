<template>
  <v-overlay v-if="!content" />
  <template v-else>
    <v-card density="comfortable" fill-height class="mx-auto w-100">
      <v-card-title>
        <div class="d-flex justify-center">
          <div class="title w-100 mx-auto">
            <div class="title-text py-3">
              {{ content.title }}
            </div>
            <div class="date">
              {{ date }}
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-subtitle>
        <div class="w-100 mb-3 mx-auto">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title
                ><div>카테고리: {{ content.category }}</div>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="d-flex">
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
    </v-card>
    <TuiViewer :content="(content.postContent as string)" />
  </template>
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
const date = ref<string>();
onMounted(async () => {
  return getPost(props.id).then((data) => {
    if (data.createdAt !== null || data.createdAt !== undefined) {
      date.value = `${data.createdAt?.getFullYear()}년 ${data.createdAt?.getMonth()} 월 ${data.createdAt?.getDate()}일`;
    }
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
  width: 100%;
  border: 1px solid #d3d3d3;
  min-height: 100px;
  padding: 1%;
}
.title-text {
  font-weight: bold;
  font-size: 2rem;
}

.date {
  color: #d3d3d3;
  font-size: 1rem;
}

.v-expansion-panel-text {
  background-color: lightgray;
}
</style>

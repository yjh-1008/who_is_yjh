<template>
  <v-overlay v-if="!content" />
  <template v-else>
    <v-card density="comfortable" fill-height class="mx-auto w-100">
      <v-card-title>
        <div class="d-flex justify-center">
          <div class="title w-100 mx-auto">
            <div class="title-text">
              {{ content.title }}
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-subtitle>
        <div class="w-100 my-4 mx-auto">
          <v-expansion-panels>
            <v-expansion-panel bg-color="grey-lighten-1">
              <v-expansion-panel-title class="text-h5" color="grey-lighten-1">
                <div style="color: black; font-weight: 600">상세보기</div>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="d-flex">
                <div class="text-h6 subtitle">
                  카테고리: {{ content.category }}
                </div>
                <v-chip-group>
                  <v-chip
                    v-for="chip in content.tags"
                    :key="chip"
                    class="mx-5"
                    variant="elevated"
                    color="indigo"
                    >{{ chip }}</v-chip
                  >
                </v-chip-group>
                <div class="text-h6 subtitle">업로드 일자</div>
                <div class="date">
                  {{ date }}
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card-subtitle>
    </v-card>
    <TuiViewer :content="(content.postContent as string)" class="px-5" />
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
  min-height: 100px;
  padding: 1.5%;
  border: 1px solid #d3d3d3;
  box-shadow: 5px 5px 5px lightgray;
  border-radius: 10px;
}
.title-text {
  font-weight: bold;
  font-size: 2rem;
  white-space: normal;
}

.subtitle {
  color: black;
  font-weight: bold;
}

.v-chip {
  background-color: #fafafa;
  color: black;
}
</style>

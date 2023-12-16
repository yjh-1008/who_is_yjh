<template>
  <v-card
    :loading="loading"
    class="mx-auto my-6"
    width="70%"
    max-height="300px"
    min-height="200px"
    elevation="6"
  >
    <v-container class="pa-0">
      <v-row>
        <v-col cols="3" md="5">
          <v-img
            cover
            height="500px"
            width="100%"
            :src="props.project.tumbnail"
          ></v-img>
        </v-col>
        <v-col class="mt-4">
          <v-card-item>
            <v-card-title class="d-flex align-center"
              ><div class="text-h4">
                {{ props.project.title }}
              </div>
              <v-icon
                icon="mdi-github"
                class="ml-auto"
                @click="() => onLinkClick(project.githubLink)"
              />
            </v-card-title>

            <v-card-subtitle>
              <span
                >{{ dateFormatter(props.project.sttDtti) }} ~
                {{ dateFormatter(props.project.endDtti) }}</span
              >
            </v-card-subtitle>
          </v-card-item>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-text
            style="height: 300px; overflow-y: auto"
            class="px-4 pa-2"
          >
            <div style="line-height: 1.3rem; font-size: 1rem">
              {{ project.content }}
            </div>
          </v-card-text>
          <div>
            <v-chip
              class="mx-2"
              size="small"
              label
              v-for="(tag, i) in props.project.tags"
              :key="`${tag}_${i}`"
              >{{ tag }}</v-chip
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { Dp } from "@/utils/types";
import { dateFormatter } from "@/utils/dateFormatter";
const props = defineProps<{
  project: Dp;
}>();
const loading: Ref<boolean> = ref(false);
const selection: Ref<number> = ref(1);
// const height: Ref<number> = ref("40vh");

const onLinkClick = (link: string) => {
  window.location.href = link;
};
</script>

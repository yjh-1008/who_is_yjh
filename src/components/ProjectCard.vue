<template>
  <v-card :loading="loading" class="mx-auto my-12" width="70%" height="40vh">
    <v-container>
      <v-row>
        <v-col>
          <v-img
            cover
            height="40vh"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
        </v-col>
        <v-col class="mt-4">
          <v-card-item>
            <v-card-title
              ><div class="text-h3">
                {{ props.project.title }}
              </div></v-card-title
            >

            <v-card-subtitle>
              <span class="me-1">{{ props.project.sttDtti }}</span>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div>
              {{ project.content }}
            </div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <div class="px-4">
            <!-- <v-chip
              class="mb-6 mt-2"
              size="small"
              label
              v-for="(tag, i) in props.project.tags"
              :key="`${tag}_${i}`"
              >{{ tag }}</v-chip
            > -->
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { Project } from "@/utils/types";
const props = defineProps<{
  project: Project;
}>();
const loading: Ref<boolean> = ref(false);
const selection: Ref<number> = ref(1);
// const height: Ref<number> = ref("40vh");
</script>

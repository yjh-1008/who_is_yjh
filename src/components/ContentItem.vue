<template>
  <div v-if="!content">error</div>
  <template v-else>
    <div>{{ content.postContent }}</div>
  </template>

  <v-btn></v-btn>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPost } from "@/models/content";
import { Content } from "@/utils/types";
const props = defineProps<{
  id: string;
}>();
const content = ref<Content | null>();

onMounted(async () => {
  return getPost(props.id).then((data) => {
    content.value = data;
  });
});
</script>

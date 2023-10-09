<template>
  <div>
    <div v-if="!post">null</div>
    <v-card v-else>
      <EditContent :id="id" :title="post.title" :text="post.text" />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Content } from "@/utils/types";
import { ref, onMounted } from "vue";
import { getPost } from "@/models/content";
import EditContent from "@/views/EditContent.vue";
const props = defineProps<{
  id: string;
}>();
const post = ref<Content | null>();
onMounted(() => {
  return getPost(props.id).then((data) => {
    post.value = data;
  });
});
</script>

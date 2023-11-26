<template>
  <div>
    <LoadingOverlay :modelValue="loading" />
    <v-card v-if="post">
      <EditContent
        :id="props.id"
        :title="post.title || ''"
        :text="post.postContent || ''"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Content } from "@/utils/types";
import { ref, onMounted } from "vue";
import { getPost } from "@/models/content";
import EditContent from "@/views/EditContent.vue";
import { computed } from "vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
const props = defineProps<{
  id: string;
}>();
const post = ref<Content | null>();
const loading = computed(() => post.value === undefined);
onMounted(async () => {
  return getPost(props.id).then((data): void => {
    post.value = data;
  });
});
</script>

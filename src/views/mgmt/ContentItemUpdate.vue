<template>
  <div>
    <v-overlay v-model="loading" class="align-center justify-center">
      <v-progress-circular
        color="blue"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
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

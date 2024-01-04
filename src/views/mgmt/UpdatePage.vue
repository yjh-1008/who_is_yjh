<template>
  <div>
    <ContentItemUpdate :id="id" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { getPosts, updatePost } from "@/models/content";
import ContentItemUpdate from "./ContentItemUpdate.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const id = computed(() => route.params.id as string);

onMounted(() => {
  store.commit("setLoadingState", false);
});
</script>

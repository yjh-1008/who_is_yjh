<template>
  <ContentItem :id="id" />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ContentItem from "@/components/ContentItem.vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => store.commit("setLoadingState", false));
const route = useRoute();
const id = computed<string>(() => {
  return route.params.id as string;
});
</script>

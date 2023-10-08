<template>
  <ContentItem :id="id" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ContentItem from "@/components/ContentItem.vue";
const route = useRoute();
const id = computed(() => {
  return route.params.id;
});
</script>

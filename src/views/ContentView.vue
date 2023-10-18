<template>
  <ContentItem :id="id" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ContentItem from "@/components/ContentItem.vue";
const route = useRoute();
const id = computed<string>(() => {
  return route.params.id as string;
});
</script>

<template>
  <div>{{ id }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const id = computed(() => {
  return route.params.id;
});
</script>

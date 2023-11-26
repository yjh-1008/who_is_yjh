<template>
  <div>
    <ContentItemUpdate :id="id" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getPosts, updatePost } from "@/models/content";
import ContentItemUpdate from "./ContentItemUpdate.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = computed(() => route.params.id as string);
</script>

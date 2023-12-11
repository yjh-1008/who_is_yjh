<template>
  <div class="d-flex flex-column">
    <MyCareer />
    <MyCareer />
    <MyCareer />
    v
  </div>
</template>

<script setup lang="ts">
import MyBadges from "@/components/MyBadges.vue";
import MyCareer from "@/components/MyCareer.vue";
import process from "process";
const pofolUrl = "https://www.notion.so/797e20874e794772b38b0ff3bf1ac90d?pvs=4";
const onClick = (url: string) => {
  window.document.location = url;
};
</script>

<template>
  <v-app>
    <CustomSidebar />
    <v-main class="content-view">
      <HeaderSection />
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<script setup lang="ts">
import CustomSidebar from "@/components/CustomSidebar.vue";
import HeaderSection from "./components/HeaderSection.vue";
</script>

<style>
.content-view {
  margin-left: 290px;
}
</style>

<!-- //-->

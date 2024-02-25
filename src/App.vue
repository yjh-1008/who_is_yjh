<template>
  <v-app>
    <CustomSidebar />
    <AlertDialog />
    <ProcressCircular />
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
import AlertDialog from "./components/AlertDialog.vue";
import ProcressCircular from "./components/ProcressCircular.vue";
</script>

<style>
.content-view {
  margin-left: 290px;
}
.ml-line {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3 !important;
  overflow: hidden;
}
</style>

<!-- //-->

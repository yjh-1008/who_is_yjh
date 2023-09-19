<template>
  <div class="d-flex align-center my-10">
    <v-sheet class="flex-1-0">
      <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    </v-sheet>
    <v-sheet class="flex-1-0">
      <v-text-field
        class="mr-10 w-25 ml-auto"
        v-model="searchText"
        label="검색"
        variant="solo"
        rounded
        filled
        single-line
        hide-details
        append-inner-icon="mdi-magnify"
        placeholder="검색"
      ></v-text-field>
    </v-sheet>
    <v-sheet class="mr-10">
      <AuthBtn />
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import AuthBtn from "@/AuthBtn.vue";
const searchText = ref("");
const items = reactive([
  {
    title: "Dashboard",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Link 1",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
  {
    title: "Link 2",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
]);
</script>

<style>
.my-input.v-input .v-input__slot {
  border-radius: 25%;
}
</style>

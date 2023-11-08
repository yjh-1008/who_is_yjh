<template>
  <div class="d-flex align-center mt-10">
    <v-sheet class="flex-1-0">
      <div class="d-flex w-25 align-start ml-10">
        <v-select
          v-model="searchTp"
          label="Select"
          variant="outlined"
          :items="categories"
          item-title="text"
          item-value="val"
          return-object
        ></v-select>
        <v-text-field
          class="ml-10"
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
      </div>
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

const categories = ref([
  {
    text: "카테고리",
    val: "category",
  },
  {
    text: "제목",
    val: "title",
  },
]);
const searchTp = ref(categories.value[0]);
</script>

<style>
.my-input.v-input .v-input__slot {
  border-radius: 25%;
}
.v-text-field {
  width: 400px;
}

.v-select {
  width: 20px;
}
</style>

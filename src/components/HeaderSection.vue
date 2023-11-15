<template>
  <div class="d-flex align-start mt-10">
    <v-sheet class="flex-1-0">
      <div class="d-flex w-25 align-start ml-5">
        <v-select
          v-model="searchTp"
          density="comfortable"
          variant="solo"
          :items="categories"
          item-title="text"
          item-value="val"
          bg-color="grey-lighten-2"
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
          @keydown.enter="onSearch"
          placeholder="검색"
        >
          <template v-slot:append-inner>
            <v-icon icon="mdi-magnify" @click="onSearch" size="x-large" />
          </template>
        </v-text-field>
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
import { useRouter } from "vue-router";
const searchText = ref("");
const router = useRouter();
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

const onSearch = () => {
  router.push(`/search/${searchTp.value.val}/${searchText.value}`);
  searchText.value = "";
};
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

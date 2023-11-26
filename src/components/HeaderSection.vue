<template>
  <div class="d-flex align-start mt-11">
    <v-sheet class="flex-1-0">
      <div class="d-flex w-100 align-start px-4">
        <v-responsive max-width="200">
          <v-select
            class="prepend_select"
            v-model="searchTp"
            density="comfortable"
            variant="solo"
            :items="categories"
            item-title="text"
            item-value="val"
            bg-color="grey-lighten-2"
            return-object
          ></v-select>
        </v-responsive>
        <v-responsive class="mx-auto px-4" max-width="85%" height="70">
          <v-text-field
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
        </v-responsive>
        <v-sheet>
          <v-btn
            icon="mdi-file-document-edit"
            class="mr-4"
            size="large"
            @click="router.push({ name: '작성페이지' })"
            :disabled="!store.getters.getAuthState"
          >
          </v-btn>
        </v-sheet>
        <v-sheet class="mx-4">
          <AuthBtn />
        </v-sheet>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import AuthBtn from "@/AuthBtn.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const searchText = ref("");
const router = useRouter();
const store = useStore();
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

<style></style>

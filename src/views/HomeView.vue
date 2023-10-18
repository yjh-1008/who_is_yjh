<template>
  <div class="d-flex flex-column mb-6">
    <v-layout column class="fill-height w-100">
      <v-flex class="white--text green flex darken-3 ƒ-auto w-100">
        <ContentItems :contents="contents" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeView",
};
</script>

<script lang="ts" setup>
import { HomeContentType } from "@/utils/types";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ContentItems from "@/components/ContentItems.vue";
const router = useRouter();
const contents = ref<HomeContentType[]>([]);

// onBeforeMount(async () => {
//   await axios
//     .get(`${process.env.VUE_APP_BASE_URL}/public/posts/index.json`)
//     .then((res) => {
//       console.log(res);
//       contents.value = res.data;
//     });
// });
const showEssay = () => {
  router.push({
    path: "/essay",
  });
};
</script>

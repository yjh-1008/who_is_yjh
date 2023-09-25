<template>
  <div class="d-flex flex-column mb-6">
    <v-layout column class="fill-height w-100">
      <v-flex class="white--text green flex darken-3 ƒ-auto w-100">
        <HomeContentCard :contents="contents" />
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
import CustomCard from "@/components/CustomCard.vue";
import CustomTags from "@/components/CustomTags.vue";
import HomeContentType from "@/utils/types";
import { onBeforeMount, reactive, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import ProfileContainer from "./ProfileContainer.vue";
import HomeContentCard from "@/components/HomeContentCard.vue";
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

<style scoped>
.card-content {
  font-size: 18px;
  text-align: left;
  max-width: 350px;
  text-align: center;
}
</style>

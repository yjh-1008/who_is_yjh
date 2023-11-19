<template>
  <div class="d-flex flex-column mb-6" style="height: 85%">
    <v-layout column fill-height class="w-100">
      <div class="white--text green d-flex flex-column darken-3 ƒ-auto w-100">
        <ContentItems :contents="contents" />
      </div>
    </v-layout>
  </div>
  <v-pagination />
</template>

<script lang="ts">
export default {
  name: "HomeView",
};
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ContentItems from "@/components/ContentItems.vue";
import { getPosts, updatePost } from "@/models/content";
import { getPostContents } from "@/models/postContent";
const router = useRouter();
const page = ref(0);
const contents = ref<any[]>([]);
onMounted(async () => {
  const querySnapshot = await getPosts(page.value);
  querySnapshot.docs.forEach(async (d) => {
    let postContents = "";
    await getPostContents(d.data().id).then((res) => {
      res.forEach((v) => {
        const content = v.data().content;
        postContents += content;
      });
    });
    contents.value.push({ ...d.data(), text: postContents });
  });
});
const showEssay = () => {
  router.push({
    path: "/essay",
  });
};
</script>

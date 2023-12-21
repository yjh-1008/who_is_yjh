<template>
  <div class="d-flex flex-column mb-6">
    <div
      class="white--text green d-flex flex-column darken-3 ƒ-auto w-100"
      style="overflow-y: auto"
    >
      <ContentItems :contents="contents" />
    </div>
    <v-btn
      class="text-none mb-4 mx-auto"
      width="25%"
      color="blue-grey-darken-1"
      size="x-large"
      variant="flat"
      @click="add"
      :disabled="disabled"
      >더보기</v-btn
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeView",
};
</script>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import ContentItems from "@/components/ContentItems.vue";
import { getPosts, updatePost } from "@/models/content";
import { getPostContents } from "@/models/postContent";
import { useStore } from "vuex";
const router = useRouter();
const contents = ref<any[]>([]);
const disabled = ref<boolean>(true);
const store = useStore();
const qs = ref();
onBeforeMount(async () => {
  await add();
});
const add = async () => {
  store.commit("setLoadingState", true);
  const querySnapshot = await getPosts(qs.value);
  qs.value = querySnapshot.docs;
  disabled.value = querySnapshot.docs.length < 6;
  querySnapshot.docs.forEach(async (d) => {
    let postContents = "";
    await getPostContents(d.data().id).then((res) => {
      res.forEach((v) => {
        const content = v.data().content;
        postContents += content;
      });
    });
    contents.value.unshift({ ...d.data(), text: postContents });
  });
  store.commit("setLoadingState", false);
};
</script>

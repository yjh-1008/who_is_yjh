<template>
  <div class="d-flex flex-column mb-6">
    <div class="white--text green d-flex flex-column darken-3 ƒ-auto w-100">
      <ContentItems :contents="contents" />
      <v-btn
        class="text-none mb-4 mx-auto"
        :width="500"
        color="blue-grey-darken-1"
        size="x-large"
        variant="flat"
        @click="add"
        :disabled="disabled"
        >더보기</v-btn
      >
    </div>
  </div>
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
const disabled = ref<boolean>(false);
onMounted(async () => {
  await add();
});
const add = async () => {
  const querySnapshot = await getPosts(page.value);
  page.value += 1;
  if (querySnapshot.docs.length < 6) disabled.value = true;
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
};
</script>

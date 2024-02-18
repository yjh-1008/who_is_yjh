<template>
  <div class="white--text green d-flex flex-column darken-3 ƒ-auto w-100">
    <ContentItems :contents="contents" @refresh="onReload" />
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Content, PostContent } from "@/utils/types";
import ContentItem from "@/components/ContentItem.vue";
import { getFilterContents } from "@/models/content";
import ContentItems from "@/components/ContentItems.vue";
import { getPostContents } from "@/models/postContent";
const store = useStore();
const route = useRoute();
const id = computed<string>(() => {
  return route.params.id as string;
});
const type = computed<string>(() => {
  return route.params.type as string;
});
const disabled = ref<boolean>(true);
const qs: Ref<any[] | undefined> = ref();
const contents = ref<any[]>([]);
onMounted(async () => {
  await add();
});

const onReload = async () => {
  qs.value = undefined;
  await add();
};
watch(
  () => id.value,
  async (c) => {
    qs.value = undefined;
    contents.value = [];
    await add();
  }
);
const add = async () => {
  store.commit("setLoadingState", true);
  const querySnapshot = await getFilterContents(type.value, id.value, qs.value);
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

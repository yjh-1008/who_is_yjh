<template>
  <v-card
    v-for="doc in docs"
    class="ma-3"
    :key="doc.title"
    :to="`/content/${doc.title}`"
  >
    <div class="d-flex flex-no-wrap">
      <v-avatar size="125" rounded="0">
        <img :src="doc.tumbnail" alt="img" />
        <div>{{ doc.tumbnail }}</div>
      </v-avatar>
      <div class="w-100">
        <div class="d-flex justify-space-between">
          <v-card-title>{{ doc.title }}</v-card-title>
          <v-btn :to="`content/update/${doc.title}`"> 수정하기 </v-btn>
        </div>

        <v-card-subtitle>{{
          typeof doc.createdAt === "object"
            ? `${doc.createdAt.getFullYear()}-${
                doc.createdAt.getMonth() + 1
              }-${doc.createdAt.getDate()}`
            : ""
        }}</v-card-subtitle>
        <v-card-text> {{ doc.postContent }}</v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Content, PostContent } from "@/utils/types";
import ContentItem from "@/components/ContentItem.vue";
import { getFilterContents } from "@/models/content";
import router from "@/router";
const route = useRoute();
const id = computed<string>(() => {
  return route.params.id as string;
});
const type = computed<string>(() => {
  return route.params.type as string;
});
const docs = ref<Content[]>([]);
onMounted(async () => {
  const querySnapshot = await getFilterContents(type.value, id.value);
  querySnapshot.docs.forEach((doc) => {
    console.log(doc.data());
    docs.value.push(doc.data());
  });
});
</script>

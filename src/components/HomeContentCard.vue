<template>
  <v-card v-for="doc in docs" class="ma-3" :key="doc.title">
    <div class="d-flex flex-no-wrap">
      <v-avatar size="125" rounded="0">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
          alt="img"
        />
      </v-avatar>
      <div class="w-100" :to="`/content/${doc.title}`">
        <div class="d-flex justify-space-between">
          <v-card-title>{{
            doc.title === "" ? "test" : doc.title
          }}</v-card-title>
          <v-btn @click="onUpdate"> 수정하기 </v-btn>
        </div>

        <v-card-subtitle>{{
          typeof doc.createdAt === "object"
            ? `${doc.createdAt.getFullYear()}-${
                doc.createdAt.getMonth() + 1
              }-${doc.createdAt.getDate()}`
            : ""
        }}</v-card-subtitle>
        <v-card-text> {{ doc.content }}</v-card-text>
      </div>
      <v-btn @click="remove(doc.title)">삭제</v-btn>
    </div>
  </v-card>
  <v-pagination
    v-model="page"
    :length="5"
    rounded="circle"
    :first="onFirst"
    :last="onLast"
    :next="onNext"
    :prev="onPrev"
    :show-first-last-page="true"
  >
  </v-pagination>
</template>

<script setup>
import { computed, ref, onBeforeMount, onMounted } from "vue";
import { db } from "@/utils/firebase";
import { getPosts, Content, updatePost } from "@/models/content";
import { deleteContent } from "@/models/content";
const emit = defineEmits(["refresh"]);
const page = ref(1);
const remove = async (title) => {
  console.log(title);
  await deleteContent(title);
  emit("refresh");
};
const onNext = () => {
  page.value++;
};
const onPrev = () => {
  page.value--;
};
const onLast = () => {
  page.value =
    Math.floor(props.conents.length / 5) - 1 < 0
      ? 0
      : Math.floor(props.conents.length / 5) - 1;
};
const onFirst = () => {
  page.value = 1;
};
const props = defineProps({
  contents: {
    type: Array,
    required: true,
  },
});
const docs = ref([]);
onMounted(async () => {
  const querySnapshot = await getPosts();
  querySnapshot.docs.forEach((doc) => {
    docs.value.push(doc.data());
  });
});
const onUpdate = async () => {
  await updatePost("a", "adadadadad");
};
</script>

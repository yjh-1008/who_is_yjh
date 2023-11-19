<template>
  <v-card
    v-for="doc in docs"
    class="mx-3 my-5"
    border
    :key="doc.title"
    :to="`/content/${doc.id}`"
  >
    <div class="d-flex flex-no-wrap">
      <v-avatar size="200" rounded="0">
        <img :src="doc.tumbnail" alt="img" />
      </v-avatar>
      <div class="w-100">
        <div class="d-flex justify-space-between">
          <v-card-title class="mt-5 text-h4 pb-0">{{ doc.title }}</v-card-title>
          <v-btn
            class="my-5"
            border
            icon
            v-show="authState !== null"
            :to="`content/update/${doc.id}`"
          >
            <v-icon icon="mdi-file-edit-outline" />
          </v-btn>
        </div>
        <v-card-text class="text-h6 pt-0 mb-5">
          <div>{{ doc.content }}</div></v-card-text
        >
        <v-card-subtitle
          >{{
            typeof doc.createdAt === "object"
              ? `${doc.createdAt.getFullYear()}-${
                  doc.createdAt.getMonth() + 1
                }-${doc.createdAt.getDate()}`
              : ""
          }}
        </v-card-subtitle>
      </div>
      <v-btn class="my-5 mx-3" @click="remove(doc.title)" icon border>
        <v-icon icon="mdi-file-remove-outline" />
      </v-btn>
    </div>
  </v-card>
  <v-pagination
    v-model="page"
    length="6"
    rounted="circle"
    :total-visible="6"
    @next="onNext"
    @prev="onPrev"
  />
</template>

<script setup>
import { computed, ref, onBeforeMount, onMounted } from "vue";
import { db } from "@/utils/firebase";
import { collection, doc } from "firebase/firestore";
import { getPosts, Content, updatePost } from "@/models/content";
import { deleteContent } from "@/models/content";
import { useStore } from "vuex";
import {
  getPostContents,
  converter as postConverter,
} from "@/models/postContent";
const store = useStore();
const authState = computed(() => store.getters.getAuthState);
const emit = defineEmits(["refresh"]);
const page = ref(1);
const remove = async (title) => {
  console.log(title);
  await deleteContent(title);
  emit("refresh");
};
const onNext = () => {
  console.log("next");
};
const onPrev = () => {
  console.log("prev");
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
  querySnapshot.docs.forEach(async (d) => {
    const obj = {};
    let postContents = "";
    await getPostContents(d.data().id).then((res) => {
      res.forEach((v) => {
        const content = v.data().content;
        postContents +=
          content.length > 300 ? content.slice(0, 300) + "..." : content;
      });
    });
    docs.value.push({ ...d.data(), content: postContents });
  });
});
const onUpdate = async () => {
  await updatePost("a", "adadadadad");
};
</script>

<template>
  <v-card v-for="doc in documents" class="ma-3" :key="doc.id">
    <v-card-title>{{ doc.id }}</v-card-title>
    <v-card-text> I should occupy rest of the available space </v-card-text>
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
import { HomeContentType } from "@/utils/types";
import {
  getDocs,
  collection,
  query,
  where,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
const page = ref(1);
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
const docs = ref < QueryDocumentSnapshot > [];
onMounted(async () => {
  const q = query(collection(db, "documents"));
  const querySnapshot = await getDocs(q);
  console.log(docs);
  console.log(DocumentData);
  querySnapshot.forEach((v) => {
    docs.value.push(v);
  });
  querySnapshot.docs.forEach((doc) => {
    console.log(doc);
  });
});
</script>

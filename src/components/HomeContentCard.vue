<template>
  <v-card v-for="content in props.contents" class="ma-3" :key="content.title">
    <v-card-title>{{ content.title }}</v-card-title>
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
import { computed, ref } from "vue";
import { HomeContentType } from "@/utils/types";
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
</script>

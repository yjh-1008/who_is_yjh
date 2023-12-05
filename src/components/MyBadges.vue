<template>
  <v-list width="300" v-model="open" bg-color="grey-lighten-3">
    <v-list-group value="stacks">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props"> My Stacks </v-list-item>
      </template>
      <v-list-item
        v-for="item in items"
        :key="item.name"
        @click="onMove(item.href)"
      >
        <div class="d-flex">
          <img :src="item.src" />
          {{ item.name }}
        </div>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface itemType {
  src: string;
  href: string;
  name: string;
}
const open = ref(false);
const items = ref<itemType[]>([
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    name: "Javascript",
  },
  {
    src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    href: "https://www.typescriptlang.org/docs/handbook/compiler-options.html",
    name: "Typescript",
  },
  {
    src: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
    href: "https://www.oracle.com/kr/java/",
    name: "Java",
  },
  {
    src: "https://www.vectorlogo.zone/logos/vuejs/vuejs-ar21.svg",
    href: "https://vuejs.org/",
    name: "Vue",
  },
  {
    src: "https://www.vectorlogo.zone/logos/nuxtjs/nuxtjs-icon.svg",
    href: "https://nuxt.com/",
    name: "Nuxt",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
    href: "https://reactjs.org/",
    name: "React",
  },
  {
    src: "https://www.vectorlogo.zone/logos/springio/springio-icon.svg",
    href: "https://spring.io/",
    name: "Spring",
  },
]);

const onMove = (href: string) => {
  window.location.href = href;
};
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
  padding-right: 10px;
}
</style>

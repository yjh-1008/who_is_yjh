<template>
  <v-container class="my-0 mx-auto py-0 w-100" fluid>
    <TuiEditor v-model="text" />
    <TuiViewer :content="text" />
  </v-container>
</template>

<script setup>
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
import { ref, onMounted } from "vue";
import TuiEditor from "@/components/editor/TuiEditor.vue";
import TuiViewer from "@/components/editor/TuiViewer.vue";
const options = ref();
const text = ref("abcd");
</script>

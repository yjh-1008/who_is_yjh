<template>
  <div ref="editorRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// import { emit } from "process";
const viewer = ref<Viewer | null>();
const props = defineProps<{ content: string }>();
const editorRef = ref();
onMounted(() => {
  console.log(props);
  viewer.value = new Viewer({
    el: editorRef.value as HTMLDivElement,
    initialValue: props.content,
  });
});
</script>

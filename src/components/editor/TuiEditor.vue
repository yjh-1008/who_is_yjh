<template>
  <div ref="editorRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { emit } from "process";
const props = defineProps<{ modelValue: string }>();
const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const editorRef = ref();
const editor = ref<Editor | null>();
onMounted(() => {
  editor.value = new Editor({
    el: editorRef.value as HTMLDivElement,
    height: "85vh",
    initialEditType: "markdown",
    initialValue: props.modelValue,
    previewStyle: "vertical",
    events: {
      change: () => {
        if (!editor.value) return;
        emits("update:modelValue", editor.value.getMarkdown());
      },
    },
  });
});
</script>

<template>
  <v-dialog width="700px" v-model="dialogState">
    <v-card>
      <v-card-title style="background-color: #546e7a; color: white"
        >포스트 업로드</v-card-title
      >
      <v-card-item>
        <SelectCategory
          :model-value="category"
          label="카테고리"
          @update:modelValue="(val) => (category = val)"
        />
        <SelectTags
          :model-value="tags"
          label="태그"
          @update:modelValue="(val) => (tags = val)"
        />
      </v-card-item>
      <v-card-actions>
        <v-btn @click="dialogState = false"> 취소 </v-btn>
        <v-btn color="blud-darken-4" @click="onSubmit"> 확인 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import SelectCategory from "@/components/SelectCategory.vue";
import SelectTags from "@/components/SelectTags.vue";
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "onSubmit", tags: string[], category: string): void;
}>();
const props = defineProps<{
  modelValue: boolean;
  Tags: string[];
  Category: string;
}>();
const dialogState = computed({
  get: () => {
    return props.modelValue;
  },
  set: (c: boolean) => {
    emit("update:modelValue", c);
  },
});
const tags = ref<string[]>(props.Tags);
const category = ref<string>(props.Category);

watch(
  () => props.Tags,
  (c) => {
    tags.value = c;
  }
);

watch(
  () => props.Category,
  (c) => {
    if (typeof c === "string") {
      category.value = c;
    }
    // tags.value = c;
  }
);

const onSubmit = () => {
  emit("onSubmit", tags.value, category.value);
  dialogState.value = false;
};
</script>

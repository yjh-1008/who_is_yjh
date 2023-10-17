<template>
  <v-combobox
    v-model="select"
    label="I'm readonly"
    chips
    :items="items"
    clearable
    :rules="[validLen]"
  ></v-combobox>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useDatabase } from "@/composable/useDatabase";
import { validLen } from "@/utils/textFieldRule";
const { getCategories } = useDatabase();
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
const items = ref<string[]>([]);
onMounted(async () => {
  items.value = (await getCategories()).val() as string[];
});
const select = computed({
  get: () => {
    return props.modelValue;
  },
  set: (c: string) => {
    emit("update:modelValue", c);
  },
});
</script>

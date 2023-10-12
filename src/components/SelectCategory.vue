<template>
  <v-combobox
    v-model="select"
    @input="(val:string[]) => emit('update:modelValue', val)"
    label="I'm readonly"
    chips
    multiple
  ></v-combobox>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  modelValue: Array<string>;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();
const items = ref(["foo", "bar", "fizz", "buzz"]);
const select = ref(props.modelValue);
const remove = (item: any) => {
  console.log(item);
};
</script>

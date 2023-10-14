<template>
  <v-combobox
    v-model="select"
    @update:model-value="(val:string[]) => emit('update:modelValue', val)"
    label="I'm readonly"
    chips
    :items="items"
    multiple
  ></v-combobox
  >C
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDatabase } from "@/composable/useDatabase";

const { getTags, setTags } = useDatabase();
const props = defineProps<{
  modelValue: Array<string> | undefined;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();
const items = ref<string[]>();
const select = ref(props.modelValue);
const remove = (item: any) => {
  console.log(item);
};
onMounted(async () => {
  await getTags().then((data) => {
    // setTags(["vue", "알고리즘"]);
    console.log(data);
    items.value = (data.val() as string[]) || [];
  });
  // items.value = getTags();
});
</script>

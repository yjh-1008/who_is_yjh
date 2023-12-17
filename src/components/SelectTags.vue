<template>
  <v-combobox
    v-model="select"
    @update:model-value="(val:string[]) => emit('update:modelValue', val)"
    label="I'm readonly"
    chips
    :items="items"
    multiple
    :rules="[validLen]"
  ></v-combobox>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDatabase } from "@/composable/useDatabase";
import { validLen } from "@/utils/textFieldRule";
const { getTags } = useDatabase();
const props = defineProps<{
  modelValue: Array<string> | undefined;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();
const items = ref<string[]>();
const select = ref(props.modelValue);
onMounted(async () => {
  await getTags().then((data) => {
    items.value = (data.val() as string[]) || [];
  });
});
</script>

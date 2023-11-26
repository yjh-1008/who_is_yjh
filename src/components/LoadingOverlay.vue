<template>
  <v-overlay
    :model-value="props.modelValue"
    class="align-center justify-center"
  >
    <v-progress-circular
      color="blue"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="2"
        v-for="(tag, index) in props.tags"
        :key="title + tag + index"
      >
        {{ tag }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
interface Props {
  tags: string[];
  title: string;
}
const props = defineProps<Props>();
</script>

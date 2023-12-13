<template>
  <v-card
    style="background-color: #546e7a"
    width="30%"
    rounded
    elevation="16"
    class="mx-auto my-5"
    variant="elevated"
  >
    <v-img class="align-end" height="350" :src="data.tumbnail" cover>
      <v-card-title> {{ data.title }} </v-card-title>
    </v-img>
    <v-card-subtitle class="py-1" style="color: white; font-weight: bold"
      >{{ dateFormatter(data.sttDtti) }} ~
      {{ dateFormatter(data.endDtti) }}</v-card-subtitle
    >
    <hr />
    <v-card-text style="color: white; font-weight: bold">
      <div>
        {{ data.content }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// import medialog from "@/assets/images/medialog.jpeg";
import { dateFormatter } from "@/utils/dateFormatter";
import { Record } from "@/utils/types";
const props = defineProps<{
  data: Record;
}>();
</script>

<style scoped>
.date {
  font-size: 14px;
}
</style>

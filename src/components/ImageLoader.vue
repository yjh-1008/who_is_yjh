<template>
  <v-file-input
    accept="image/*"
    label="File input"
    density="compact"
    variant="outlined"
    placeholder="썸네일"
    @change="base64"
  ></v-file-input>
  <v-img
    class="mx-auto"
    height="500"
    min-width="700"
    :src="previewImage"
    cover
    :aspect-ratio="1"
  >
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
</template>

<script setup lang="ts">
import { InputHTMLAttributes } from "vue";
import { ref, Ref } from "vue";
const previewImage: Ref<any> = ref();
const base64 = (event: any) => {
  const target = event.target;
  if (target.files === null) return;
  const files = target?.files;
  if (!files.length) return;
  const file = files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    previewImage.value = e.target?.result;
  };
  reader.readAsDataURL(file);
};
</script>

<style>
.image-container {
  height: 100px;
  width: 500px;
  background-color: #d3d3d3;
}
</style>

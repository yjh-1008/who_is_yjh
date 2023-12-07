<template>
  <v-file-input
    id="img_loader"
    accept="image/*"
    label="File input"
    density="compact"
    variant="outlined"
    placeholder="썸네일"
    @change="base64"
  ></v-file-input>
  <label for="img_loader">
    <v-img
      class="mx-auto"
      height="500"
      min-width="700"
      :src="previewImage"
      :aspect-ratio="1"
      style="border: 1px solid black; background-color: #d3d3d3"
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
  </label>
</template>

<script setup lang="ts">
import { InputHTMLAttributes } from "vue";
import { ref, Ref, computed } from "vue";
const emits = defineEmits(["update:modelValue"]);
// const previewImage: Ref<any> = ref();
const props = defineProps({
  modelValue: String,
});
const previewImage = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});
const base64 = (event: any) => {
  const target = event.target;
  if (target.files === null) return;
  const files = target?.files;
  if (!files.length) return;
  const file = files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    if (typeof e.target?.result === "string")
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

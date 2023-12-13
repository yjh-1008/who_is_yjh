<template>
  <v-dialog v-model="modelValue">
    <v-card height="fit-content" width="50%" class="mx-auto">
      <v-toolbar dark color="blue-grey-darken-1">
        <v-btn icon dark @click="modelValue = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="onSave"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="uploadValue.title"
                density="compact"
                variant="outlined"
                label="제목"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <ImageLoader @update:file="(val) => (tumbFile = val)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <RangeDatePicker ref="rangePickerRef" />
            </v-col>
          </v-row>
          <v-row>
            <v-textarea
              v-model="uploadValue.content"
              clearable
              clear-icon="mdi-close-circle"
              label="설명"
            ></v-textarea>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import RangeDatePicker from "./RangeDatePicker.vue";
import ImageLoader from "./ImageLoader.vue";
import { setRecord } from "@/models/record";
import { Record } from "@/utils/types";
import { useStore } from "vuex";
import { setRecordImage } from "@/models/image";
import useStorage from "@/composable/useStorage";
const { getURL } = useStorage();
const emits = defineEmits(["update:modelValue"]);
const store = useStore();
const props = defineProps<{
  modelValue: boolean;
}>();
const uploadValue = ref({
  title: "",
  content: "",
  tumbnail: "",
  sttDtti: new Date(),
  endDtti: new Date(),
});
const tumbFile: Ref<File | undefined> = ref();
const rangePickerRef = ref(null);
const modelValue: Ref<boolean> = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});
const onSave = async () => {
  if (tumbFile.value === undefined) return;
  await addImage(tumbFile.value).then(async (res: string) => {
    if (typeof tumbFile.value === "string") return;
    uploadValue.value.tumbnail = res;
    await setRecord(
      uploadValue.value.title,
      uploadValue.value.content,
      res,
      store.getters.getAuthState,
      uploadValue.value.sttDtti,
      uploadValue.value.endDtti
    );
  });
  modelValue.value = false;
};
//이미지를 db에 저장하는 함수
const addImage = async (file: Blob | File) => {
  const user = store.getters.getAuthState;
  const id = await setRecordImage(file as File, user);
  const origin = await getURL(`record/images/${id}/origin`);
  const tumbnail = await getURL(`record/images/${id}/tumbnail`);
  return tumbnail;
};
</script>

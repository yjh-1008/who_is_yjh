<template>
  <v-dialog v-model="modelValue">
    <v-card height="50vh" width="50%" class="mx-auto">
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
              <ImageLoader :model-value="uploadValue.tumbnail" />
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
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="uploadValue.tags"
                :items="items"
                chips
                clearable
                label="태그"
                multiple
                variant="solo"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :model-value="selected"
                    closable
                    @click="select"
                  >
                    <strong>{{ item }}</strong
                    >&nbsp;
                    <span>(interest)</span>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="uploadValue.githubLink"
                density="compact"
                variant="outlined"
                label="githubLink"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, Ref, ref, unref } from "vue";
import RangeDatePicker from "./RangeDatePicker.vue";
import ImageLoader from "./ImageLoader.vue";
import { setProject } from "@/models/pofolCard";
import { useStore } from "vuex";
const emits = defineEmits(["update:modelValue"]);
const store = useStore();
const props = defineProps<{
  modelValue: boolean;
}>();
const uploadValue = ref({
  title: "",
  content: "",
  tumbnail: "",
  githubLink: "",
  tags: [],
  sttDtti: new Date(),
  endDtti: new Date(),
});
const chips: Ref<string[]> = ref([]);
const items: Ref<string[]> = ref([]);
const rangePickerRef = ref(null);
const modelValue: Ref<boolean> = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});

const onSave = async () => {
  const obj = unref(uploadValue);
  await setProject(
    uploadValue.value.title,
    uploadValue.value.content,
    uploadValue.value.tumbnail,
    uploadValue.value.githubLink,
    uploadValue.value.tags,
    store.getters.getAuthState,
    uploadValue.value.sttDtti,
    uploadValue.value.endDtti
  );
};
</script>

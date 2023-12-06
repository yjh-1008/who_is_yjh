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
          <v-btn variant="text"> Save </v-btn>
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
              <ImageLoader />
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
              label="Text"
            ></v-textarea>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="chips"
                :items="items"
                chips
                clearable
                label="Your favorite hobbies"
                multiple
                prepend-icon="mdi-filter-variant"
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
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { Project } from "@/utils/types";
import RangeDatePicker from "./RangeDatePicker.vue";
import { resolve } from "path";
import ImageLoader from "./ImageLoader.vue";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();
const uploadValue = ref({
  title: "",
  subtitle: "",
  content: "",
  tags: [],
  sttDtti: new Date(),
  endDtti: new Date(),
  githubLink: "",
});
const chips: Ref<string[]> = ref([]);
const items: Ref<string[]> = ref([]);
const rangePickerRef = ref(null);
const modelValue: Ref<boolean> = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});
</script>

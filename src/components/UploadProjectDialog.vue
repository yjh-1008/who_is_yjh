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
            <v-textarea
              v-model="uploadValue.content"
              clearable
              clear-icon="mdi-close-circle"
              label="Text"
            ></v-textarea>
          </v-row>
          <v-row>
            <v-menu v-model="calendarState" :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-text-field color="indigo" v-bind="props">
                  Menu as Popover
                </v-text-field>
              </template>

              <DatePicker v-model.range="range" mode="dateTime" />
            </v-menu>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { Project } from "@/utils/types";
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
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
const range = ref({
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 10),
});
const calendarState: Ref<boolean> = ref(false);
const modelValue: Ref<boolean> = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});
</script>

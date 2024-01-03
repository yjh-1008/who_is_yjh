<template>
  <DatePicker
    v-model="range"
    is-range
    :popover="popover"
    :masks="masks"
    :close-on-content-click="true"
  >
    <template #default="{ inputValue, inputEvents }">
      <div class="w-100 d-flex align-center">
        <v-text-field
          :value="inputValue.start"
          hide-details
          v-on="inputEvents.start"
        >
          <template v-slot:prepend-inner>
            <v-icon>mdi-calendar-range</v-icon>
          </template>
        </v-text-field>
        <v-icon size="x-large" class="mx-4">mdi-arrow-right</v-icon>
        <v-text-field
          :value="inputValue.end"
          v-on="inputEvents.end"
          hide-details
        >
          <template v-slot:prepend-inner>
            <v-icon>mdi-calendar-range</v-icon>
          </template>
        </v-text-field>
      </div>
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import { ref, Ref, unref } from "vue";
interface RangeDate {
  start: Date;
  end: Date;
}
const range: Ref<RangeDate> = ref({
  start: new Date(),
  end: new Date(),
});
const popover: Ref<object> = ref({
  visibility: "click",
  placement: "top",
});
const masks: Ref<object> = ref({
  input: "YYYY-MM-DD",
});

const getRange = (): RangeDate => {
  return range.value;
};

defineExpose({ range, getRange });
</script>

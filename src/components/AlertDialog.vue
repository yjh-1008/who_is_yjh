<template>
  <v-dialog width="700px" v-model="dialog.state">
    <v-card>
      <v-card-title>포스트 업로드</v-card-title>
      <v-card-item> 입력 정보를 기입해주시기 바랍니다. </v-card-item>
      <v-card-actions>
        <v-btn @click="onClose"> 확인 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { AlDialog } from "@/utils/types";
const store = useStore();
const dialog = computed<AlDialog>({
  get: () => {
    return store.getters.getAlDialog;
  },
  set: (c: AlDialog) => {
    store.commit("setAlDialog", c);
  },
});

const onClose = () => {
  dialog.value = {
    state: false,
    title: "",
    content: "",
  };
};
</script>

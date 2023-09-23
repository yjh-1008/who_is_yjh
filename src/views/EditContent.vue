<template>
  <div>
    <v-container class="my-0 mx-auto py-0 w-100" fluid>
      <TuiEditor v-model="text" />
      <TuiViewer :content="text" />
    </v-container>
    <v-dialog v-model="dialogState" width="500">
      <v-card>
        <v-card-text class="dialog_text">
          인증된 사용자만 글을 작성할 수 있습니다.
        </v-card-text>
        <v-spacer></v-spacer>
        <v-btn
          @click="() => router.push('/')"
          color="blue"
          width="100"
          class="mx-auto my-2"
          >확인</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import TuiEditor from "@/components/editor/TuiEditor.vue";
import TuiViewer from "@/components/editor/TuiViewer.vue";
import { db } from "@/utils/firebase";
// import firebase from "firebase/firebase";
const options = ref();
const router = useRouter();
const text = ref("abcd");
const store = useStore();
const dialogState = computed(() => {
  return !store.state.authState;
});
onMounted(() => {
  console.log(db, "here");
});
</script>

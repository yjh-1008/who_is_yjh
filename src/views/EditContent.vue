<template>
  <v-container class="mr-0 ml-0 pa-0" fluid>
    <v-card>
      <v-row justify="space-between" align="start" class="mb-4">
        <v-col cols="6" offset="3">
          <v-text-field
            v-model="title"
            density="compact"
            variant="outlined"
            label="제목"
            hint="제목을 입력해주세요."
          />
        </v-col>
        <v-col cols="1">
          <v-btn @click="onSubmit">업로드</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <TuiEditor v-model="text" />
        <TuiViewer :content="text" />
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
import { useRouter } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import TuiEditor from "@/components/editor/TuiEditor.vue";
import TuiViewer from "@/components/editor/TuiViewer.vue";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { setPost, Content } from "@/models/content";
// import firebase from "firebase/firebase";
onBeforeMount(() => {
  console.log(store.commit("getAuthState"));
  if (!store.state.authState) {
    alert("인증된 사용자만 작성할 수 있습니다.");
    router.push("/");
  }
});
const options = ref();
const router = useRouter();
const text = ref("abcd");
const store = useStore();
const title = ref(""); // '/', ., .., 정규표현식 사용 금지.
const dialogState = computed(() => {
  return !store.state.authState;
});

const onSubmit = async () => {
  const ret = await setPost(new Content("a", "b"));
};
</script>

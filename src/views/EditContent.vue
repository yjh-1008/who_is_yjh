<template>
  <v-container class="mr-0 ml-0 pa-0" fluid>
    <v-card>
      <v-row justify="space-between" align="start" class="mb-4">
        <v-col cols="6" offset="3">
          <v-text-field
            v-model="contentTitle"
            density="compact"
            variant="outlined"
            label="제목"
            hint="제목을 입력해주세요."
          />
        </v-col>
        <SelectCategory
          :model-value="chips"
          @update:modelValue="(val) => (chips = val)"
        />
        <v-col cols="1">
          <v-btn @click="onSubmit">업로드</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <TuiEditor
          v-model="contentText"
          @addImage="addImage"
          :loading="loading"
        />
        <TuiViewer :content="contentText" />
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { setPost, getPost } from "@/models/content";
import TuiEditor from "@/components/editor/TuiEditor.vue";
import TuiViewer from "@/components/editor/TuiViewer.vue";
import { setImage } from "@/models/image";
import useStorage from "@/composable/useStorage";
import { deleteContent } from "@/models/content";
import SelectCategory from "@/components/SelectCategory.vue";
const store = useStore();
const { getURL } = useStorage();
const props = defineProps<{
  id: string;
  title: string;
  text: string;
}>();
const loading = ref(false);
const chips = ref<string[]>([]);
onMounted(async () => {
  console.log(store.getters.getAuthState);
  if (!store.getters.getAuthState) {
    alert("인증된 사용자만 작성할 수 있습니다.");
    router.push("/");
  }

  if (!props.id) {
    loading.value = false;
    return;
  }
  const doc = await getPost(props.id);
});
const options = ref();
const router = useRouter();
const contentText = ref(props.text);
const contentTitle = ref(props.title); // '/', ., .., 정규표현식 사용 금지.
const dialogState = computed(() => {
  return !store.state.authState;
});

const tumbnails = computed(() => {
  const ts = contentText.value.split("");
  let step = 0;
  const buf = [];
  const urls = [];

  while (ts.length) {
    const t = ts.shift();
    switch (step) {
      case 0:
        if (t === "!") step++;
        break;
      case 1:
        if (t === "[") step++;
        else step = 0;
        break;
      case 2:
        if (t === "]") step++;
        else buf.push(t);
        break;
      case 3:
        if (t === "(") step++;
        break;
      case 4:
        if (t === ")") {
          const url = buf.join("");
          buf.splice(0, buf.length);
          urls.push(url);
          step = 0;
        }
        break;
    }
  }
  return urls;
});

const addImage = async (
  file: Blob | File,
  callback: (url: string, text?: string) => void
) => {
  const user = store.getters.getAuthState;
  const id = await setImage(file as File, user);
  const origin = await getURL(`images/${id}/origin`);
  const tumbnail = await getURL(`images/${id}/tumbnail`);
  callback(origin, tumbnail);
};

const onReset = () => {
  contentText.value = "";
  contentTitle.value = "";
};
const onSubmit = async () => {
  // const user = stroe.getAuthState;
  if (props.id) {
    if (props.title !== contentTitle.value) await deleteContent(props.id);
  }
  const id = await setPost(
    "test",
    "bdsfhsdafhjdasfjkldashfgdsvbuiash",
    store.getters.getAuthState
  );
  await router.push(`/content/${id}`);
};
</script>

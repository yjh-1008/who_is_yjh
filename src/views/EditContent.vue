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
        <!-- <SelectCategory
          :model-value="chips"
          @update:modelValue="(val) => (chips = val)"
        /> -->
        <SelectTags
          :model-value="tags"
          @update:modelValue="(val) => (tags = val)"
        />
        <v-col cols="1">
          <v-btn @click="onSubmit">업로드</v-btn>
        </v-col>
      </v-row>
      <TuiEditor
        v-model="postContent"
        @addImage="addImage"
        :loading="loading"
      />
      <TuiViewer :content="postContent" />
      <v-row justify="center"> </v-row>
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
import { Content, PostContent } from "@/utils/types";
import { getPostContents } from "@/models/postContent";
import SelectTags from "@/components/SelectTags.vue";
const store = useStore();
const { getURL } = useStorage();
const props = defineProps<{
  id: string;
  title: string;
  text: string;
}>();
const content = ref<Content | null>();
const title = ref("");
const postContent = ref("");
const tumbnail = ref("");
const category = ref("");
const tags = ref<string[]>();
const options = ref();
const router = useRouter();
const dialogState = computed(() => {
  return !store.state.authState;
});
const loading = ref(false);
const chips = ref<string[]>();
onMounted(async () => {
  console.log(store.getters.getAuthState);
  if (!store.getters.getAuthState) {
    alert("인증된 사용자만 작성할 수 있습니다.");
    router.push("/");
  }

  if (!props.id.length) {
    loading.value = false;
    return;
  }
  await getPost(props.id).then((data) => {
    content.value = data;
    title.value = content.value.title;
    postContent.value = content.value.postContent || "";
    tumbnail.value = content.value.tumbnail;
    category.value = content.value.category;
    tags.value = content.value.tags;
    loading.value = false;
  });
});

const tumbnails = computed(() => {
  const ts = postContent.value.split("");
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
  title.value = "";
  postContent.value = "";
  tags.value = [];
  category.value = "";
};
const onSubmit = async () => {
  // const user = stroe.getAuthState;
  if (props.id) {
    if (props.title !== title.value) await deleteContent(props.id);
  }
  const id = await setPost(
    "test123",
    "bdsfhsdafhjdasfjkldashfgdsvbuiash",
    tumbnail.value,
    category.value,
    tags.value === undefined ? [""] : tags.value,
    store.getters.getAuthState
  );
  await router.push(`/content/${id}`);
};
</script>

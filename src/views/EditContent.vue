<template>
  <v-container class="mr-0 ml-0 pa-0" fluid>
    <v-card>
      <v-row justify="start" align="start" class="mt-2 heade">
        <v-col cols="12" offset="0">
          <v-text-field
            v-model="title"
            density="compact"
            variant="outlined"
            label="제목"
            :rules="[validLen, validSign]"
          >
            <template v-slot:append>
              <v-btn @click="onUpload" class="mr-4"
                >{{ route.name === "수정페이지" ? "수정" : "업로드" }}
                <template v-slot:append>
                  <v-icon icon="mdi-upload" />
                </template>
              </v-btn>
            </template>
            <template v-slot:prepend>
              <v-btn
                icon="mdi-arrow-left"
                class="ml-4"
                variant="plain"
                size="large¬"
                @click="router.go(-1)"
              />
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <TuiEditor
          v-model="postContent"
          @addImage="addImage"
          :loading="loading"
        />
        <!-- <TuiViewer :content="postContent" /> -->
      </v-row>
    </v-card>
    <UploadDialog
      :modelValue="uploadDialog"
      :Tags="tags === undefined ? [] : tags"
      :Category="category === undefined ? '' : category"
      @update:modelValue="(val) => (uploadDialog = val)"
      @on-submit="onSubmit"
    />
  </v-container>
</template>

<script setup lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { setPost, getPost } from "@/models/content";
import TuiEditor from "@/components/editor/TuiEditor.vue";
import { setImage } from "@/models/image";
import useStorage from "@/composable/useStorage";
import { deleteContent, updatePost } from "@/models/content";
import UploadDialog from "@/components/UploadDialog.vue";
import { Content } from "@/utils/types";
import { validLen, validSign } from "@/utils/textFieldRule";
const store = useStore();
const { getURL } = useStorage();
const props = defineProps<{
  id: string;
  title: string;
  text: string;
}>();
const content = ref<Content | null>();
const title = ref(props.title);
const postContent = ref(props.text);
const tumbnail = ref("");
const router = useRouter();
const route = useRoute();
const uploadDialog = ref(false);
const loading = ref(false);
const tags = ref<string[]>([]);
const category = ref<string>("");
onMounted(async () => {
  if (!store.getters.getAuthState) {
    alert("인증된 사용자만 작성할 수 있습니다.");
    router.push("/who_is_yjh");
  }

  if (!props.id.length) {
    loading.value = false;
    return;
  }
  await getPost(props.id).then((data) => {
    tags.value = data.tags;
    category.value = data.category;
    content.value = data;
    tumbnail.value = content.value.tumbnail ? "" : content.value.tumbnail;
    //TODO Write Update EDIT CONTENT 분리해야함.
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
};
const onUpload = () => {
  if (!title.value.length || !postContent.value.length) {
    store.commit("setAlDialog", {
      state: true,
      title: "정확한 정보를 기입해주시기 하랍니다",
      content: "",
    });
    return;
  }
  uploadDialog.value = true;
};
const onSubmit = async (tags: string[], category: string) => {
  if (route.name === "수정페이지") {
    await updatePost(
      props.id,
      title.value,
      postContent.value,
      tags === undefined ? [""] : tags,
      category
    );
  } else {
    // const user = stroe.getAuthState;
    if (props.id) {
      if (props.title !== title.value) await deleteContent(props.id);
    }
    let t = tumbnail.value;
    if (!t && tumbnails.value.length) t = tumbnails.value[0];
    const id = await setPost(
      title.value,
      postContent.value,
      t,
      category,
      tags === undefined ? [""] : tags,
      store.getters.getAuthState
    );
  }
  await router.push({ name: "home" });
};
</script>

<style setup>
.header {
  border: 1px solid black;
}
</style>

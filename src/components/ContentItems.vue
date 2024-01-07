<template>
  <v-card
    v-for="doc in contents"
    class="my-5 w-75 mx-auto"
    height="200px"
    elevation="6"
    :key="doc.title"
    md="2"
  >
    <div class="d-flex flex-no-wrap">
      <v-img
        class="align-center text-white"
        width="20%"
        height="200px"
        :src="doc.tumbnail"
        alt="img"
      />
      <div class="w-100">
        <v-card-title class="text-h5 mt-3">
          <div class="d-flex justify-space-between">
            <div @click="linkClick(`/content/${doc.id}`)">
              {{ doc.title }}
              <div class="date">
                {{
                  typeof doc.createdAt === "object"
                    ? `${doc.createdAt.getFullYear()}/${
                        doc.createdAt.getMonth() + 1
                      }/${doc.createdAt.getDate()}`
                    : ""
                }}
              </div>
            </div>
            <hr />
            <v-btn
              class="ml-auto"
              v-show="authState !== null"
              @click="remove(doc.title)"
              border
              size="small"
              icon="mdi-trash-can"
            >
            </v-btn>
            <v-btn
              class="mx-4"
              border
              v-show="authState !== null"
              @click="linkClick(`/content/update/${doc.id}`)"
              icon="mdi-pencil"
              size="small"
              color="blue-grey-darken-1"
            >
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text @click="() => linkClick(`/content/${doc.id}`)">
          <div class="mb-2" style="height: 50px">
            {{ text(doc.text) }}
          </div>
          <hr class="my-3" />
          <v-chip
            class="mr-1"
            size="x-small"
            label
            v-for="(tag, i) in doc.tags"
            :key="`${tag}_${i}`"
            >{{ tag }}</v-chip
          >
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount, onMounted } from "vue";
import { Content } from "@/utils/types";
import { deleteContent } from "@/models/content";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const authState = computed(() => store.getters.getAuthState);
const emit = defineEmits(["refresh"]);
const page = ref(1);
const router = useRouter();
const remove = async (title: string) => {
  await deleteContent(title);
  emit("refresh");
};
const props = defineProps<{
  contents: any[];
}>();
const text = (val: string | undefined) => {
  if (typeof val !== "string") return "";
  else {
    const tmp = val.split("썸네일")[1];
    return tmp.length > 400 ? tmp.slice(0, 401) + "..." : tmp;
  }
};
const linkClick = (url: string) => {
  store.commit("setLoadingState", true);
  router.push(url);
};
// const docs = ref([]);
</script>

<style scoped>
.date {
  font-size: 0.8rem;
}
</style>

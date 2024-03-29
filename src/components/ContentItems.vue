<!-- eslint-disable no-empty-character-class -->
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
        class="align-center text-white my-auto"
        width="20%"
        height="150px"
        :src="doc.tumbnail"
        alt="img"
      />
      <div class="w-100">
        <v-card-title class="text-h5 mt-3">
          <div class="d-flex justify-space-between">
            <div @click="linkClick(`/content/${doc.id}`)">
              {{ doc.title }}
            </div>
            <hr />
            <v-btn
              class="ml-auto"
              v-show="authState !== null"
              @click="remove(doc.title)"
              border
              size="x-small"
              icon="mdi-trash-can"
            >
            </v-btn>
            <v-btn
              class="mx-4"
              border
              v-show="authState !== null"
              @click="linkClick(`/content/update/${doc.id}`)"
              icon="mdi-pencil"
              size="x-small"
              color="blue-grey-darken-1"
            >
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text @click="() => linkClick(`/content/${doc.id}`)">
          <div class="ml-line">
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
          <div class="date mt-1">
            {{
              typeof doc.createdAt === "object"
                ? `${doc.createdAt.getFullYear()}-${
                    doc.createdAt.getMonth() + 1
                  }-${doc.createdAt.getDate()}`
                : ""
            }}
          </div>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { deleteContent } from "@/models/content";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const authState = computed(() => store.getters.getAuthState);
const emit = defineEmits(["refresh"]);
const router = useRouter();
const remove = async (title: string) => {
  await deleteContent(title);
  // location.reload();
  emit("refresh");
};
const props = defineProps<{
  contents: any[];
}>();
const text = (val: string | undefined) => {
  const tmp = val?.split("1.")[1];
  if (typeof val === "string") {
    return val
      .replaceAll(
        // eslint-disable-next-line no-useless-escape
        /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
        ""
      )
      .replaceAll("![]()", "");
  }
};
const linkClick = (url: string) => {
  store.commit("setLoadingState", true);
  router.push(url);
};
</script>

<style scoped>
.date {
  font-size: 0.8rem;
}
</style>

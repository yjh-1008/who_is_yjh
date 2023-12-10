<template>
  <v-card v-for="doc in contents" class="mx-3 my-5" border :key="doc.title">
    <div class="d-flex flex-no-wrap">
      <v-avatar
        size="170"
        rounded="0"
        @click="router.push(`/content/${doc.id}`)"
      >
        <v-img
          class="align-end text-white"
          height="200"
          cover
          :src="doc.tumbnail"
          alt="img"
        />
      </v-avatar>
      <div class="w-100">
        <v-card-title class="text-h5 mt-3">
          <div class="d-flex justify-space-between">
            <div @click="router.push(`/content/${doc.id}`)">
              {{ doc.title }}
            </div>
            <v-btn
              class="ml-auto"
              v-show="authState !== null"
              @click="remove(doc.title)"
              border
              icon="mdi-trash-can"
            >
            </v-btn>
            <v-btn
              class="mx-4"
              border
              v-show="authState !== null"
              @click="router.push(`/content/update/${doc.id}`)"
              icon="mdi-pencil"
              color="blue-grey-darken-1"
            >
            </v-btn>
          </div>
        </v-card-title>
        <v-card-subtitle :to="`/content/${doc.id}`">
          <div class="mb-2">{{ text(doc.text) }}</div>
          <v-chip
            class="mb-6 mt-2"
            size="small"
            label
            v-for="(tag, i) in doc.tags"
            :key="`${tag}_${i}`"
            >{{ tag }}</v-chip
          >
          <div>
            {{
              typeof doc.createdAt === "object"
                ? `${doc.createdAt.getFullYear()}-${
                    doc.createdAt.getMonth() + 1
                  }-${doc.createdAt.getDate()}`
                : ""
            }}
          </div>
        </v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { computed, ref, onBeforeMount, onMounted } from "vue";
import { deleteContent } from "@/models/content";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const authState = computed(() => store.getters.getAuthState);
const emit = defineEmits(["refresh"]);
const page = ref(1);
const router = useRouter();
const remove = async (title) => {
  await deleteContent(title);
  emit("refresh");
};
const props = defineProps({
  contents: {
    type: Array,
    required: true,
  },
});
const text = (val) => {
  if (typeof val !== "string") return "";
  else {
    if (val.length < 200) return val;
    else return val.slice(0, 200) + "...";
  }
};
// const docs = ref([]);
</script>

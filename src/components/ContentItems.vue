<template>
  <v-card
    v-for="doc in contents"
    class="mx-3 my-5"
    border
    :key="doc.title"
    :to="`/content/${doc.id}`"
  >
    <div class="d-flex flex-no-wrap">
      <v-avatar size="170" rounded="0">
        <img :src="doc.tumbnail" alt="img" />
      </v-avatar>
      <div class="w-100">
        <v-card-title class="text-h5">
          <div class="d-flex justify-space-between">
            <div>{{ doc.title }}</div>
            <v-btn
              class="ml-auto"
              size="small"
              border
              icon
              v-show="authState !== null"
              :to="`content/update/${doc.id}`"
            >
              <v-icon icon="mdi-file-edit-outline" />
            </v-btn>
            <v-btn
              class="mx-4"
              size="small"
              v-show="authState !== null"
              @click="remove(doc.title)"
              icon
              border
            >
              <v-icon icon="mdi-file-remove-outline" />
            </v-btn>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div class="mb-2">{{ doc.content }}</div>
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
const store = useStore();
const authState = computed(() => store.getters.getAuthState);
const emit = defineEmits(["refresh"]);
const page = ref(1);
const remove = async (title) => {
  console.log(title);
  await deleteContent(title);
  emit("refresh");
};
const onNext = () => {
  console.log("next");
};
const onPrev = () => {
  console.log("prev");
};
const onLast = () => {
  page.value =
    Math.floor(props.conents.length / 5) - 1 < 0
      ? 0
      : Math.floor(props.conents.length / 5) - 1;
};
const onFirst = () => {
  page.value = 1;
};
const props = defineProps({
  contents: {
    type: Array,
    required: true,
  },
});
// const docs = ref([]);
</script>

<template>
  <div v-html="data" />
</template>

<script lang="ts">
export default {
  name: "BlogContent",
};
</script>

<script lang="ts" setup>
// import post from "../../public/posts/test.md";
import htmlConverter from "@/utils/htmlConverter";
import { onBeforeMount, ref, reactive, Ref } from "vue";
import { Octokit } from "@octokit/core";
const octokit = new Octokit({
  auth: process.env.OCTOKIT_AUTH_KEY,
});

const data: Ref<string> = ref("");

onBeforeMount(async () => {
  await octokit
    .request("POST /markdown", {
      text: "**Hello** **world**",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then((res) => (data.value = htmlConverter(res.data)));
});
</script>

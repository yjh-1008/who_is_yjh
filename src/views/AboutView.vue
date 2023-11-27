<template>
  <div class="d-flex">
    <v-card height="100vh" class="flex-1-0">
      <v-container class="mr-10 mt-10">
        <!-- TODO... 슬라이딩 윈도우로 내 소개 화면 만들기 -->
        <v-row class="pl-auto"><h2>About me!</h2></v-row>
        <v-row class="pl-auto">
          <v-col cols="9">
            <h2>편리함을 주고싶은 개발자 유준호입니다.</h2>
            <MyBadges />
            <ul>
              <li>
                Typescript, Jacascript, React, Vue를 주로 사용하는 프론트엔드
                개발자입니다.
              </li>
              <li>Next, Nuxt 등 SSR에도 관심이 많아 공부하고 있습니다.</li>
              <li>
                반응형 UI/UX에 관심이 많고, 유저에게 더 편리한 사용을 위하여
                항상 고민합니다!
              </li>
            </ul>
          </v-col>
        </v-row>
        <h2>My Commits</h2>
        <v-row class="py-5">
          <img
            src="https://ghchart.rshah.org/yjh-1008"
            class="github_commits"
          />
        </v-row>
        <v-row>
          <div>
            Show My Github Stack!
            <v-icon icon="mdi-chevron-down" />
          </div>
        </v-row>
        <v-row>
          <GithubStacks />
        </v-row>
      </v-container>
    </v-card>
    <v-card width="50%">
      <div>section 1</div>
    </v-card>
    <v-card width="50%">
      <div>section 1</div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue";
import MyBadges from "@/components/MyBadges.vue";
import GithubStacks from "@/components/GithubStacks.vue";
const profile_pircutre: Ref<any> = ref("");
onMounted(async () => {
  // await loadFile("").then((res: any) => {
  //   console.log(res);
  //   profile_pircutre.value = res;
  // });
});
</script>
<style scoped>
.github_commits {
  float: left;
  width: 100%;
  max-width: 963px;
  max-height: 154px !important;
}

img {
  width: 200px;
  height: 250px;
}
</style>

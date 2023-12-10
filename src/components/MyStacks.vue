<template>
  <v-card height="100%" width="100%" class="mx-auto">
    <div style="text-align: center" class="mx-auto">
      <div>
        <h1>편리함을 주고싶은 개발자 유준호입니다.</h1>
        <MyCareer />
        <v-card-item>
          <MyBadges />
        </v-card-item>
        <v-card-subtitle @click="onClick(pofolUrl)">
          포트폴리오
        </v-card-subtitle>
        <ul>
          <li>
            Typescript, Jacascript, React, Vue를 주로 사용하는 프론트엔드
            개발자입니다.
          </li>
          <li>Next, Nuxt 등 SSR에도 관심이 많아 공부하고 있습니다.</li>
          <li>
            반응형 UI/UX에 관심이 많고, 유저에게 더 편리한 사용을 위하여 항상
            고민합니다!
          </li>
        </ul>
      </div>
      <h2>My Commits</h2>
      <img src="https://ghchart.rshah.org/yjh-1008" class="github_commits" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import MyBadges from "@/components/MyBadges.vue";
import MyCareer from "@/components/MyCareer.vue";
import process from "process";
const pofolUrl = "https://www.notion.so/797e20874e794772b38b0ff3bf1ac90d?pvs=4";
const onClick = (url: string) => {
  window.document.location = url;
};
</script>

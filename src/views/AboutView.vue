<template>
  <v-window v-model="windows" show-arrows>
    <template v-slot:prev="{ props }">
      <v-btn color="success" @click="props.onClick"> Previous slide </v-btn>
    </template>
    <template v-slot:next="{ props }">
      <v-btn color="info" @click="props.onClick"> Next slide </v-btn>
    </template>
    <v-window-item :value="0">
      <DevProjects />
    </v-window-item>

    <v-window-item :key="1">
      <v-card height="90vh">
        <div style="width: 70%" class="mx-auto">
          <v-card-title>About me </v-card-title>
          <div>
            <h2>편리함을 주고싶은 개발자 유준호입니다.</h2>
            <v-card-item>
              <div class="d-flex">
                <v-sheet>
                  <MyBadges />
                </v-sheet>
                <v-sheet class="ml-4">
                  <MyBadges />
                </v-sheet>
              </div>
            </v-card-item>

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
          </div>
          <h2>My Commits</h2>
          <img
            src="https://ghchart.rshah.org/yjh-1008"
            class="github_commits"
          />
          <div>
            Show My Github Stack!
            <v-icon icon="mdi-chevron-down" />
          </div>
        </div>
      </v-card>
    </v-window-item>
    <v-window-item :key="2">
      <v-card width="50%">
        <div>section 1</div>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyBadges from "@/components/MyBadges.vue";
import { useStore } from "vuex";
import { getProfile } from "@/models/pofol";
import DevProjects from "@/components/DevProjects.vue";
const store = useStore();
const windows = ref(-1);
const pdf = ref();
// onMounted(async () => {});
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

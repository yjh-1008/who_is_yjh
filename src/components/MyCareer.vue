<template>
  <v-card
    style="background-color: #bdbdbd"
    width="50%"
    height="30vh"
    class="mx-auto my-8"
  >
    <v-card-title>
      <div>미디어로그</div>
      <div class="date">2023-04-17 ~</div>
    </v-card-title>
    <hr />
    <div class="d-flex flex-row mx-auto justify-center">
      <v-img
        class="ml-5"
        height="20vh"
        width="200px"
        :src="require('@/assets/images/medialog.jpeg')"
        cover
      />
      <v-card-text>
        미디어로그에서 NW 개발팀의 FE Developer 활동했습니다. 네트워크 상태를
        확인하는 웹 사이트와 데이터베이스를 관리할 수 있는 프로젝트에
        참여하였습니다.
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup lang="ts">
// import medialog from "@/assets/images/medialog.jpeg";
</script>

<style scoped>
.date {
  font-size: 14px;
}
</style>

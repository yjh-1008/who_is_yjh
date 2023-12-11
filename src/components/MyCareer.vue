<template>
  <v-card
    style="background-color: #546e7a"
    width="30%"
    rounded
    elevation="16"
    class="mx-auto my-5"
    variant="elevated"
  >
    <v-img
      class="align-end"
      height="350"
      :src="require('@/assets/images/medialog.png')"
      cover
    >
      <v-card-title> 미디어로그 </v-card-title>
    </v-img>
    <v-card-subtitle class="py-1" style="color: white; font-weight: bold"
      >2023-04-17 ~ 2024~06-17</v-card-subtitle
    >
    <hr />
    <v-card-text style="color: white; font-weight: bold">
      <div>
        미디어로그에서 NW 개발팀의 FE Developer 활동했습니다. 네트워크 상태를
        확인하는 웹 사이트와 데이터베이스를 관리할 수 있는 프로젝트에
        참여했습니다.미디어로그에서 NW 개발팀의 FE Developer 활동했습니다.
        네트워크 상태를 확인하는 웹 사이트와 데이터베이스를 관리할 수 있는
        프로젝트에 참여했습니다.미디어로그에서 NW 개발팀의 FE Developer
        활동했습니다. 네트워크 상태를 확인하는 웹 사이트와 데이터베이스를 관리할
        수 있는 프로젝트에 참여했습니다.
      </div>
    </v-card-text>
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

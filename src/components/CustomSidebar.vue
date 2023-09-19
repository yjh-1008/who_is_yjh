<template>
  <SidebarMenu :menu="menu" :hideToggle="true" style="max-width: 290px">
    <template v-slot:header>
      <div class="sidebar_header pl-6 py-5">
        <div>
          <img
            width="100"
            height="100"
            :src="require('@/assets/images/profile.webp')"
            class="sidebar_profile"
            fetchpriority="high"
          />
        </div>
        <h2>JJunBLOG</h2>
        <div class="subline">Frontend Developer/Algorithm, Frontend Study</div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="sidebar_footer mb-10">
        <v-icon
          @click="connect('mailTo:exesea12@gmail.com')"
          size="x-large"
          color="white"
          >mdi-mail</v-icon
        >
        <v-icon @click="connect(github)" size="x-large" color="white"
          >mdi-github</v-icon
        >
        <v-icon :to="loginURL" size="x-large" color="white">mdi-github</v-icon>
      </div>
    </template>
    <template v-slot:toggle-icon></template>
  </SidebarMenu>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { github } from "@/utils/profileLink";
import { SidebarMenu } from "vue-sidebar-menu";
import router from "@/router";
const connect = (url: string) => {
  window.location.href = url;
};
const menu = reactive([
  {
    href: "/",
    title: "Home",
    icon: {
      element: "v-icon",
      attributes: {
        icon: "mdi-home",
      },
    },
  },
  {
    href: "/about_me",
    title: "About me",
    icon: {
      element: "v-icon",
      attributes: {
        icon: "mdi-account",
      },
    },
  },
]);
const callbackURL = "http://localhost:3000/callback";
const loginURL = `https://github.com/login/oauth/authorize?client_id=4cbe74a4e3199244ad4b&scope=repo:status read:repo_hook user:email&redirect_uri=${callbackURL}`;
const auth = () => {
  // location.href(loginURL);
};
</script>

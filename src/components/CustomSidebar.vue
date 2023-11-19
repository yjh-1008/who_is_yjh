<template>
  <SidebarMenu :menu="menu" :hideToggle="true">
    <template v-slot:header>
      <div class="sidebar_header py-5">
        <div style="text-align: center" class="mt-10">
          <img
            width="200"
            height="200"
            :src="require('@/assets/images/profile.webp')"
            fetchpriority="high"
          />
        </div>
        <div class="mx-10">
          <h3>JJunBLOG</h3>
          <h5>Frontend Developer/Algorithm</h5>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="sidebar_footer mb-10 mx-auto">
        <v-icon
          @click="connect('mailTo:exesea12@gmail.com')"
          size="x-large"
          color="white"
          >mdi-mail</v-icon
        >
        <v-icon
          @click="connect(github)"
          size="x-large"
          color="white"
          class="mx-5"
          >mdi-github</v-icon
        >
        <v-icon
          @click="connect('https://www.instagram.com/db_wnsgh/')"
          size="x-large"
          color="white"
          >mdi-instagram</v-icon
        >
      </div>
    </template>
    <template v-slot:toggle-icon></template>
  </SidebarMenu>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, nextTick } from "vue";
import { github } from "@/utils/profileLink";
import { SidebarMenu, SidebarItem } from "vue-sidebar-menu";
import { useStore } from "vuex";
import { useDatabase } from "@/composable/useDatabase";
const connect = (url: string) => {
  window.location.href = url;
};
const { getCategories } = useDatabase();
const store = useStore();
const menu = reactive<SidebarItem[]>([
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
    title: "Content",
    icon: {
      element: "v-icon",
      attributes: {
        icon: "mdi-note-text-outline",
      },
    },
    child: [],
  },
  {
    title: "Hobby",
    icon: {
      element: "v-icon",
      attributes: {
        icon: "mdi-controller-classic-outline",
      },
    },
    child: [],
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
onBeforeMount(async () => {
  await nextTick(async () => {
    let childItems: SidebarItem[] = [];
    const hobbyItems: SidebarItem[] = [];
    await getCategories().then((data) => {
      const ret = data.val() as string[];
      childItems = ret.map((v: string) => {
        return {
          href: `/search/category/${v}`,
          title: v,
        };
      });
    });
    await getCategories().then((data) => {
      const ret = data.val() as string[];
      ret.forEach((v: string) => {
        hobbyItems.push({
          href: `/search/category/${v}`,
          title: v,
        });
      });
    });
    menu.forEach((data) => {
      console.log(data.title);
      if (data.title === "Content") {
        data.child = childItems;
      } else if (data.title === "Hobby") {
        data.child = hobbyItems;
      }
    });
  });
});
const callbackURL = "http://localhost:3000/callback";
const loginURL = `https://github.com/login/oauth/authorize?client_id=4cbe74a4e3199244ad4b&scope=repo:status read:repo_hook user:email&redirect_uri=${callbackURL}`;
</script>

<style>
.sidebar_header,
.subline {
  color: white;
}
.subline {
  text-align: left;
  padding-left: 10px;
  margin: 10px 10px;
}
</style>

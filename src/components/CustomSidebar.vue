<template>
  <SidebarMenu :menu="menu" :hideToggle="true" showOneChild>
    <template v-slot:header>
      <div class="sidebar_header py-5">
        <div class="mt-4">
          <v-img
            class="mx-auto"
            width="40%"
            cover
            :src="require('@/assets/images/profile.webp')"
            fetchpriority="high"
          />
        </div>
        <div class="mx-10 mt-2">
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
    hiddenOnCollapse: true,
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
    await getCategories().then((data) => {
      const ret = data.val() as string[];
      childItems = ret.map((v: string) => {
        return {
          href: `/search/category/${v}`,
          title: v,
        };
      });
    });
    menu.forEach((data) => {
      if (data.title === "Content") {
        data.child = childItems;
      }
    });
  });
});
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

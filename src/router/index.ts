import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/who_is_yjh",
    name: "home",
    component: HomeView,
  },
  {
    path: "/who_is_yjh/essay",
    component: () => import("@/views/BlogContent.vue"),
  },
  {
    path: "/who_is_yjh/about_me",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/who_is_yjh/edit_content",
    name: "작성페이지",
    component: () => import("@/views/WritePage.vue"),
  },
  {
    path: "/who_is_yjh/content/:id",
    component: () => import("@/views/ContentView.vue"),
  },
  {
    path: "/who_is_yjh/content/update/:id",
    name: "수정페이지",
    component: () => import("@/views/mgmt/UpdatePage.vue"),
  },
  {
    path: "/who_is_yjh/categories/:id",
    component: () => import("@/views/mgmt/CategoryView.vue"),
  },
  {
    path: "/who_is_yjh/search/:type/:id",
    component: () => import("@/views/mgmt/CategoryView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

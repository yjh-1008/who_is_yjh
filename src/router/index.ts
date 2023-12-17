import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/who-is-yjh",
    name: "home",
    component: HomeView,
  },
  {
    path: "/who-is-yjh/essay",
    component: () => import("@/views/BlogContent.vue"),
  },
  {
    path: "/who-is-yjh/about_me",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/who-is-yjh/edit_content",
    name: "작성페이지",
    component: () => import("@/views/WritePage.vue"),
  },
  {
    path: "/who-is-yjh/content/:id",
    component: () => import("@/views/ContentView.vue"),
  },
  {
    path: "/who-is-yjh/content/update/:id",
    name: "수정페이지",
    component: () => import("@/views/mgmt/UpdatePage.vue"),
  },
  {
    path: "/who-is-yjh/categories/:id",
    component: () => import("@/views/mgmt/CategoryView.vue"),
  },
  {
    path: "/who-is-yjh/search/:type/:id",
    component: () => import("@/views/mgmt/CategoryView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/essay",
    component: () => import("@/views/BlogContent.vue"),
  },
  {
    path: "/about_me",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/edit_content",
    component: () => import("@/views/WritePage.vue"),
  },
  {
    path: "/content/:id",
    component: () => import("@/views/ContentView.vue"),
  },
  {
    path: "/content/update/:id",
    component: () => import("@/views/mgmt/UpdatePage.vue"),
  },
  {
    path: "/categories/:id",
    component: () => import("@/views/mgmt/CategoryView.vue"),
  },
  {
    path: "/search/:type/:id",
    component: () => import("@/views/mgmt/CategoryView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

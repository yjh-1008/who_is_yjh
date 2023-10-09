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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/BlogContent.vue"),
  },
  {
    path: "/about_me",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/edit_content",
    component: () => import("@/views/EditContent.vue"),
  },
  {
    path: "/content/:id",
    component: () => import("@/views/ContentView.vue"),
  },
  {
    path: "/content/update/:id",
    component: () => import("@/views/mgmt/UpdatePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/utils/firebaseConfig";

initializeApp(firebaseConfig);
//firebase
const vuetify = createVuetify({
  components,
  directives,
});
createApp(App)
  .use(router)
  .use(VueSidebarMenu)
  .use(store)
  .use(vuetify)
  .mount("#app");

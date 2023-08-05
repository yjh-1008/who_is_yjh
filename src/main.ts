import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createVuetify } from "vuetify";
import { aliases, md } from "vuetify/iconsets/md";

const vuetify = createVuetify({
  icons: {
    defaultSet: "md",
    aliases,
    sets: {
      md,
    },
  },
});

createApp(App).use(router).use(store).use(vuetify).mount("#app");

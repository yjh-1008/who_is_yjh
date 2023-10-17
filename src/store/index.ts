import { createStore } from "vuex";
import { AlDialog } from "@/utils/types";
export default createStore({
  state: {
    authState: null,
    alDialog: {
      state: false,
      title: "",
      content: "",
    },
  },
  getters: {
    getAuthState(state) {
      return state.authState;
    },
    getAlDialog(state) {
      return state.alDialog;
    },
  },
  mutations: {
    setAuthState(state, val) {
      state.authState = val;
    },
    setAlDialog(state, obj: AlDialog) {
      state.alDialog.state = obj.state;
      state.alDialog.title = obj.title;
      state.alDialog.content = obj.content;
    },
  },
  actions: {},
  modules: {},
});

import { createStore } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
export default createStore({
  state: {
    authState: false,
  },
  getters: {
    getAuthState(state) {
      return state.authState;
    },
  },
  mutations: {
    setAuthState(state, val) {
      state.authState = val;
    },
  },
  actions: {},
  modules: {},
});

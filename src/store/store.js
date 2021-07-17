import { createStore } from "vuex";
import persistedstate from "vuex-persistedstate";
import { auth } from "./modules/auth";

export const store = createStore({
  modules: {
    auth,
  },
  plugins: [
    persistedstate({
      paths: ["auth"],
    }),
  ],
});

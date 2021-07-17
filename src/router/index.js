import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user.id) {
        return next("/");
      }
      return next();
    },
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/room-form",
    name: "CreateRoom",
    component: () => import("@/views/CreateRoom.vue"),
    meta: {
      authorized: true,
    },
  },
  {
    path: "/chat-room/:id",
    name: "ChatRoom",
    component: () => import("@/views/ChatRoom.vue"),
    meta: {
      authorized: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 로그인 필요함
  if (to.matched.some((record) => record.meta.authorized)) {
    // 로그인이 되어있음
    if (store.state.auth.user.id) {
      return next();
    }
    return next("/signIn");
  } else {
    return next();
  }
});

export default router;

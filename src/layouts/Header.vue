<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">CHAT EXAMPLE</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-if="isLoggedIn" class="nav-item">
            <div class="nav-link" @click="signOut">Sign Out</div>
          </li>
          <li v-else class="nav-item">
            <router-link class="nav-link" :to="{ name: 'SignIn' }">Sign In</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'SignUp' }">Sign Up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "home_header",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => store.state.auth.user.id);
    const signOut = async () => {
      await axios.post("/api/auth/signOut").then(() => {
        store.commit("auth/setUser", {});
        router.push({ name: "Home" });
      });
    };
    return {
      signOut,
      isLoggedIn,
    };
  },
};
</script>

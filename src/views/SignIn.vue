<template>
  <div class="container mt-5" style="width: 500px;">
    <div class="card px-5 bg-light">
      <form @submit.prevent="signIn" class="my-4">
        <div class="mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input type="email" class="form-control" id="email" v-model="email" v-focus required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password1" v-model="password" required />
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button type="submit" class="btn btn-primary float-end">SIGN IN</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const email = ref("");
    const password = ref("");
    const signIn = () => {
      axios.post("/api/auth/signIn", { email: email.value, password: password.value }).then((res) => {
        if (!res.data.error) {
          store.commit("auth/setUser", { id: res.data.id, email: res.data.email });
          router.push({ name: "Home" });
        } else {
          alert(res.data.error);
        }
      });
    };
    return {
      signIn,
      email,
      password,
    };
  },
};
</script>

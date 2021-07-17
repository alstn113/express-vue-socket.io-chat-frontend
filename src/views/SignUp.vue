<template>
  <div class="container mt-5" style="width: 500px;">
    <div class="card px-5 bg-light">
      <form @submit.prevent="signUp" class="my-4">
        <!-- @submit.prevent="함수 이름" -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" v-focus required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password1" v-model="password" required />
        </div>
        <div class="mb-3">
          <label for="passwordConfirm" class="form-label">Password Confirm</label>
          <input type="password" class="form-control" id="passwordConfirm" v-model="passwordConfirm" required />
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button type="submit" class="btn btn-primary">SIGN UP</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const passwordConfirm = ref("");
    const signUp = async () => {
      if (password.value !== passwordConfirm.value) {
        alert("비밀번호를 다시 확인해주세요");
        return;
      }
      await axios.post("/api/auth/signUp", { email: email.value, password: password.value }).then((res) => {
        if (!res.data.error) {
          router.push({ name: "SignIn" });
        } else {
          alert(res.data.error);
        }
      });
    };
    return {
      email,
      password,
      passwordConfirm,
      signUp,
    };
  },
};
</script>

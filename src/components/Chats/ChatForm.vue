<template>
  <div>
    <div class="input-group">
      <input type="text" v-focus v-model="message" class="form-control" placeholder="보낼 내용을 입력하세요" @keyup.enter="submitMessage" />
      <button class="btn btn-secondary" @click="submitMessage">보내기</button>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "ChatForm",
  emits: ["submitMessage"],
  setup(props, context) {
    const store = useStore();
    const message = ref("");
    const submitMessage = () => {
      if (message.value !== "") {
        context.emit("submitMessage", { message: message.value, user: store.state.auth.user.email });
        message.value = "";
      }
    };
    return {
      submitMessage,
      message,
    };
  },
};
</script>

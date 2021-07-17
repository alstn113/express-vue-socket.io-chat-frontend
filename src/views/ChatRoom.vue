<template>
  <div>
    <button class="btn btn-secondary" @click="exit">방 나가기</button>
    <ChatList :chatList="chatList" class="chat-list" />
    <ChatForm @submitMessage="sendMessage" class="chat-form" />
  </div>
</template>

<script>
import ChatForm from "@/components/Chats/ChatForm.vue";
import ChatList from "@/components/Chats/ChatList.vue";
import { getCurrentInstance } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
export default {
  name: "ChatRoom",
  components: {
    ChatForm,
    ChatList,
  },
  setup() {
    const app = getCurrentInstance();
    const socket = app.appContext.config.globalProperties.$socket;
    const route = useRoute();
    const router = useRouter();
    const chatList = ref([]);

    socket.on("chat", (data) => {
      console.log(data);
      chatList.value = [...chatList.value, data];
    });

    const sendMessage = async (message) => {
      await axios.post(`/api/room/${route.params.id}/chat`, { message }).then(() => {
        socket.emit("newMessage", message);
      });
    };

    const load = async () => {
      const response = await axios.get(`/api/room/${route.params.id}/chat`);
      chatList.value = response.data;
    };
    const exit = () => {
      socket.emit("exitRoom", { id: route.params.id });
      router.push({ name: "Home" });
    };
    onMounted(() => load());

    return {
      socket,
      sendMessage,
      chatList,
      load,
      exit,
    };
  },
};
</script>

<style>
.chat-form {
  bottom: 15px;
  position: absolute;
  left: 0;
  right: 0;
}
.chat-list {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 60px;
  overflow-y: scroll;
}
</style>

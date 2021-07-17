<template>
  <RoomForm @CreateRoom="CreateRoom" />
</template>
<script>
import { getCurrentInstance } from "vue";
import RoomForm from "@/components/Rooms/RoomForm.vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "CreateRoom",
  components: {
    RoomForm,
  },
  setup() {
    const app = getCurrentInstance();
    const socket = app.appContext.config.globalProperties.$socket;
    const router = useRouter();
    const CreateRoom = async (room) => {
      await axios.post(`/api/room`, { room }).then((res) => {
        socket.emit("userJoined", { id: res.data.id });
        return router.push({
          name: "ChatRoom",
          params: { id: res.data.id },
          query: { password: res.data.password },
        });
      });
    };
    return {
      CreateRoom,
    };
  },
};
</script>

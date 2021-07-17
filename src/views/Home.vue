<template>
  <div>
    <div><router-link :to="{ name: 'CreateRoom' }">방 만들기</router-link></div>
    <div><RoomList :roomList="roomList" @enter="enterRoom" /></div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import RoomList from "@/components/Rooms/RoomList.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    RoomList,
  },
  name: "Home",
  setup() {
    const app = getCurrentInstance();
    const socket = app.appContext.config.globalProperties.$socket;
    const roomList = ref([]);
    const router = useRouter();

    socket.on("newRoom", (data) => {
      roomList.value = [...roomList.value, data];
    });
    const load = async () => {
      const response = await axios.get("/api/room");
      roomList.value = response.data;
    };
    const enterRoom = async (data) => {
      if (data.room.password !== "") {
        var password = prompt("비밀번호를 입력해주세요.");
      }
      const response = await axios.get(`/api/room/${data.room.id}?password=${password}`);

      if (response.data.status === 400) {
        const msg = decodeURIComponent(response.data.msg);
        alert(msg);
      } else if (response.data.status === 200) {
        router.push({
          name: "ChatRoom",
          params: { id: data.room.id },
          query: { password: data.room.password },
        });
        socket.emit("userJoined", { id: data.room.id });
      }
    };
    onMounted(() => load());

    return {
      socket,
      roomList,
      enterRoom,
    };
  },
};
</script>

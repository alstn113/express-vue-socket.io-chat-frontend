<template>
  <div>
    <h1>채팅방 생성</h1>
    <div class="container mt-5" style="width: 500px;">
      <div class="card px-5 bg-light">
        <form @submit.prevent="CreateRoom()" class="my-4">
          <div class="mb-3">
            <label for="title" class="form-label">방 제목</label>
            <input type="text" class="form-control" id="title" v-model="room.title" required />
          </div>
          <div class="mb-3">
            <label for="max" class="form-label">수용 인원(최소 2명 최대 9명)</label>
            <input type="number" class="form-control" min="2" max="9" id="max" v-model="room.max" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호(없으면 공개방)</label>
            <input type="password" class="form-control" id="password" v-model="room.password" />
          </div>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-primary float-end">생성</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "RoomForm",
  emits: ["CreateRoom"],
  setup(props, context) {
    const store = useStore();
    const room = reactive({
      title: "",
      max: 4,
      password: "",
      owner: store.state.auth.user.email,
    });
    const CreateRoom = () => {
      context.emit("CreateRoom", room);
    };
    return {
      CreateRoom,
      room,
    };
  },
};
</script>

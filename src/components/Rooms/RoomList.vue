<template>
  <div>
    <div class="mx-5 my-5">
      <table class="table table-bordered align-middle text-center">
        <thead>
          <tr>
            <th>방 제목</th>
            <th>방장</th>
            <th>종류</th>
            <th>허용인원</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(room, i) in roomList">
            <td>{{ room.title }}</td>
            <td>{{ room.owner }}</td>
            <td v-if="room.password !== ''">비밀방</td>
            <td v-else>공개방</td>
            <td>{{ room.max }}</td>
            <td><button class="btn btn-secondary" @click="enter(room)">입장</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomList",
  props: ["roomList"],
  emits: ["enter"],
  setup(props, context) {
    const enter = (room) => {
      context.emit("enter", { room });
    };
    return {
      enter,
    };
  },
};
</script>

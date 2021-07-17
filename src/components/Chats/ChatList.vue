<template>
  <div v-auto-bottom="chatList">
    <div :key="i" v-for="(chat, i) in chatList" class="text-center mb-2">
      <div>{{ chat.user }}</div>
      <div>{{ chat.chat }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatList",
  props: ["chatList"],
  setup() {},
};
</script>

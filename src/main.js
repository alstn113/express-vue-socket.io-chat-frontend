import { createApp } from "vue";
import io from "socket.io-client";

import App from "./App.vue";
import router from "./router";
import directives from "./plugins/directives";
import { store } from "./store/store";

const socket = io("http://localhost:3000/room", { transports: ["websocket"] });
const app = createApp(App);

app.config.globalProperties.$socket = socket;

app.use(router);
app.use(directives);
app.use(store);
app.mount("#app");

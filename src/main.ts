import { createApp, h } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers";
import Card from "./components/Card.vue";
import Spin from "ant-design-vue/lib/spin";

const app = createApp({
  render: () => h(App),
});

const antdComponents = [Spin];

antdComponents.forEach((component: any) => app.use(component));

app.component("card", Card);

app.use(router);
app.mount("#app");

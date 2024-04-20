import router from "@/router/index.js"

import "@/styles/ress.css";

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router);
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/plugins/axios_plugin.js'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

var app = createApp(App)
const toast_options = {
    // You can set your default options here
};
app.use(Toast,toast_options);

app.use(axios,{
    'baseUrl':'http://127.0.0.1:8000'
})
app.config.devtools = true
app.use(store)
app.use(router)
app.mount('#app')
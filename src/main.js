import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/plugins/axios_plugin.js'
import ToastPlugin from 'vue-toast-notification';

var app = createApp(App)
app.use(ToastPlugin);

app.use(axios,{
    'baseUrl':'http://127.0.0.1:8000'
})
app.use(store)
app.use(router)
app.mount('#app')
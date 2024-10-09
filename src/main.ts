import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './interfaces/router/index'
import axiosInstance from './plugins/axios'

const app = createApp(App)

app.config.globalProperties.$axios = axiosInstance

app.use(createPinia())
app.use(router)

app.mount('#app')

import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import './styles/index.css'
import 'element-plus/dist/index.css'
import '/node_modules/augmented-ui/augmented-ui.min.css'
import 'swiper/css'
import './styles/custom.css'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

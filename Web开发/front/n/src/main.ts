import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import router from './router'
import App from './App.vue'
import * as Icons from '@ant-design/icons-vue';
import 'ant-design-vue/dist/reset.css'
import '@/styles/antd.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Antd)

// 自动注册所有图标组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.mount('#app')
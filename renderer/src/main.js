import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 页面
import LoginWindow from './components/LoginWindow.vue'
import FrameWindow from './components/FrameWindow.vue'
import MainView from './components/MainView.vue'   // ← 新增

const routes = [
    { path: '/', component: MainView },       // ← 改为 MainView
    { path: '/login', component: LoginWindow },
    { path: '/frame', component: FrameWindow }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')

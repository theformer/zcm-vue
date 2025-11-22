import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 页面
import LoginWindow from './views/LoginWindow.vue'
import FrameWindow from './views/FrameWindow.vue'
import MainView from './views/MainView.vue'
import SettingPage from './views/accounting/SettingPage.vue'

// ========= 路由表 =========
export const routes = [
    { path: '/', component: MainView },
    { path: '/login', component: LoginWindow },
    { path: '/frame', component: FrameWindow },
    { path: '/setting', component: SettingPage }
]

// ========= 路由实例 =========
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// ========= 挂载应用 =========
createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')

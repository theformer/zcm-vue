<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ！！！ router 必须在 <script setup> 中声明
const router = useRouter()

onMounted(() => {
  // 登录成功监听（可选）
  window.electronAPI?.onLoginSuccess?.((data) => {
    console.log("登录成功：来自主进程推送", data)
  })

  // ★★★ 重点：来自主进程的页面跳转事件
  window.electronAPI?.onRouterNavigate?.((page) => {
    console.log("收到主进程跳转到：", page)
    router.push(page)  // ← 100% 不会 undefined
  })
})
</script>

<style>
</style>

<template>
  <router-view></router-view>
</template>

<script>
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
      if (window.electronAPI?.onLoginSuccess) {
        window.electronAPI.onLoginSuccess((data) => {
          console.log("登录成功：来自主进程推送", data)
        })
      }
    })
  },
  components: {},
}
</script>

<style>
/* 可留空，或写全局样式 */
</style>

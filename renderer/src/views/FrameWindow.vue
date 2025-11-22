<template>
  <div class="frame-window">

    <!-- ======= 自定义标题栏 ======= -->
    <div class="title-bar" @dblclick="toggleMax">
      <div class="title-left">
<!--        <img src="/logo.png" class="logo" />-->
        <span class="title">招财狗框架</span>
      </div>

      <div class="title-center">
        <el-menu
            mode="horizontal"
            :default-active="active"
            @select="onMenuSelect"
            class="top-menu"
        >
          <el-menu-item index="log">运行日志</el-menu-item>
          <el-menu-item index="list">账号列表</el-menu-item>
          <el-menu-item index="setting">系统设置</el-menu-item>
        </el-menu>
      </div>

      <div class="title-right">
        <span class="version">Ver. zc25.10.23</span>

        <el-button type="warning" size="small" @click="openLogin">
          开始游戏
        </el-button>

        <!-- 控制按钮 -->
        <div class="window-btns">
          <div class="btn" @click="minimize">—</div>
          <div class="btn close" @click="closeWindow">×</div>
        </div>
      </div>
    </div>

    <!-- ======= 内容区域 ======= -->
    <div class="content-area">

      <!-- 示例：账号列表表格 -->
      <el-table :data="tableData" height="100%" border>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="wwid" label="wwid" width="150" />
        <el-table-column prop="group" label="群号" width="120" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="auto" label="自动" width="60" />
        <el-table-column prop="account" label="账号" />
      </el-table>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const active = ref("list");

const tableData = ref([
  {
    id: 1,
    name: "贝塔最新版",
    wwid: "364915604",
    group: "11111",
    status: "登录成功",
    auto: "x",
    account: "1845068234"
  }
]);

function onMenuSelect(key) {
  active.value = key;
}

function openLogin() {
  window.electronAPI.openLoginWindow();
}

function minimize() {
  window.electronAPI.winMinimize();
}

function closeWindow() {
  window.electronAPI.winClose();
}

function toggleMax() {
  window.electronAPI.winToggleMax();
}
</script>

<style scoped>
.frame-window {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}

.title-bar {
  height: 50px;
  background: #21a39a;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  -webkit-app-region: drag;
}

.title-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  width: 28px;
  height: 28px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.title-center {
  flex: 1;
  margin-left: 40px;
  -webkit-app-region: no-drag;
}

.top-menu {
  background: transparent;
  border-bottom: none;
}
.top-menu >>> .el-menu-item {
  color: #fff;
  font-size: 14px;
}

.top-menu >>> .el-menu-item.is-active {
  background: rgba(255, 255, 255, 0.25);
}

.title-right {
  display: flex;
  align-items: center;
  gap: 10px;
  -webkit-app-region: no-drag;
}

.version {
  font-size: 12px;
  opacity: 0.9;
}

.window-btns {
  display: flex;
  margin-left: 8px;
}

.btn {
  width: 32px;
  height: 24px;
  text-align: center;
  line-height: 22px;
  font-size: 18px;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.close:hover {
  background: #ff4d4f;
}

.content-area {
  height: calc(100% - 50px);
}
</style>

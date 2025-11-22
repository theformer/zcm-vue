<template>
  <div class="app-container">

    <el-card shadow="never" class="card-section" style="margin-bottom: 12px;">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="账单设置" name="bill">
          <BillSettingAdvanced />
        </el-tab-pane>
        <el-tab-pane label="下注处理" name="bet">
          <div class="placeholder">下注处理开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="玩法赔率设置" name="rate">
          <div class="placeholder">玩法赔率设置开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="自动回复" name="rate">
          <div class="placeholder">玩法赔率设置开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="黑名单/刷屏检测" name="rate">
          <div class="placeholder">玩法赔率设置开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="名片" name="return">
          <div class="placeholder">回水设置开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="托管设置" name="chat">
          <div class="placeholder">聊天检测开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="送分活动" name="chat">
          <div class="placeholder">聊天检测开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="托设置" name="chat">
          <div class="placeholder">聊天检测开发中...</div>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="chat">
          <div class="placeholder">聊天检测开发中...</div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import BillSettingAdvanced from "./components/BillSettingAdvanced.vue";

export default {
  components: { BillSettingAdvanced },
  data() {
    return {
      activeTab: "bill",
    };
  },
};
</script>

<style scoped>
.app-container {
  padding: 15px;
  background: #f5f6fa;
}

.placeholder {
  padding: 20px;
  color: #888;
  font-size: 14px;
}
</style>

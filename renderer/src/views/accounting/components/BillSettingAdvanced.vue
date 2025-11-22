<template>
  <div class="bill-setting-page">
    <!-- 顶部：账单设置 + 右侧基本设置 -->
    <el-row :gutter="16">
      <!-- 左侧：发送设置 / 模板 -->
      <el-col :span="14">
        <el-card shadow="never" class="card-section">
          <div class="card-title">账单设置</div>

          <!-- 第一行：开奖发送 / 带R / 图片发送 -->
          <el-row class="mt-6" :gutter="8">
            <el-col :span="6">
              <el-checkbox v-model="form.autoSend">开奖发送 ↓</el-checkbox>
            </el-col>
            <el-col :span="4">
              <el-checkbox v-model="form.withR">带R</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="form.imageSendTop">图片发送</el-checkbox>
            </el-col>
          </el-row>

          <!-- 模板小行 -->
          <el-row class="mt-8">
            <el-col :span="24">
              <el-input
                  type="textarea"
                  rows="2"
                  v-model="form.shortTemplate"
                  placeholder="[开： [一区] + [二区] + [三区] = [开奖号码] 第[期数]期]"
              />
            </el-col>
          </el-row>

          <!-- 账单内容 + 账单格式 控件行 -->
          <el-row class="mt-12" :gutter="8" align="middle">
            <el-col :span="6" class="label-line">
              <span>账单内容 ↓</span>
            </el-col>

            <el-col :span="7">
              <div class="label-inline">
                账单格式 横
                <el-input-number
                    v-model="form.formatCols"
                    :min="1"
                    :max="10"
                    size="small"
                    style="margin-left: 8px"
                />
              </div>
            </el-col>

            <el-col :span="6">
              <el-checkbox v-model="form.enableImageSend">图片发送（下）</el-checkbox>
            </el-col>

            <el-col :span="6">
              <el-checkbox v-model="form.openTemplatePrivateReply">开奖账单私聊回复</el-checkbox>
            </el-col>
          </el-row>

          <!-- 主模板 -->
          <el-row class="mt-8">
            <el-col :span="24">
              <el-input
                  type="textarea"
                  rows="6"
                  v-model="form.template"
                  placeholder="在这里编辑您的账单模板，支持占位符：{uid} {bet} {remain} {time}、[一区] [二区] [三区] 等"
              />
            </el-col>
          </el-row>

          <!-- 账单选项 -->
          <el-row :gutter="12" class="mt-10 options-row">
            <el-col :span="8">
              <el-checkbox v-model="form.groupSend">群作业账单发送</el-checkbox>
            </el-col>

            <el-col :span="8">
              <el-checkbox v-model="form.hideIfBankrupt">[账单]不显示输光玩家</el-checkbox>
            </el-col>

            <el-col :span="8">
              <el-checkbox v-model="form.noZeroRemove">零分不删除账单</el-checkbox>
            </el-col>

            <el-col :span="8">
              <el-checkbox v-model="form.keepRecentOnly">只保留近 N 期群作业</el-checkbox>
            </el-col>

            <el-col :span="4">
              <el-input-number
                  v-model="form.keepRecentN"
                  :min="1"
                  :max="100"
                  size="small"
              />
            </el-col>

            <el-col :span="8">
              <el-checkbox v-model="form.autoJoinAgree">账单玩家进群自动同意</el-checkbox>
            </el-col>

            <el-col :span="10" class="align-center mt-4">
              账单不足
              <el-input-number v-model="form.fillWidth" size="small" style="margin:0 6px"/>
              位用 0 补齐
            </el-col>

            <el-col :span="10" class="align-center mt-4">
              [账单] 小于
              <el-input-number v-model="form.hideIfLessThan" size="small" style="margin:0 6px"/>
              不显示
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 右侧：基本设置 / 禁言核对 / 消息反馈 -->
      <el-col :span="10">
        <el-card shadow="never" class="card-section">
          <div class="card-title">基本设置</div>

          <!-- 管理旺旺号 -->
          <el-row class="mt-6">
            <el-col :span="24">
              <div class="line-label">管理旺旺号</div>
              <el-input
                  type="textarea"
                  rows="3"
                  v-model="form.managerIds"
                  placeholder="多个管理号用 @ 分隔"
              />
            </el-col>
          </el-row>

          <!-- 管理说明 -->
          <el-row class="mt-4">
            <el-col :span="24">
              <div class="small-note">
                管理员：对机器人有绝对控制权，多个管理号用 @ 分隔
              </div>
            </el-col>
          </el-row>

          <!-- 群号绑定 -->
          <el-row :gutter="12" class="mt-10">
            <el-col :span="8" class="line-label">绑定群号</el-col>
            <el-col :span="16">
              <el-input
                  size="small"
                  v-model="form.groupId"
                  placeholder="填写群号"
              />
            </el-col>
          </el-row>

          <!-- 管理按钮 -->
          <el-row class="mt-10">
            <el-col :span="24">
              <el-button type="primary" size="small" @click="saveManager">
                保存管理号和群号
              </el-button>

              <el-button size="small" @click="showMemberRecords">
                查看群成员邀请记录
              </el-button>
            </el-col>
          </el-row>

          <!-- 禁言 / 核对 -->
          <div class="card-title mt-12">禁言 / 核对</div>

          <!-- 封盘前禁止发言 -->
          <el-row :gutter="12" class="mt-6">
            <el-col :span="14">
              <div class="line">
                <div class="line-label">封盘前</div>
                <el-input-number
                    v-model="form.muteBeforeSec"
                    :min="0"
                    :max="600"
                    size="small"
                />
                <div class="line-tip">秒（提前禁言）</div>
              </div>
            </el-col>
          </el-row>

          <!-- 计时发送下注数据 -->
          <el-row :gutter="12" class="mt-6">
            <el-col :span="14">
              <el-checkbox v-model="form.countdownSend">
                计时发送下注数据
              </el-checkbox>
              <el-input-number
                  v-model="form.countdownSec"
                  :min="1"
                  :max="60"
                  size="small"
                  style="margin-left: 8px"
              />
              秒
            </el-col>
          </el-row>

          <!-- 图片发送 + 群作业发送 -->
          <el-row :gutter="12" class="mt-6">
            <el-col :span="12">
              <el-checkbox v-model="form.optionImageSend">图片发送</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="form.optionGroupSend">群作业发送</el-checkbox>
            </el-col>
          </el-row>

          <!-- 设置下注内容按钮 -->
          <el-row class="mt-10">
            <el-col :span="24">
              <el-button size="small" @click="openSetBetContent">
                设置下注数据内容
              </el-button>
            </el-col>
          </el-row>

          <!-- 消息反馈 -->
          <div class="card-title mt-12">消息反馈</div>

          <el-form label-position="top" class="mt-6">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item label="旺旺号">
                  <el-input size="small" v-model="form.msgWang" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="群号">
                  <el-input size="small" v-model="form.msgGroup" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 勾选项 -->
            <div class="mt-6">
              <el-checkbox v-model="form.feedbackToWang">
                反馈到旺旺号
              </el-checkbox>

              <el-checkbox v-model="form.feedbackToGroup">
                反馈到群里
              </el-checkbox>
            </div>

            <div class="mt-6">
              <el-checkbox v-model="form.feedbackBetCheck">下注核对反馈</el-checkbox>
              <el-checkbox v-model="form.feedbackSum">下注汇总反馈</el-checkbox>
              <el-checkbox v-model="form.feedbackProfit">开奖盈利反馈</el-checkbox>
              <el-checkbox v-model="form.feedbackSendBill">发送账单反馈</el-checkbox>
            </div>

            <!-- 测试按钮 -->
            <div class="mt-8">
              <el-button size="small" @click="testFeedback">
                测试消息反馈
              </el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!-- 下方：账单替换命令 / 操作 -->
    <el-row class="mt-16">
      <el-col :span="24">
        <el-card shadow="never" class="card-section">
          <div class="card-title">账单替换命令 / 操作</div>

          <!-- 命令输入区 -->
          <el-row class="mt-8">
            <el-col :span="12">
              <el-input
                  type="textarea"
                  :rows="10"
                  v-model="commandsText"
                  placeholder="一行一个命令，例如：[一区] 自动替换为 开奖第一个号码"
              />
            </el-col>
            <el-col :span="12">
              <div class="sub-title">历史（预览）</div>
              <div class="history-box">
                <div v-for="(c, idx) in commandsList" :key="idx" class="history-line">{{ c }}</div>
              </div>
            </el-col>
          </el-row>

          <!-- 保存按钮 -->
          <div class="footer-actions">
            <el-button type="primary" @click="saveAll">保存设置</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 下注数据弹窗 -->
    <el-dialog
        title="设置下注数据内容"
        v-model="dialogSetBet.visible"
        width="600px"
    >
      <el-input
          type="textarea"
          :rows="8"
          v-model="dialogSetBet.content"
      />
      <template #footer>
        <el-button @click="dialogSetBet.visible = false">取消</el-button>
        <el-button type="primary" @click="saveBetContent">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BillSettingAdvanced",
  data() {
    return {
      form: {
        autoSend: true,
        withR: false,
        imageSendTop: false,
        shortTemplate: "开： [一区] + [二区] + [三区] = [开奖号码] 第[期数]期",
        template:
            "开：[一区] + [二区] + [三区] = [开奖号码] [大小单双] 第[期数]期\n人数: [客户人数]\n[账单]",
        formatCols: 4,
        groupSend: true,
        hideIfBankrupt: false,
        keepRecentOnly: true,
        keepRecentN: 10,
        noZeroRemove: false,
        autoJoinAgree: true,
        fillWidth: 4,
        hideIfLessThan: 0,
        openTemplatePrivateReply: false,
        enableImageSend: false,
        managerIds: "",
        groupId: "",
        muteBeforeSec: 0,
        countdownSend: true,
        countdownSec: 10,
        optionImageSend: false,
        optionGroupSend: true,
        msgWang: "",
        msgGroup: "",
        feedbackToWang: false,
        feedbackToGroup: true,
        feedbackBetCheck: true,
        feedbackSum: false,
        feedbackProfit: true,
        feedbackSendBill: true
      },

      commandsText: `[一区] 自动替换为 开奖第一个号码
[二区] 自动替换为 开奖第二个号码
[三区] 自动替换为 开奖第三个号码
[开奖号] 自动替换为 开奖总和数字`,

      dialogSetBet: {
        visible: false,
        content: "示例：\n大：0\n小：0\n单双：0\n…"
      }
    };
  },
  computed: {
    commandsList() {
      return this.commandsText.split(/\r?\n/).filter(Boolean);
    }
  },
  methods: {
    saveManager() {
      const payload = {
        managerIds: this.form.managerIds,
        groupId: this.form.groupId
      };
      localStorage.setItem("bill_manager", JSON.stringify(payload));
      this.$message.success("管理号 / 群号已保存");
    },

    showMemberRecords() {
      this.$message.info("查看群成员邀请记录（示例）");
      console.log("查看群成员邀请记录（示例）");
    },

    openSetBetContent() {
      this.dialogSetBet.visible = true;
    },

    saveBetContent() {
      this.dialogSetBet.visible = false;
      this.$message.success("下注数据内容已保存");
      console.log("下注数据:", this.dialogSetBet.content);
    },

    testFeedback() {
      const toWang = this.form.feedbackToWang ? this.form.msgWang || "(未填写)" : "(未启用)";
      const toGroup = this.form.feedbackToGroup ? this.form.msgGroup || "(未填写)" : "(未启用)";
      this.$message.info(`测试反馈 -> 旺旺: ${toWang} / 群: ${toGroup}`);
      console.log("测试消息反馈", {toWang, toGroup});
    },

    saveAll() {
      const data = {
        form: this.form,
        commandsText: this.commandsText,
        betContent: this.dialogSetBet.content
      };
      localStorage.setItem("bill_settings", JSON.stringify(data));
      this.$message.success("设置已保存");
      console.log("Saved settings:", data);
    },

    loadDefaults() {
      const raw = localStorage.getItem("bill_settings");
      if (raw) {
        try {
          const data = JSON.parse(raw);
          this.form = Object.assign({}, this.form, data.form || {});
          this.commandsText = data.commandsText || this.commandsText;
          this.dialogSetBet.content = data.betContent || this.dialogSetBet.content;
          this.$message.success("已加载本地设置");
        } catch (e) {
          console.error(e);
          this.$message.error("加载失败");
        }
      }
    }
  },
  mounted() {
    this.loadDefaults();
  }
};
</script>

<style scoped>
.bill-setting-page {
  padding: 16px;
  background: #f4f6f9;
  min-height: 100vh;
  box-sizing: border-box;
}

/* card */
.card-section {
  border-radius: 8px;
  padding: 18px;
  background: #fff;
}

/* titles */
.card-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}
.sub-title {
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

/* spacing helpers */
.mt-4 { margin-top: 4px; }
.mt-6 { margin-top: 6px; }
.mt-8 { margin-top: 8px; }
.mt-10 { margin-top: 10px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }

/* form helpers */
.line {
  display: flex;
  align-items: center;
  gap: 8px;
}
.line-label {
  font-size: 13px;
  color: #666;
  width: 96px;
}
.line-tip {
  color: #aaa;
  font-size: 12px;
}
.small-note {
  font-size: 12px;
  color: #999;
}
.label-inline {
  display:flex;
  align-items:center;
  gap:8px;
}
.label-line {
  display:flex;
  align-items:center;
  gap:8px;
}

/* history */
.history-box {
  border: 1px solid #eee;
  height: 220px;
  overflow: auto;
  padding: 8px;
  background: #fff;
}
.history-line {
  padding: 6px 4px;
  border-bottom: 1px dashed #f1f1f1;
  font-size: 13px;
  color: #333;
}

/* footer actions */
.footer-actions {
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
}

/* small align helpers */
.align-center {
  display:flex;
  align-items:center;
  justify-content:flex-start;
}
.options-row .el-checkbox {
  margin-bottom: 6px;
}

/* aesthetics */
.el-card {
  box-shadow: none;
}

/* responsive tweak */
@media (max-width: 1000px) {
  .bill-setting-page { padding: 12px; }
  .card-section { padding: 14px; }
}
</style>

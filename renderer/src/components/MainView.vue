<template>
  <div class="app-container">

    <!--    &lt;!&ndash; 顶部工具栏 &ndash;&gt;-->
    <!--    <el-card shadow="never" class="card-section">-->
    <!--      <div class="toolbar" style="width: 100%">-->
    <!--        <div class="menu-buttons">-->
    <!--          <el-button-->
    <!--              v-for="t in topMenu"-->
    <!--              :key="t"-->
    <!--              type="primary"-->
    <!--              size="small"-->
    <!--              @click="onMenu(t)"-->
    <!--          >-->
    <!--            {{ t }}-->
    <!--          </el-button>-->
    <!--        </div>-->

    <!--        <div class="toolbar-right">-->
    <!--          <el-checkbox v-model="opts.enableGroup">已连框架</el-checkbox>-->
    <!--          <el-checkbox v-model="opts.stopThisRound">上下分窗</el-checkbox>-->
    <!--          <el-checkbox v-model="opts.supportNickname">查看账号信息</el-checkbox>-->
    <!--          <div style="display: inline-block;color: red;margin-left: 5px">F10隐藏显示窗口</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </el-card>-->

    <el-row :gutter="12" style="margin-top:12px;">

      <!-- 左：开奖显示 -->
      <el-col :span="7">
        <el-card style="height: 262px!important;" class="card-section" shadow="never">
          <lottery-display :round="currentRound" :nums="nums"/>
        </el-card>
      </el-col>

      <!-- 右侧功能区 -->
      <el-col :span="17">
        <el-card  style="height: 262px!important;" class="card-section" shadow="never">

          <!-- 左侧功能按钮 -->
          <el-col :span="10" class="section-center compact-btn-container">
            <div class="compact-btn-grid">
              <el-button plain style="width: 100px" @click="sendBill">发送账单</el-button>
              <el-button plain @click="importBill">导入账单</el-button>
              <el-button plain @click="importBet">导入下注</el-button>


              <el-button plain style="width: 100px" @click="importBet">复制账单</el-button>
              <el-button plain @click="clearBet">清空下注</el-button>
              <el-button plain @click="fixOpen">修正开奖</el-button>


              <el-button plain style="width: 100px" @click="sumBet">下注汇总</el-button>
              <el-button plain @click="manualCharge">清除零分</el-button>
              <el-button plain @click="manualCharge">导出账单</el-button>


              <el-button plain style="width: 100px" @click="detailBill">详情盈利</el-button>
              <el-button plain @click="historyBill">删除账单</el-button>
              <el-button plain @click="historyBill">历史账单</el-button>
            </div>
          </el-col>

          <!-- 中间：开奖选择 + 通道 -->
          <el-col :span="6" class="right-col">
            <div class="select-row">
              <div style="color: red;width: 65px;text-align: end">开奖选择</div>
              <el-select placeholder="选择模式" disabled style="width:60%; margin:0 0 0 10px;">
                <el-option label="加大" value="1"/>
                <el-option label="减大" value="2"/>
              </el-select>
            </div>

            <div class="select-row">
              <div style="color: red;width: 65px;text-align: end">通道</div>
              <el-select placeholder="选择通道" disabled style="width:60%; margin:0 0 0 10px;">
                <el-option label="通道 1" value="1"/>
                <el-option label="通道 2" value="2"/>
              </el-select>
            </div>
            <div class="right-button-group">
              <div class="button-stack">
                <el-button type="danger" class="stack-btn" plain style=" margin-bottom:10px;font-weight:700;" @click="stopCalc">
                  停止算账
                </el-button>

                <el-button plain class="stack-btn" style=" margin-bottom:6px;" @click="calcAll">全体禁言</el-button>
                <el-button plain class="stack-btn" @click="undoAll">全体解禁</el-button>
              </div>
            </div>
          </el-col>

          <!-- 右侧复选框 + 客户框 -->
          <el-col :span="8" style="display: flex;align-items: center;justify-content: center;">

            <div class="checkbox-group">
              <el-checkbox>启停禁言群</el-checkbox>
              <el-checkbox>不开本期停</el-checkbox>
              <el-checkbox>支持改昵称</el-checkbox>
            </div>

            <el-button size="small" style="margin-top:10px;" @click="openChatLog">
              校准时间
            </el-button>
            <el-button size="small" style="margin-top:10px;" @click="openChatLog">
              聊天日志
            </el-button>
          </el-col>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="never" class="card-section play-search" style="margin-top:12px;" ref="cardRef">
          <!-- 搜索区域 -->
          <el-col :span="12">
            <div class="search-bar">
              <el-input v-model="searchWang" placeholder="搜索旺旺号" clearable/>
              <el-input v-model="searchNickname" placeholder="搜索昵称" clearable/>
              <el-input v-model="searchScore" placeholder="分数" clearable/>
              <el-button type="primary" @click="modifyInfo">修改信息</el-button>
              <el-button type="primary" @click="searchPlayer">搜索玩家</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="search-right" style="display: flex;align-items: center;">
              <el-checkbox v-model="opts.showTuoplayer">显示托玩家</el-checkbox>
              <div class="batch-operations" style="display: flex;align-items: center;margin-left: 10px;">
                <span>客户框</span>
                <el-button style="margin-left: 5px" size="small" @click="addPlayers(10)">加10个</el-button>
                <el-button size="small" @click="removePlayers(10)">减10个</el-button>
              </div>
            </div>
          </el-col>

        </el-card>
      </el-col>
    </el-row>
    <!-- 玩家表格 -->
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="never" style="margin-top:12px;">
          <players-table :players="players"/>
        </el-card>
      </el-col>
    </el-row>


    <!-- 底部统计 -->
    <!--    <el-card shadow="never" class="card-section" style="margin-top:12px;">-->
    <div class="bottom-bar">
      <span>玩家人数：{{ players.length }}</span>
      <span>总分数：{{ totalScore }}</span>
      <span>本期盈利：{{ profit }}</span>
      <span>今日总盈利：{{ todayProfit }}</span>
      <el-button type="success" size="small" @click="startLottery">开始开奖</el-button>
    </div>
    <!--    </el-card>-->
  </div>
</template>

<script>
import LotteryDisplay from "./LotteryDisplay.vue";
import PlayersTable from "./PlayersTable.vue";
import { get, post } from '../api/http.js'
export default {
  components: {LotteryDisplay, PlayersTable},

  data() {
    return {
      topMenu: ["客户管理", "算账管理", "封盘设置", "回水工具", "关于"],
      currentRound: "本期3359246",
      nums: [0, 7, 5],

      // 搜索
      search: "",
      inputWang: "",

      // 选项
      opts: {
        stopThisRound: false,
        supportNickname: true,
        showTuoplayer: false,
        enableGroup: false
      },
      searchWang: '',
      searchNickname: '',
      searchScore: '',

      // 布局监听相关
      layoutStatus: '未知',
      debugMode: false,
      observer: null,
      resizeObserver: null,
      players: [],
      profit: 64,
      todayProfit: 3335,

      dummy: "10",
    };
  },

  computed: {
    totalScore() {
      return this.players.reduce((s, p) => s + (p.score || 0), 0);
    },

  },

  mounted() {
    this.mockPlayers();
    this.handleGetLotteryDisplay();
    // 在 renderer 的任意组件（比如 App.vue）中 mounted：
  },

  methods: {
    // 顶部功能空函数
    onMenu(name) {
      console.log("点击菜单：", name)
    },
    handleGetLotteryDisplay() {
      // 确保请求参数传递正确
      get('/api/lottery/latest/fast-lottery')
          .then(res => {
            console.log('我是返回的字段:', res)  // 打印返回的数据
          })
          .catch(error => {
            console.error('请求失败:', error)  // 打印失败的错误
          })
    },

    // 左侧账单功能
    sendBill() {
    },
    importBill() {
    },
    importBet() {
    },
    clearBet() {
    },
    fixOpen() {
    },
    sumBet() {
    },
    manualCharge() {
    },
    detailBill() {
    },
    historyBill() {
    },

    // 中间开奖功能
    stopCalc() {
    },
    calcAll() {
    },
    undoAll() {
    },

    // 客户框
    openChatLog() {
    },

    // 开奖
    startLottery() {
    },
    // 业务方法
    searchPlayer() {
      console.log('搜索玩家:', {
        wang: this.searchWang,
        nickname: this.searchNickname,
        score: this.searchScore
      })
      this.$message.info('搜索功能开发中')
    },

    modifyInfo() {
      console.log('修改信息')
      this.$message.info('修改信息功能开发中')
    },
    addPlayers(count) {
      console.log(`添加${count}个玩家`)
      this.$message.success(`成功添加${count}个玩家`)
    },

    removePlayers(count) {
      console.log(`移除${count}个玩家`)
      this.$message.warning(`成功移除${count}个玩家`)
    },

    // 模拟数据
    mockPlayers() {
      const names = ["侯不", "贵丑", "流氓", "标兰"];

      this.players = Array.from({length: 80}).map((_, i) => ({
        uid: "80000" + i,
        nickname: names[i % names.length] + i,
        score: Math.floor(Math.random() * 160),
        remain: Math.floor(Math.random() * 100),
        bet: Math.random() > 0.75 ? "单50" : "",
        time: "15:13",
      }));
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 15px;
  background: #f5f6fa;
}

.card-section {
  border-radius: 10px;
  padding: 15px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-buttons {
  display: flex;
  gap: 10px;
}

.btn-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.block-title {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #444;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}


.search-bar {
  display: flex;
  gap: 10px;
  align-items: center;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  height: 40px;
  padding: 0 20px;

  background: #fff;
  border-top: 1px solid #ccc;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  z-index: 999;
}

.bottom-bar span {
  font-size: 14px;
  white-space: nowrap;
}

:deep(.card-section .el-card__body) {
  display: flex;
  align-items: center;
}

.app-container {
  .section-center {
    :deep(.el-button +.el-button) {
      margin-left: 0;
      width: 100px;
    }
  }

  .compact-btn-container {
    width: 100%;
    padding: 12px;
    border-radius: 4px;
  }

  .compact-btn-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .right-button-group {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .button-stack {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    width: 60%;
  }

  .stack-btn {
    width: 100%;
    margin: 0 !important; /* 移除默认边距 */
    margin-right: 30px !important;
  }
  .right-col {
    /* 不需要设置text-align */
  }

  .select-row {
    display: flex;
    justify-content: flex-end; /* 使整个行右对齐 */
    align-items: center;
    margin: 10px 0;
  }

  .right-button-group {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0; /* 根据实际情况调整，原代码有padding */
  }

  .button-stack {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    width: 60%; /* 与原代码一致 */
  }

  .stack-btn {
    width: 100%;
    margin: 0 !important;
  }
}

</style>

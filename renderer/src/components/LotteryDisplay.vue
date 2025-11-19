<template>
  <div style="padding:8px;">
<!-- 开奖区域   -->
    <div style="font-size:12px;color:#666">{{round}}</div>
    <div style="color: blue">开始开奖</div>
    <div style="margin:8px 0; display:flex; align-items:center;">
      <div style="background:#fff; border:1px solid #e6e6e6; padding:8px;">
        <span class="num">{{nums[0]}}</span>
        <span class="plus">+</span>
        <span class="num">{{nums[1]}}</span>
        <span class="plus">+</span>
        <span class="num">{{nums[2]}}</span>
        <span class="plus">=</span>
        <span class="sum">{{sum}}</span>
      </div>
    </div>
    <div>
    <div>下期期号{{}}</div>
    <div style="margin-top:10px;display: flex;justify-content: space-between;">
      <div class="refresh-box">
        <div class="tip-text">不开奖时点击这里</div>
        <el-button class="refresh-btn" size="small" @click="$emit('start')">
          刷新开奖
        </el-button>
      </div>
      <el-button size="large" @click="$emit('stop')">手动算账</el-button>
    </div>
<!--      <el-button size="small" @click="$emit('start')">开始开奖</el-button>-->
<!--      <el-button size="small" @click="$emit('stop')">停止开奖</el-button>-->
<!--      <el-button type="primary" size="small" @click="manual">手动开奖</el-button>-->
    </div>
  </div>
</template>
<script>
export default {
  props:{round:String, nums:Array},
  computed:{ sum(){ return Number(this.nums[0]||0) + Number(this.nums[1]||0) + Number(this.nums[2]||0) } },
  methods:{
    async manual(){
      const res = (window.electronAPI && window.electronAPI.manualDraw) ? await window.electronAPI.manualDraw() : {a:0,b:0,c:0}
      this.$emit('manual', [res.a,res.b,res.c])
    }
  }
}
</script>
<style>
.num{font-size:28px;background:yellow;padding:6px 10px;border-radius:4px}
.plus{margin:0 8px;font-size:20px}
.sum{margin-left:12px;font-size:28px;background:#000;color:#ff4d4f;padding:6px 12px;border-radius:4px}
.refresh-box {
  width: 120px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Microsoft YaHei", sans-serif;
}

.tip-text {
  font-size: 10px;
  color: #333;
  margin-bottom: 4px;
}

.refresh-btn {
  width: 100%;
  padding: 2px 0;
  font-size: 12px;
  background: #e6e6e6;
  border: 1px solid #b5b5b5;
  color: #000;
  box-shadow: inset 0 1px 0 #fff;
}

</style>

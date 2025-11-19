<template>
  <div class="player-table">
    <!-- 玩家组件   -->
    <div style="margin-bottom:8px; display:flex; gap:8px; align-items:center;">
      <el-input v-model="filter" placeholder="搜索旺旺号/昵称" size="small" style="width:260px;"></el-input>
      <el-button size="small" @click="doFilter">搜索</el-button>
      <el-button size="small" @click="resetFilter">重置</el-button>
      <div style="margin-left:auto;">显示 {{ displayed.length }} / {{ players.length }}</div>
    </div>
    <el-table :data="displayed" min-height="400" stripe border  :row-style="{height:'30px'}" :cell-style="{padding:'0px'}" class="compact-table">
      <el-table-column prop="uid" label="玩家旺旺号"></el-table-column>
      <el-table-column prop="nickname" label="玩家昵称"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column prop="remain" label="留分"></el-table-column>
      <el-table-column prop="bet" label="下注内容"></el-table-column>
      <el-table-column label="时间">
        <template #default="{row}">{{ row.time }}</template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="{row}">
          <el-button size="small" @click="$emit('edit', row)">编辑</el-button>
          <el-button size="small" type="danger" @click="$emit('remove', row.uid)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {players: {type: Array, default: () => []}},
  data() {
    return {filter: '', displayed: []}
  },
  watch: {
    players: {
      immediate: true, handler(n) {
        this.displayed = [...n]
      }
    }
  },
  methods: {
    getTableRowStyle({row, rowIndex}) {
      return { height: '50px' };
    },
    doFilter() {
      const t = this.filter.trim().toLowerCase();
      if (!t) {
        this.displayed = [...this.players];
        return
      }
      this.displayed = this.players.filter(p => (p.nickname || '').toLowerCase().includes(t) || (p.uid || '').includes(t))
    },
    resetFilter() {
      this.filter = '';
      this.displayed = [...this.players]
    }
  }
}
</script>
<style scoped>
/* 为el-table应用紧凑样式 */
.compact-table {
  font-size: 12px;  /* 设置字体小一点 */
}

</style>

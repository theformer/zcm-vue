<template>
  <div class="player-table">

    <!-- 搜索栏 -->
    <div class="top-bar">
      <el-input
          v-model="filter"
          placeholder="搜索旺旺号/昵称"
          size="small"
          clearable
          @keyup.enter="doFilter"
          style="width:260px;"
      />

      <el-button size="small" @click="doFilter">搜索</el-button>
      <el-button size="small" @click="resetFilter">重置</el-button>

      <div class="counter">显示 {{ displayed.length }} / {{ players.length }}</div>
    </div>

    <!-- 玩家表格 -->
    <el-table
        :data="displayed"
        stripe border
        height="100%"
        highlight-current-row
        @current-change="onRowChange"
        class="compact-table"
        @row-contextmenu="showMenu"
        ref="table"
        >

      <el-table-column prop="uid" label="玩家旺旺号" min-width="120" />
      <el-table-column prop="nickname" label="玩家昵称" min-width="120" />
      <el-table-column prop="score" label="分数" width="80" />
      <el-table-column prop="remain" label="留分" width="80" />
      <el-table-column prop="bet" label="下注内容" min-width="160" />
      <el-table-column label="时间" width="100">
        <template #default="{row}">
          {{ row.time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="{row}">
          <el-button size="small" @click="$emit('edit', row)">编辑</el-button>
          <el-button size="small" type="danger" @click="$emit('remove', row.uid)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- ===== 右键菜单 ===== -->
    <ul
        v-if="menu.visible"
        class="context-menu"
        :style="{ left: menu.x + 'px', top: menu.y + 'px' }"
    >
      <li @click="doAction('delete')">删除客户</li>
      <li @click="doAction('clear')">清空下注</li>
      <li @click="doAction('zero')">海拖0分</li>
      <li @click="doAction('sort')">大小排序</li>
      <li @click="doAction('repeat')">帮家下注</li>
      <li @click="doAction('editWW')">修改旺旺号</li>
      <li @click="doAction('editScore')">修改分数</li>
      <li @click="doAction('addProxy')">添加群托</li>
    </ul>

  </div>
</template>

<script>
export default {
  props: { players: Array },
  data() {
    return {
      filter: "",
      displayed: [],
      current: null,   // ★ 当前选中行
      // 右键菜单
      menu: {
        visible: false,
        x: 0,
        y: 0,
        row: null,
      }
    };
  },

  watch: {
    players: {
      immediate: true,
      handler(list) {
        this.displayed = [...list];
      }
    }
  },

  methods: {
    // ============= 搜索功能 =============
    doFilter() {
      const key = this.filter.trim().toLowerCase();
      if (!key) return this.resetFilter();

      this.displayed = this.players.filter(p =>
          (p.nickname || "").toLowerCase().includes(key) ||
          (p.uid || "").includes(key)
      );
    },

    resetFilter() {
      this.filter = "";
      this.displayed = [...this.players];
    },
    onRowChange(row) {
      this.current = row;
    },
    // ============= 右键菜单 =============
    showMenu(row, column, event) {
      event.preventDefault();

      // 右键时自动选中当前行
      this.current = row;
      this.$refs.table.setCurrentRow(row);

      this.menu.visible = true;
      this.menu.row = row;
      this.menu.x = event.clientX;
      this.menu.y = event.clientY;
      document.addEventListener("click", this.hideMenu, { once: true });
    },

    hideMenu() {
      this.menu.visible = false;
    },

    doAction(type) {
      const row = this.menu.row;
      this.hideMenu();

      // 右键菜单事件全部抛出给父组件
      this.$emit("context-action", { type, row });
    }
  }
};
</script>

<style scoped>
.player-table {
  width: 100%;
  height: 100%;
}

/* 顶部搜索栏 */
.top-bar {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.counter {
  margin-left: auto;
  font-size: 12px;
  opacity: .8;
}

/* 表格紧凑样式 */
.compact-table {
  font-size: 12px;
}
.compact-table ::v-deep(.el-table__cell) {
  padding: 2px 6px !important;
  height: 28px;
}

/* 右键菜单 */
.context-menu {
  position: fixed;
  background: #fff;
  border: 1px solid #ccc;
  width: 160px;
  padding: 5px 0;
  margin: 0;
  list-style: none;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.context-menu li {
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
}
.context-menu li:hover {
  background: #409eff;
  color: white;
}
.el-table__body .current-row > td {
  background-color: #0055ff !important;
  color: #fff !important;
}
</style>

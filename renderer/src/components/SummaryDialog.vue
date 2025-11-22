<template>
  <el-dialog
      v-model="visible"
      title=""
      width="620px"
      :close-on-click-modal="false"
      class="summary-dialog"
  >
    <div class="summary-content">
      <pre>{{ text }}</pre>
    </div>

    <template #footer>
      <el-button size="small" type="primary" @click="doCopy">复制</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  modelValue: Boolean,
  text: { type: String, default: "" }
});

const emits = defineEmits(["update:modelValue"]);

const visible = ref(props.modelValue);
watch(() => props.modelValue, v => visible.value = v);
watch(visible, v => emits("update:modelValue", v));

function doCopy() {
  navigator.clipboard.writeText(props.text);
  ElMessage.success("已复制");
}
</script>

<style scoped>
.summary-dialog >>> .el-dialog__body {
  padding: 10px 15px;
}

.summary-content {
  background: #fff;
  border: 1px solid #aaa;
  padding: 10px;
  height: 340px;
  overflow-y: auto;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: "Consolas", "Courier New", monospace;
  font-size: 14px;
  line-height: 18px;
}
</style>

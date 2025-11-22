<template>
  <div class="login-wrap">
    <h3 class="title">登录</h3>

    <div class="form-row">
      <label>账号：</label>
      <input v-model="form.account" />
    </div>

    <div class="form-row">
      <label>密码：</label>
      <input v-model="form.password" type="password" />
    </div>

    <div class="form-row">
      <label>群号：</label>
      <input v-model="form.group" />
    </div>

    <button class="login-btn" @click="submitLogin">登 录</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const form = reactive({
  account: "",
  password: "",
  group: ""
});

const submitLogin = () => {
  window.electronAPI.login({
    account: form.account,
    password: form.password,
    group: form.group
  }).then(res => {
    if (res.ok) alert("登录成功");
    else alert("登录失败：" + res.message);
  }).catch(err => {

    alert('登录异常，请查看控制台');
  });
};
</script>

<style scoped>
.login-wrap {
  width: 360px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
label {
  width: 60px;
}
input {
  flex: 1;
  height: 28px;
  border: 1px solid #ccc;
  padding: 3px 6px;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
  height: 32px;
  border: 1px solid #999;
  background: #eee;
  cursor: pointer;
}
</style>

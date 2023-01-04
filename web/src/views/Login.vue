<template>
  <div>
    <van-field v-model="model.username" label="账号" />
    <van-field v-model="model.password" type="password" label="密码" />
    <van-button color="#8060DA" size="large" @click="login()">登录</van-button>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;
      this.$router.push("/");
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    },
  },
};
</script>
<template>
  <div id="login" class="border-color">
    <el-form @submit.native.prevent @keyup.enter.native="login">
      <h2>管理员</h2>
      <hr />
      <el-form-item label="账号">
        <el-input type="text" v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
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
      this.$message({
        type: "success",
        message: "登录成功！",
      });
    },
    frush() {
      if (localStorage.token) {
        this.$router.push("/")
        this.$message({
        type: "warning",
        message: "您已登录！",
      });
      }
    },
  },
  created() {
    // 若用户登录在token过期时间内无法返回登录界面
    this.frush()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#login {
  margin: 120px auto;
  padding: 5px 15px;

  width: 300px;
  height: 380px;
}
</style>

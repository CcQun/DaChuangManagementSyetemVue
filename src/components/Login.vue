<template>
  <div>

    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">大创平台系统</h3>
      <el-form-item label="学号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
<!--        <span slot="footer" >-->
        <el-button type="primary" style="float:right" v-on:click="onSubmit('loginForm')">登 录</el-button>
<!--        </span>-->
      </el-form-item>
    </el-form>

<!--    <el-dialog-->
<!--      title="提  示"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="30%"-->
<!--      :before-close="handleClose">-->
<!--      <span>请输入账号和密码</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->

<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: '',
          //
          // note: {
          //   backgroundImage: "url(" + require("../assets/logo.png") + ")",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "25px auto",
          //   marginTop: "5px",
          // }
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false

      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push("/main");
          } else {
            // this.dialogVisible = true;
            this.$message({
              message: '请输入用户名或密码',
              type: 'error'
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 10px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-image: url("../assets/images/login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

</style>


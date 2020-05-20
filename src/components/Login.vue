<template>
  <div id="Login">

    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">大创平台系统</h3>
      <el-form-item label="学号" prop="student_number">
        <el-input type="text" placeholder="请输入账号" v-model="form.student_number"/>
      </el-form-item>
      <el-form-item label="密码" prop="student_password">
        <el-input type="password" placeholder="请输入密码" v-model="form.student_password"/>
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
  import Cookies from 'js-cookie';
  import { mapMutations } from 'vuex';
  export default {
    name: "Login",
    data() {
      return {
        form: {
          student_number: '17301091',
          student_password: '123456',
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
          student_number: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          student_password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false

      }
    },
    methods: {
      ...mapMutations(['setToken']),

      onSubmit(formName) {

        //为表单绑定验证功能
        let that = this;
        that.$refs[formName].validate((valid) => {
          let params = JSON.stringify(that.form);
          if (valid) {
            //ajax请求
                that
                  .$axios({
                      //请求方式
                      method: "post",
                      //请求路劲
                      url: "/api/usr/login",
                      //请求参数
                      data: params
                      //请求成功的回调函数
                    },
                    {
                      emulateJSON: true
                    }
                  )
                  .then(function(res) {

                    if (res.data.code == "1") {
                      Cookies.set('student_name',res.data.msg ,3600)
                      Cookies.set('student_number',that.form.student_number ,3600)
                      // that.$notify({
                      //   title: "登陆成功",
                      //   message: res.data.msg,
                      //   type: "success"
                      // });
                      that.$message({
                        title: "登陆成功",
                        message: "登陆成功",
                        type: 'success'
                      });
                      that.$router.push("/main");
                      // that.push.path("/main")
                      // that.push({path:"/main"});
                    }else{
                      // that.$notify({
                      //   title: "登陆失败",
                      //   message: "请输入正确的用户名或密码",
                      //   type: "error"
                      // });
                      that.$message({
                        title: "登陆失败",
                        message: "请输入正确的用户名或密码",
                        type: "error"
                      });
                    }
                  }).catch(function() {
                      that.$notify({
                        title: "登陆失败",
                        message: "服务器异常",
                        type: "error"
                  });
                  console.log("服务器异常");
                  });


            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            // that.$message({
            //   message: '登录成功',
            //   type: 'success'
            // });
            // that.$router.push("/main");
          } else {
            // this.dialogVisible = true;
            that.$message({
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


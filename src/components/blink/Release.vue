<template>
  <el-container>
    <el-aside width="300px"></el-aside>
      <el-card class="box-card">
        <el-form  label-width="200px">
          <el-container>
            <el-aside width="40px" > </el-aside>
            <el-main>
<!--              <h2>发布项目</h2>-->
              <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item  label="项目主题" prop="blink_title">
                  <el-input v-model="ruleForm.blink_title" class="input_w"></el-input>
                </el-form-item>
                <el-form-item label="项目学院" prop="blink_college">
                  <el-select v-model="ruleForm.blink_college" placeholder="请选项目学院">
                    <el-option label="软件学院" value="ruanjian"></el-option>
                    <el-option label="经管学院" value="jingguan"></el-option>
                    <el-option label="理学院" value="li"></el-option>
                    <el-option label="计算机学院" value="jisuanji"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="项目领域" prop="blink_field">
                  <el-input v-model="ruleForm.blink_field"></el-input>
                </el-form-item>

                <el-form-item label="项目内容" prop="blink_content" class="blink_con">
                  <el-input type="textarea" rows="10" v-model="ruleForm.blink_content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-main>
            <el-aside width="40px" > </el-aside><!--  中间布局-->
          </el-container>
        </el-form>
      </el-card>
    <el-aside width="100px"></el-aside>
  </el-container>
</template>

<script>
  import Cookies from 'js-cookie';
  import { mapMutations } from 'vuex';
  export default {
    created() {
      this.getName()
      // this.getMenuList()
    },
    name: "Release",
    data(){
      return {
        labelPosition: 'left',
        ruleForm: {
          blink_title: '',
          blink_college: '',
          blink_field: '',
          blink_content:'',
          student_number:'',
        },
        rules: {
          blink_title: [
            {required: true, message: '请输入项目主题', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          blink_college: [
            {required: true, message: '请选择项目学院', trigger: 'change'}
          ],
          blink_field: [
            {required: true, message: '请输入项目的领域', trigger: 'blur'}
          ],
          blink_content: [
            {required: true, message: '请填写项目主要内容', trigger: 'blur'}
          ]
        }
      };
    },
    methods:{
      ...mapMutations(['setToken']),
      getName(){
        this.ruleForm.student_number=Cookies.get('student_number')
      },

      //这是提交表单
      submitForm(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
          let params = JSON.stringify(that.ruleForm);
          if (valid) {
            //ajax请求
            that
              .$axios({
                  //请求方式
                  method: "post",
                  //请求路劲
                  url: "/api/blink/publishBlink",
                  //请求参数
                  data: params
                  //请求成功的回调函数
                },
                {
                  emulateJSON: true
                }
              )
              .then(function(res) {
                console.log(res.data.code);
                if (res.data.code == "1") {
                  // console.log(res.data.code);
                  // Cookies.set('student_name',res.data.msg ,3600)
                  // that.$notify({
                  that.$message({
                    title: "发布成功",
                    message: "发布成功",
                    type: 'success'
                  });
                  that.$router.push("/my_release");
                }else{
                  that.$message({
                    title: "发布失败",
                    message: "填写信息出错",
                    type: "error"
                  });
                }
              }).catch(function() {
              that.$notify({
                title: "发布失败",
                message: "服务器异常啊啊啊",
                type: "error"
              });
              console.log("服务器异常iii");
            });
          } else {
            that.$message({
              message: '请输入正确内容',
              type: 'error'
            });
            return false;
          }
        });




      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed:{
      activeIndex(){
        const { name } = this.$route;
        switch (name) {

        }
      }
    }
  }
</script>

<style>
  .blink_con{
    height: 250px;
    line-height: 150px;
    margin: 0px 0px;
  }
  .input_w{
    width: 350px;
  }

</style>
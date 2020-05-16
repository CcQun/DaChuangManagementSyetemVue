<template>
  <el-container style="height: 740px; border: 1px solid #eee">
    <el-aside width="230px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['3']"
               default-active="/blink/Release"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               :router="true"
      >

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-notebook-2"></i>系统</template>
          <el-menu-item index="../main" class="el-icon-video-play"> 返回首页</el-menu-item>
          <el-menu-item index="../login" class="el-icon-video-play" @click="QuitInfo()" > 退出登录</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-notebook-2"></i>流程管理</template>
          <el-menu-item index="1-1" class="el-icon-s-help"> 选择项目</el-menu-item>
          <el-menu-item index="/management/create" class="el-icon-s-help"> 创建项目</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>汇总统计</template>
          <el-menu-item index="2-1" class="el-icon-star-on"> 立项申请书</el-menu-item>
          <el-menu-item index="2-2" class="el-icon-star-on"> 项目申请书情况</el-menu-item>
          <el-menu-item index="2-3" class="el-icon-star-on"> 中期检查表情况</el-menu-item>
          <el-menu-item index="2-4" class="el-icon-star-on"> 解题表情况</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-user-solid"></i>社区</template>
          <el-menu-item index="/blink/Release" class="el-icon-plus"> 发布</el-menu-item>
          <el-menu-item index="/blink/Browse" class="el-icon-search"> 浏览</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>

      <el-header style="text-align: right ; font-size: 15px  " >
        <span style="text-align: center; font-size: 30px ;font-family: 幼圆" >创新创业项目管理信息系统&#12288&#12288&#12288&#12288</span>
        <span style="text-align: center; font-size: 30px">&#12288</span>
        <span style="text-align: right; font-size: 15px">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp您的身份是：职业     </span>
        <span style="text-align: right; font-size: 15px">欢迎您，</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" >
            <el-button  type="info" round>
              用户名<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item class="clearfix">
              消息
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item @click.native="Quit()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <div>
          <el-form  label-width="80px">
            <el-container>
                <el-aside width="300px" > </el-aside>
              <el-main>
                <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item  label="主题" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="项目学院" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选项目学院">
                      <el-option label="软件学院" value="ruanjian"></el-option>
                      <el-option label="经管学院" value="jingguan"></el-option>
                      <el-option label="理学院" value="li"></el-option>
                      <el-option label="计算机学院" value="jisuanji"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动时间" required>
                    <el-col :span="11">
                      <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                  </el-form-item>
                  <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                      <el-checkbox label="地推活动" name="type"></el-checkbox>
                      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-main>
              <el-aside width="400px" > </el-aside><!--  中间布局-->
            </el-container>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Release",
    data(){
      return {
        labelPosition: 'left',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入项目主题', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择项目学院', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      };
    },
    methods:{
      // goBack() {
      //   console.log('go back');
      // },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      QuitInfo(){
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
      },
      Quit(){
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
        this.$router.push({name:'login'})
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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
  .el-aside {
    color: #545c64;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
<template>
  <el-container style="height: 740px; border: 1px solid #eee">
    <el-aside width="230px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']"
               default-active="/management/create"
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
          <el-menu-item index="4-2" class="el-icon-video-play"> 退出登录</el-menu-item>
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

      <el-header style="text-align: right ; font-size: 15px">
        <span style="text-align: center; font-size: 30px ;font-family: 幼圆" >创新创业项目管理信息系统&#12288&#12288&#12288&#12288</span>
        <span style="text-align: center; font-size: 30px">&#12288</span>
        <span style="text-align: right; font-size: 15px">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp您的身份是：职业     </span>
        <span style="text-align: right; font-size: 15px">欢迎您，</span>
        <el-dropdown trigger="click"><span class="el-dropdown-link" >
          <span style="text-align-last: right; font-size: 22px">用户名</span><i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item class="clearfix">
              消息
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
<!--        <el-table :data="tableData">-->
<!--          <el-table-column prop="date" label="日期" width="140">-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="name" label="姓名" width="120">-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="address" label="地址">-->
<!--          </el-table-column>-->
<!--        </el-table>-->
        立项申请子页面
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Create",
    data() {
      const item = {

      };
      return {
        tableData: Array(20).fill(item)
      }
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

<style scoped>

</style>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #545c64;
    line-height: 60px;
  }

  .el-aside {
    color: #545c64;
  }
</style>

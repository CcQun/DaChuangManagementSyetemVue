<template>
  <el-container style="height: 740px; border: 1px solid #eee">
    <el-aside width="230px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        default-active="/release"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        :router="true"
        unique-opened
      >

        <el-submenu :index="item.authName+''" v-for="item in menuList" :key="item.authName">
          <template slot="title">
            <i :class="iconsObj[item.id]"></i>
            <span>
              {{item.authName}}
            </span>
          </template>
          <el-menu-item :index="subItem.path+''" v-for="subItem in item.children" :key="subItem.authName">
            <template slot="title">
              <i :class="subIconsObj[subItem.id]"></i>
              <span>{{subItem.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right ; font-size: 15px  " >
        <span style="text-align: center; font-size: 30px ;font-family: 幼圆" >创新创业项目管理信息系统&#12288&#12288&#12288&#12288</span>
        <span style="text-align: center; font-size: 30px">&#12288</span>
        <span style="text-align: right; font-size: 15px">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp您的身份是：老师     </span>
        <span style="text-align: right; font-size: 15px">欢迎您，</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" >
            <el-button  type="info" round>
              {{mian_Name}}<i class="el-icon-arrow-down el-icon--right"></i>
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
        <!--        路由占位符-->
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Cookies from 'js-cookie';
  export default {
    created() {
      this.getName()
      // this.getMenuList()
    },
    name: "Teacher_Main",
    data() {

      //左侧菜单数据
      return{
        mian_Name:'',
        menuList: [
          {
            id:'01',
            authName:'流程管理',
            path:'management',
            children:[
              {id:'project_create', authName:'发布项目', path:'project_create',},
              {id: 'project_my_release', authName: '我的发布', path: 'project_my_release',},

            ]
          },
          {
            id:'02',
            authName:'项目管理',
            path:'',
            children:[
              {id:'direct_approval', authName:'指导申请', path:'direct_approval',},
            ]
          },

          {
            id:'04',
            authName:'系统',
            path:'blink',
            children:[
              {id:'quit', authName:'退出系统', path:'app_login',},
              {id: 'wel', authName: '主页系统', path: 'teacher_main',}
            ]
          }
        ],
        iconsObj:{
          '01':'el-icon-notebook-2',
          '02':'el-icon-s-help',
          '03':'el-icon-s-custom',
          '04':'el-icon-crop',
        },
        subIconsObj:{
          'project_create':'el-icon-aim',
          'project_my_release':'el-icon-location',
          'create1':'el-icon-s-custom',
          'choose1':'el-icon-notebook-2',
          'release':'el-icon-wind-power',
          'browse':'el-icon-goblet-full',
          'quit':'el-icon-house',
          'wel':'el-icon-news',
          'my_release':'el-icon-menu',
          'my_apply':'el-icon-menu',
          'direct_approval':'el-icon-star-off',
        },
      }

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
      getName(){
        this.mian_Name=Cookies.get('teacher_name')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      Quit(){
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
        this.$router.push({name:'/app_login'})
      },
      // //获取所有菜单
      // getMenuList(){
      //
      // },
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
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

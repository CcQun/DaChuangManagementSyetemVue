<template>
  <div>

    <div class="container" @click="getMyBlink()">
      <div class="handle-box">
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="project_number" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="project_name" label="名称" align="center"></el-table-column>
        <el-table-column prop="create_teacher" label="指导老师" align="center"></el-table-column>
        <!--        <el-table-column prop="student_name" label="姓名" align="center"></el-table-column>-->
        <!--        <el-table-column prop="student_number" label="学号" align="center"></el-table-column>-->
        <el-table-column prop="project_college" label="学院" align="center"></el-table-column>
        <el-table-column prop="project_field" label="领域" align="center"></el-table-column>
        <el-table-column prop='project_state' label="状态" align="center"></el-table-column>
        <el-table-column prop='project_approval' label="结果" align="center"></el-table-column>
        <el-table-column prop="create_time" label="发布时间" align="center"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"

        ></el-pagination>
      </div>
    </div>


  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { mapMutations } from 'vuex';
  export default {
    name: "Project_My_Apply",
    data(){
      return {
        query: {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 9
        },
        myApply_project:
          {
            student_number:'',
          },
        tableData: [
          {

            project_approval:'',
            project_description: "",
            project_number: '',
            create_time: "",
            project_state: "",
            project_field: "",
            project_college: "",
            create_teacher: "",
            project_name: ""
          },
        ],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        ApprovalVisible: false,
        pageTotal: 0,
        form: {

        },
        Agree:{

        },
        Refuse:{

        },

        idx: -1,
        ApprovalNumber:{
          blink_number: ''
        },
        DeleteBlink_number:{
          blink_number: ''
        },
        ApplyOrRefuse:{
          blink_number:"",
          student_number:"",
          blink_approval:""
        },
        loading:true
      }

    },
    methods: {
      ...mapMutations(['setToken']),
      // 得到当前所有blink
      getMyBlink(){
        let that= this;
        that.myApply_project.student_number=Cookies.get('student_number');
        let params = JSON.stringify(that.myApply_project);
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/project/getProjectApprove",
              //请求参数
              data: params
              //请求成功的回调函数
            },
            {
              emulateJSON: true
            }
          )
          .then(function(res) {

            // console.log(res.data.code);
            if (res.data.code == "1") {

              that.tableData = res.data.data;
              that.changeState();

            }else{
              that.$message({
                title: "信息错误",
                message: "信息错误",
                type: "error"
              });
            }
          }).catch(function() {
          that.$notify({
            title: "失败",
            message: "服务器异常出错",
            type: "error"
          });
          console.log("服务器异常，未启动后端");
        });
        this.loading=false
      },
      // 改变状态
      changeState(){
        for(let i = 0; i<this.tableData.length;i++){
          if(this.tableData[i].project_state=='0'||this.tableData[i].project_state=='1' || this.tableData[i].project_state=='2'){
            this.tableData[i].project_state='未满'
          }
          if(this.tableData[i].project_state=='3' || this.tableData[i].project_state=='4'){
            this.tableData[i].project_state='已满'
          }


        }
        for(let i = 0; i<this.tableData.length;i++){
          if(this.tableData[i].project_approval=='0'){
            this.tableData[i].project_approval='待审批'
          }else if(this.tableData[i].project_approval=='1'){
            this.tableData[i].project_approval='通过'
          }else if(this.tableData[i].project_approval=='2'){
            this.tableData[i].project_approval='驳回'
          }
        }
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

    }
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }
  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #545c64;
  }
  .mr10 {
    margin-right: 10px;
  }
</style>
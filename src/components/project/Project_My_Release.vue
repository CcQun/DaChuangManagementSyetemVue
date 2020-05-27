<template>
  <div>

    <div class="container" @click="getMyProject()">
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
        <el-table-column prop="project_name" label="主题" align="center"></el-table-column>
        <el-table-column prop="direct_Teacher_Name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="direct_Teacher_Number" label="教工号" align="center"></el-table-column>
        <el-table-column prop="project_college" label="学院" align="center"></el-table-column>
        <el-table-column prop="project_field" label="领域" align="center"></el-table-column>
        <el-table-column prop='project_State' label="状态" align="center"></el-table-column>
        <el-table-column prop="create_time" label="发布时间" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-s-opportunity"
              class="red"
              @click="ApprovalEdit(scope.$index, scope.row) "
            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-delete-solid"
              class="red"
              @click="DeleteProject(scope.$index, scope.row) "
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="详细内容" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="主题">
          <el-input v-model="form.project_name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="5" v-model="form.project_description" disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<!--                <el-button @click="editVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 审批内容弹出框 -->
    <el-dialog title="审批成员" :visible.sync="ApprovalVisible" width="50%">
      <el-table
        :data="ApprovalForm"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="student_name" label="姓名"   align="center"></el-table-column>
        <el-table-column prop="student_number" label="学号" align="center"></el-table-column>
        <el-table-column prop="student_gender" label="性别"   align="center"></el-table-column>
        <el-table-column prop="major" label="学院" align="center"></el-table-column>
        <!--        <el-table-column prop="blinknum" label="想加入的" align="center"></el-table-column>-->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-check"
              @click="Agree_A(scope.$index, scope.row)"
            >同意</el-button>
            <el-button
              type="text"
              icon="el-icon-close"
              class="red"
              @click="Refuse_A(scope.$index, scope.row) "
            >拒绝</el-button>
          </template>
        </el-table-column>

      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { mapMutations } from 'vuex';
  export default {
    name: "Project_My_Release",
    data(){
      return {
        query: {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 9
        },
        my_project:
          {
            teacher_number:'',
          },
        tableData: [
          {

            project_number: "",
            create_time: "",
            project_name: "",
            project_description: "",
            project_college: "",
            project_field: "",
            project_State: "",
            direct_Teacher_Number: "",
            create_Teacher_Number: "",
            create_Student_Number: "",
            create_Teacher_Name: "",
            direct_Teacher_Name: "",
            create_Student_Name: ""

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

        ApprovalForm:[
          {
            project_approval:"",
            projectnum: "",
            date: "",
            major: "",
            student_college: "",
            student_gender: "",
            student_introduction: "",
            student_name: "",
            student_number: ""
          }
        ],
        idx: -1,
        ApprovalNumber:{
          project_number: ''
        },
        DeleteProject_number:{
          project_number: ''
        },
        ApplyOrRefuse:{
          project_number:"",
          student_number:"",
          project_approval:""
        },
        loading:true
      };
    },
    methods: {
      ...mapMutations(['setToken']),
      // 触发搜索按钮
      handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除操作
      DeleteProject(index,row){
        this.idx = index;
        this.form = row;
        this.DeleteProject_number.project_number=this.form.project_number;

        console.log(this.DeleteProject_number.project_number);

        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            let that = this;
            let params = JSON.stringify(that.DeleteProject_number);
            //ajax请求
            that
              .$axios({
                  //请求方式
                  method: "post",
                  //请求路劲
                  url: "/api/project/deleteproject",
                  //请求参数
                  data: params
                },
                {
                  emulateJSON: true
                }
              )
              .then(function(res) {
                console.log(res.data.code);
                if (res.data.code == "1") {
                  console.log(res.data.msg);
                  that.$message({
                    title: "删除成功",
                    message: "删除成功",
                    type: "success"
                  });
                }else{
                  that.$message({
                    title: "code不是1",
                    message: "没有此项目",
                    type: "warning"
                  });
                }
              })

            this.tableData.splice(index, 1);
          })
          .catch(() => {});
      },
      // 编辑操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;
      },
      //同意加入队伍
      Agree_A(index,row){
        this.idx = index;
        this.Agree = row;
        console.log(this.Agree);
        this.$confirm('确定同意该请求么？', '提示', {
          type: 'success'
        })
          .then(() => {
            console.log(this.Agree.project_number+'Agree.project_number');

            this.ApplyOrRefuse.project_number=this.Agree.projectnum;
            this.ApplyOrRefuse.student_number=this.Agree.student_number;
            this.ApplyOrRefuse.project_approval=1;
            console.log(this.ApplyOrRefuse);
            let that = this;
            let params = JSON.stringify(that.ApplyOrRefuse);
            //ajax请求
            that
              .$axios({
                  //请求方式
                  method: "post",
                  //请求路劲
                  url: "/api/project/checkProjectApply",
                  //请求参数
                  data: params
                },
                {
                  emulateJSON: true
                }
              )
              .then(function(res) {
                console.log(res.data.code);
                if (res.data.code == "1") {
                  console.log(res.data.msg);
                  that.$message({
                    title: "审批成功",
                    message: "审批成功",
                    type: "success"
                  });
                }else{
                  that.$message({
                    title: "code不是1",
                    message: "错误",
                    type: "warning"
                  });
                }
              }).catch(function() {
              that.$notify({
                title: "审批失败",
                message: "服务器异常啊啊啊",
                type: "error"
              });
              console.log("服务器异常，未启动后端");
            });
          })
          .catch(() => {});
      },
      //拒绝加入队伍
      Refuse_A(index,row){
        this.idx = index;
        this.Agree = row;
        // console.log(this.Agree);
        this.$confirm('确定拒绝该请求么？', '提示', {
          type: 'success'
        })
          .then(() => {
            this.ApplyOrRefuse.project_number=this.Agree.projectnum;
            this.ApplyOrRefuse.student_number=this.Agree.student_number;
            this.ApplyOrRefuse.project_approval=2;

            let that = this;
            let params = JSON.stringify(that.ApplyOrRefuse);
            //ajax请求
            that
              .$axios({
                  //请求方式
                  method: "post",
                  //请求路劲
                  url: "/api/project/checkProjectApply",
                  //请求参数
                  data: params
                },
                {
                  emulateJSON: true
                }
              )
              .then(function(res) {
                console.log(res.data.code);
                if (res.data.code == "1") {
                  console.log(res.data.msg);
                  that.$message({
                    title: "驳回成功",
                    message: "驳回成功",
                    type: "success"
                  });
                }else{
                  that.$message({
                    title: "code不是1",
                    message: "错误",
                    type: "warning"
                  });
                }
              }).catch(function() {
              that.$notify({
                title: "审批失败",
                message: "服务器异常啊啊啊",
                type: "error"
              });
              console.log("服务器异常，未启动后端");
            });
          })
          .catch(() => {});
      },
      // 审批操作
      ApprovalEdit(index,row2){
        this.idx = index;
        this.form = row2;
        this.ApprovalNumber.project_number=this.form.project_number;
        console.log(this.ApprovalNumber.project_number);
        let params = JSON.stringify(this.ApprovalNumber);
        let that= this;
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/project/selectProjectApply",
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
              // console.log(res.data.code+'aaa');
              console.log(res.data.data);
              that.ApprovalForm=res.data.data;
              that.ApprovalVisible = true;
            }else{
              that.ApprovalVisible = false;
              that.$message({
                title: "提示",
                message: "还没有人加入你的队伍",
                type: "error"
              });
            }
          }).catch(function() {
          that.$notify({
            title: "登陆失败",
            message: "服务器异常出错",
            type: "error"
          });
          console.log("服务器异常，未启动后端");
        });
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        this.ApprovalVisible = false
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      },
      // 得到当前所有我的project
      getMyProject(){
        let that= this;
        that.my_project.teacher_number=Cookies.get('teacher_number');
        let params = JSON.stringify(that.my_project);
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/project/myProject",
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
          // if(this.tableData[i].blink_state=='0'){
          //   this.tableData[i].blink_state='未满'
          // }
        }
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
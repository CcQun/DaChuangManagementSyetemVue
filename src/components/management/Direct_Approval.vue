<template>
  <div>

    <div class="container" @click="getMyApproval()">
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
        <el-table-column prop="project_Name" label="主题" align="center"></el-table-column>
        <el-table-column prop="student_name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="student_number" label="学号" align="center"></el-table-column>
        <el-table-column prop="project_College" label="学院" align="center"></el-table-column>
        <el-table-column prop="project_Field" label="领域" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-zoom-in"
              @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-s-opportunity"
              class="red"
              @click="Agree_A(scope.$index, scope.row) "
            >同意</el-button>
            <el-button
              type="text"
              icon="el-icon-delete-solid"
              class="red"
              @click="Refuse_A(scope.$index, scope.row) "
            >拒绝</el-button>
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

    <!-- 详细内容弹出框 -->
    <el-dialog title="详细内容" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="主题">
          <el-input v-model="form.project_Name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="10" style="height: 170px" v-model="form.project_Description" disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<!--                <el-button @click="editVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { mapMutations } from 'vuex';
  export default {
    name: "Direct_Approval",
    data() {
      return{
        labelPosition: 'left',
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
            project_number: "",
            project_Name:"",
            project_Description: "",
            student_name: "",
            student_number: "",
            project_College: "",
            project_Field:"",

          },
        ],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        Member_Visible: false,
        searchVisible:false,
        pageTotal: 0,
        member_form: {

        },
        teacher_From:{
          teacher_number:''
        },
        rules: {
          teacher_name: [
            {required: true, message: '请选择指导老师', trigger: 'blur'}
          ]
        },
        form: {

        },
        Agree:{

        },
        Refuse:{

        },
        apply_direct: {
          project_number:'',
          teacher_number:''
        },
        ApprovalForm:[
          {
            blink_approval:"",
            blinknum: "",
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
          teacher_number: ''
        },
        DeleteBlink_number:{
          blink_number: ''
        },
        ApplyOrRefuse:{
          project_number:'',
          teacher_number:'',
          direct_approval:'',
        },
        loading:true
      }
    },
    methods:{
      ...mapMutations(['setToken']),
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      },
      //同意成为指导老师
      Agree_A(index,row){
        this.idx = index;
        this.Agree = row;
        // this.ApprovalNumber.teacher_number=Cookies.get('teacher_number');
        console.log(this.Agree);
        this.$confirm('确定同意该请求么？', '提示', {
          type: 'success'
        })
          .then(() => {
            this.ApplyOrRefuse.project_number=this.Agree.project_number;
            this.ApplyOrRefuse.teacher_number=this.ApprovalNumber.teacher_number;
            this.ApplyOrRefuse.direct_approval=1;

            let that = this;
            let params = JSON.stringify(that.ApplyOrRefuse);
            //ajax请求
            that
              .$axios({
                  //请求方式
                  method: "post",
                  //请求路劲
                  url: "/api/apply/checkDirectApply",
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
                    message: "无此学生或无此队伍",
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
      // 拒绝成为指导老师
      Refuse_A(index,row){
        this.idx = index;
        this.Agree = row;
        // this.ApprovalNumber.teacher_number=Cookies.get('teacher_number');
        console.log(this.Agree);
        this.$confirm('确定要驳回么？', '提示', {
          type: 'error'
        })
          .then(() => {
            this.ApplyOrRefuse.project_number=this.Agree.project_number;
            this.ApplyOrRefuse.teacher_number=this.ApprovalNumber.teacher_number;
            this.ApplyOrRefuse.direct_approval=2;

            let that = this;
            let params = JSON.stringify(that.ApplyOrRefuse);
            //ajax请求
            that
              .$axios({
                  //请求方式
                  method: "post",
                  //请求路劲
                  url: "/api/apply/checkDirectApply",
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
                    message: "无此学生或无此队伍",
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
      // 得到申请
      getMyApproval(){
        let that= this;
        that.ApprovalNumber.teacher_number=Cookies.get('teacher_number');
        let params = JSON.stringify(that.ApprovalNumber);
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/apply/ViewInstructorApplication",
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
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        // this.$set(this.tableData, this.idx, this.form);
      },
      // 查看操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;
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
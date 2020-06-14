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
        <el-table-column prop="project_college" label="学院" align="center"></el-table-column>
        <el-table-column prop="project_field" label="领域" align="center"></el-table-column>
        <el-table-column prop='project_direct_teacher_name' label="指导老师" align="center"></el-table-column>
        <el-table-column label="小组成员" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-aim"
              @click="view_Members(scope.$index, scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>

        <el-table-column label="添加指导老师" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-rank"
              @click="add_Teacher(scope.$index, scope.row)"
            >添加</el-button>
          </template>
        </el-table-column>


        <el-table-column label="上传文件" width="180" align="center">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :action="actionsUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              name="fileName"
              multiple
              :limit="1"
              accept=".jpeg, .png, .pdf"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="el-upload__text" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">支持jpg/png/pdf文件</div>
            </el-upload>
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


    <!-- 小组成员弹出框 -->
    <el-dialog title="小组成员" :visible.sync="Member_Visible" width="50%">
      <el-table
        :data="team_member"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="team_member1" label="成员1"   align="center"></el-table-column>
        <el-table-column prop="team_member2" label="成员2"   align="center"></el-table-column>
        <el-table-column prop="team_member3" label="成员3"   align="center"></el-table-column>


      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMember">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加指导老师弹出框 -->
    <el-dialog title="添加指导老师" :visible.sync="editVisible" width="30%">
      <el-form :label-position="labelPosition" :model="teacher_From" :rules="rules" ref="teacher_From" label-width="100px" >
        <el-form-item label="指导老师" prop="teacher_name">
          <el-select v-model="teacher_From.teacher_number" placeholder="请选择指导老师">
            <el-option label="LiYu" value="10000001"></el-option>
            <el-option label="ZengLiGang" value="10000002"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
    name: "Project_Management",
    data(){
      return {
        actionsUrl: "/usr/fileUpload", //地址最好是拼接一下
        fileList: [
        ],
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
        team_member:[
          {
          team_member1:'',
          team_member2:'',
          team_member3:''
          },
        ],
        tableData: [
          {
            project_number: "",
            project_name:"",
            // project_team_leader: "",
            // project_direct_teacher_name: "",
            studentname0: "",
            studentname1: "",
            studentname2: "",
            project_teacher: "",
            project_college: "",
            project_field:"",

          },
        ],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        Member_Visible: false,
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

      };
    },
    methods:{
      ...mapMutations(['setToken']),
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      },
      // 获得我的项目
      getMyProject(){
        let that= this;
        that.myApply_project.student_number=Cookies.get('student_number');
        let params = JSON.stringify(that.myApply_project);
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/project/getMyJoinProject",
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
              // that.changeState();
            }else{
              that.$message({
                title: "信息错误",
                message: "你暂时还没有项目",
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
      // 添加指导老师
      add_Teacher(index,row){
        this.idx = index;
        this.form = row;
        if(this.form.project_direct_teacher_name != null){
          this.$message({
            title: "添加失败",
            message: "该项目有指导老师",
            type: "warning"
          });
        }else{
          this.apply_direct.project_number=this.form.project_number;
          this.editVisible = true;
        }


      },
      // 查看小组成员
      view_Members(index,row){
        this.idx = index;
        this.member_form = row;
        this.team_member[0].team_member1=this.member_form.studentname0;
        this.team_member[0].team_member2=this.member_form.studentname1;
        this.team_member[0].team_member3=this.member_form.studentname2;

        this.Member_Visible = true;

      },
      // 上传文件
      upLoad(){
        let formData = new FormData();
        formData.append('id', this.ID);
        formData.append('file', this.file);

        this.$axios.post('usr/fileUpload', formData)
          .then(function (response) {
            console.log(response);
          })
      },
      // 保存编辑
      saveMember() {
        this.Member_Visible = false;
      },
      // 保存编辑
      saveEdit() {
        this.apply_direct.teacher_number=this.teacher_From.teacher_number;
        let that= this;
        let params = JSON.stringify(that.apply_direct);
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/apply/applydirect",
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
              that.$message({
                title: "请求成功",
                message: "添加指导老师成功",
                type: "success"
              });
            }else{
              that.$message({
                title: "信息错误",
                message: "选择指导老师错误",
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

        this.editVisible = false;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
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
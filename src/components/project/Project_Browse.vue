<template>
  <div>

    <div class="container"  >
      <div  class="handle-box">
        <el-input v-model="search.keywords" placeholder="关键字" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <div @click="getAllProject()">
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
          <el-table-column prop="project_Name" label="名称" align="center"></el-table-column>
          <el-table-column prop="direct_teacher_name" label="指导老师" align="center"></el-table-column>
          <el-table-column prop="direct_teacher_number" label="教工号" align="center"></el-table-column>
          <el-table-column prop="project_College" label="学院" align="center"></el-table-column>
          <el-table-column prop="project_Field" label="领域" align="center"></el-table-column>
          <el-table-column prop='project_State' label="状态" align="center"></el-table-column>
          <el-table-column prop="create_time" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-zoom-in"
                @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                icon="el-icon-upload2"
                class="red"
                @click="handleApply(scope.$index, scope.row)"
              >加入</el-button>
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
    </div>

    <!-- 详细内容弹出框 -->
    <el-dialog title="详细内容" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="主题" >
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
    created() {
      // this.getAllProject()
      // this.getMenuList()
    },
    name: "Project_Browse",
    data() {
      return {
        query: {
          keywords: '',
        },
        search: {
          keywords: '',
        },
        tableData: [
          {
            create_teacher_name: '',
            create_teacher_number: '',
            create_time: '',
            direct_teacher_name: '',
            direct_teacher_number: '',
            project_College: '',
            project_Description: '',
            project_Field: '',
            project_Name: '',
            project_State: '',
            project_number: '',
            student_name: '',
            student_number: '',
          }
        ],
        tableData1: [
          {
            create_teacher_name: '',
            create_teacher_number: '',
            create_time: '',
            direct_teacher_name: '',
            direct_teacher_number: '',
            project_College: '',
            project_Description: '',
            project_Field: '',
            project_Name: '',
            project_State: '',
            project_number: '',
            student_name: '',
            student_number: '',
          }
        ],
        apply_project:
          {
            project_number: '',
            student_number:'',
          },
        myApply_project:
          {
            apply_student_number:'',
          },
        multipleSelection: [],
        delList: [],
        editVisible: false,
        searchVisible:false,
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1,
        loading: true
      }
    },
    methods: {
      ...mapMutations(['setToken']),
      // 触发搜索按钮
      handleSearch() {
        let that = this;
        let params = JSON.stringify(that.search);
        //ajax请求
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/project/searchproject",
              //请求参数
              data: params
            },
            {
              emulateJSON: true
            }
          )
          .then(function(res) {
            // console.log(res.data.code);
            if (res.data.code == "1") {
              that.tableData = res.data.data;
              // that.delete_project();
              that.changeState();
            }else{
              that.$message({
                title: "code不是1",
                message: "查看失败",
                type: "warning"
              });
            }
          }).catch(function() {
          that.$notify({
            title: "搜索失败",
            message: "服务器异常啊啊啊",
            type: "error"
          });
          console.log("服务器异常，未启动后端");
        });
      },

      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        // this.$set(this.tableData, this.idx, this.form);
      },
      // 加入操作
      handleApply(index, row) {
        // 二次确认加入
        // console.log(this.tableData);

        this.apply_project.student_number=Cookies.get('student_number');
        this.apply_project.project_number=row.project_number;

        // console.log(this.apply_project.student_number);
        console.log(row.project_State);

        if(row.project_State==='已满'){
          this.$message({
            title: "标题",
            message: "该项目已满，不能加入！",
            type: "error"
          });
          console.log(1);
        } else{
          this.$confirm('确定要加入么？', '提示', {
            type: 'success'
          })
            .then(() => {
              let that = this;
              let params = JSON.stringify(that.apply_project);
              console.log(that.apply_project);
              //ajax请求
              that
                .$axios({
                    //请求方式
                    method: "post",
                    //请求路劲
                    url: "/api/project/applyProject",
                    //请求参数
                    data: params
                  },
                  {
                    emulateJSON: true
                  }
                )
                .then(function(res) {
                  // console.log(res.data.code);
                  if (res.data.code == "1") {
                    console.log(res.data.code);
                    that.$message({
                      title: "code是1",
                      message: "申请加入成功",
                      type: "success"
                    });
                    // this.tableData.splice(index, 1);
                  }else{
                    that.$message({
                      title: "code不是1",
                      message: "你已经申请加入此project",
                      type: "warning"
                    });
                  }
                }).catch(function() {
                that.$notify({
                  title: "加入失败",
                  message: "服务器异常啊啊啊",
                  type: "error"
                });
                console.log("服务器异常，未启动后端");
              });
            })
            .catch(() => {});
        }

      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查看操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;
      },
      // 得到当前所有project
      getAllProject(){
        // console.log(this.tableData[0]);

        let that= this;
        that.myApply_project.apply_student_number=Cookies.get('student_number');
        // console.log(that.myApply_blink.apply_student_number);
        let params = JSON.stringify(that.myApply_project);
        // this.$http.get()
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/project/queryproject",
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
              console.log(that.tableData.length);
              that.changeState();
              // that.delete_project();
              console.log(that.tableData.length);

            }else{
              that.$message({
                title: "信息错误",
                message: "aaaaaaaaaaaaaaaaaaaaa",
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
        this.loading=false

      },
      // 删除已满project
      delete_project(){
        // for(let i = 0; i<this.tableData1.length;i++){
        //    if(this.tableData1[i].project_State=='已满'){
        //     this.tableData[i]=this.tableData1[i];
        //   }
        // }
        // console.log(this.tableData);
        this.tableData=this.tableData1;
        console.log(this.tableData);
      },
      // 改变状态
      changeState(){


        for(let i = 0; i<this.tableData.length;i++){
          if(this.tableData[i].project_State=='0'||this.tableData[i].project_State=='1' || this.tableData[i].project_State=='2'){
            this.tableData[i].project_State='还未满'
          }
          if(this.tableData[i].project_State=='3' || this.tableData[i].project_State=='4'){
            this.tableData[i].project_State='已满'
          }


        }
      },
    }

  }
</script>

<style scoped>

</style>
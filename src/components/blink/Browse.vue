<template>
  <div>

    <div class="container"  >
      <div  class="handle-box">
        <el-input v-model="search.keywords" placeholder="关键字" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <div @click="getAllBlink()">
        <el-table

          v-loading="loading"
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="blink_number" label="ID" width="55" align="center"></el-table-column>
          <el-table-column prop="blink_title" label="主题" align="center"></el-table-column>
          <el-table-column prop="student_name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="student_number" label="学号" align="center"></el-table-column>
          <el-table-column prop="blink_college" label="学院" align="center"></el-table-column>
          <el-table-column prop="blink_field" label="领域" align="center"></el-table-column>
          <el-table-column prop='blink_state' label="状态" align="center"></el-table-column>
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
          <el-input v-model="form.blink_title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="10" style="height: 170px" v-model="form.blink_content" disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<!--                <el-button @click="editVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详细内容弹出框 -->
    <el-dialog title="详细内容" :visible.sync="searchVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="主题">
          <el-input v-model="form.blink_title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="10" style="height: 170px" v-model="form.blink_content" disabled="disabled"></el-input>
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
      this.getAllBlink()
      // this.getMenuList()
    },
    name: "Browse",
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
            blink_number: "",
            student_number:"",
            blink_title: "",
            blink_content:"",
            create_time: "",
            blink_college: "",
            blink_field:"",
            blink_state: "",
            student_name:'',
          }
        ],
        searchData: [
          {
            blink_number: "",
            student_number:"",
            blink_title: "",
            blink_content:"",
            create_time: "",
            blink_college: "",
            blink_field:"",
            blink_state: "",
            student_name:'',
          }
        ],
        apply_blink:
          {
            blink_number: '',
            student_number:'',
          },
        myApply_blink:
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
      };
    },
    created(){
      // @click="getAllBlink()"
     // this.auto()
    },
    methods: {
      ...mapMutations(['setToken']),

      auto(){
        this.getAllBlink()
      },
      // 触发搜索按钮
      handleSearch() {
        // this.searchVisible=true
        let that = this;
        let params = JSON.stringify(that.search);
        //ajax请求
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/blink/searchblink",
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
              // console.log(that.searchData);
              // that.changeData()
              that.changeState()
            }else{
              that.$message({
                title: "code不是1",
                message: "你已经申请加入此blink",
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
      // 加入操作
      handleApply(index, row) {
        // 二次确认加入
        this.apply_blink.student_number=Cookies.get('student_number');
        this.apply_blink.blink_number=row.blink_number;
        console.log(row.student_number);
        console.log(this.apply_blink.student_number);
        if (this.apply_blink.student_number == row.student_number){
          this.$message({
            title: "标题",
            message: "你不能加入自己发布的组队！",
            type: "error"
          });
          console.log(1);
        }else{
          this.$confirm('确定要加入么？', '提示', {
            type: 'success'
          })
            .then(() => {
              let that = this;
              let params = JSON.stringify(that.apply_blink);
              console.log(that.apply_blink);
              //ajax请求
              that
                .$axios({
                    //请求方式
                    method: "post",
                    //请求路劲
                    url: "/api/blink/applyBlink",
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
                    // this.tableData.splice(index, 1);
                  }else{
                    that.$message({
                      title: "code不是1",
                      message: "你已经申请加入此blink",
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
      // 删除操作
      delAllSelection() {
        const length = this.multipleSelection.length;
        let str = '';
        this.delList = this.delList.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].name + ' ';
        }
        this.$message.error(`删除了${str}`);
        this.multipleSelection = [];
      },
      // 编辑操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        // this.$set(this.tableData, this.idx, this.form);
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
      },

      // 得到当前所有blink
      getAllBlink(){
        // console.log(this.tableData[0]);

        let that= this;
        that.myApply_blink.apply_student_number=Cookies.get('student_number');
        // console.log(that.myApply_blink.apply_student_number);
        let params = JSON.stringify(that.myApply_blink);
        // this.$http.get()
        that
          .$axios({
              //请求方式
              method: "post",
              //请求路劲
              url: "/api/blink/myBlink",
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
      // 改变状态
      changeState(){
        for(let i = 0; i<this.tableData.length;i++){
          if(this.tableData[i].blink_state=='0'){
            this.tableData[i].blink_state='未满'
          }
        }
      },
      // 改变数据
      changeData(){
        console.log(this.tableData);
        this.tableData=[{
          blink_number: "",
          student_number:"",
          blink_title: "",
          blink_content:"",
          create_time: "",
          blink_college: "",
          blink_field:"",
          blink_state: "",
          student_name:'',
        }]
        console.log("changeData");
        console.log(this.tableData);
        console.log(this.searchData);

        this.tableData=this.searchData

        // for(let i = 0; i<this.searchData.length;i++){
        //   console.log(i);
        //   console.log("i个");
        //   console.log(this.searchData[i].blink_number);
        //   this.tableData[i].blink_number=this.searchData[i].blink_number
        //   console.log("blink number");
        //   this.tableData[i].blink_title=this.searchData[i].blink_title
        //   this.tableData[i].blink_content=this.searchData[i].blink_content
        //   this.tableData[i].creat_time=this.searchData[i].create_time
        //   this.tableData[i].blink_college=this.searchData[i].blink_college
        //   this.tableData[i].blink_field=this.searchData[i].blink_field
        //   this.tableData[i].blink_state=this.searchData[i].blink_state
        //   this.tableData[i].student_name=this.searchData[i].student_name
        //
        // }
        console.log(this.tableData);
      }
    }
  }
</script>

<style>


  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
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
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
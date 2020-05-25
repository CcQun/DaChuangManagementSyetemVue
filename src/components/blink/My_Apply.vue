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
              icon="el-icon-s-opportunity"
              class="red"
              @click="ViewEdit(scope.$index, scope.row) "
            >查看</el-button>

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
          <el-input v-model="form.blink_title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="5" v-model="form.blink_content" disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<!--                <el-button @click="editVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 审批内容弹出框 -->
    <el-dialog title="审批成员" :visible.sync="ApprovalVisible" width="50%">
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
    name: "My_Apply",

    data() {
      return {
        query: {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 9
        },
        myApply_blink:
          {
            student_number:'',
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
    methods: {
      ...mapMutations(['setToken']),
      // 获取 easy-mock 的模拟数据
      getData() {
        // fetchData(this.query).then(res => {
        //   console.log(res);
        //   this.tableData = res.list;
        //   this.pageTotal = res.pageTotal || 50;
        // });
      },
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
      DeleteBlink(index,row){
        this.idx = index;
        this.form = row;
        this.DeleteBlink_number.blink_number=this.form.blink_number;

        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$message.success('删除成功');
            this.tableData.splice(index, 1);
          })
          .catch(() => {});
        console.log(this.DeleteBlink_number.blink_number);


      },
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


      // 查看操作
      ViewEdit(index,row){
        this.idx = index;
        this.form = row;
        this.editVisible = true;
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
      // 得到当前所有blink
      getMyBlink(){
        let that= this;
        that.myApply_blink.student_number=Cookies.get('student_number');
        let params = JSON.stringify(that.myApply_blink);
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
          if(this.tableData[i].blink_state=='0'){
            this.tableData[i].blink_state='未满'
          }
        }
      },

    },
    mounted() {
      //
    },
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
<template>
  <!-- <span>-->
  <!--   <el-container>-->
  <!--   <el-aside width="100px" > </el-aside>-->

  <!--   <el-main>-->
  <!--     <el-card class="top-box-card">-->
  <!--        <el-card class="box-card">-->
  <!--          <div v-for="o in 4" :key="o" class="text item">-->
  <!--          {{'列表内容 ' + o }}-->
  <!--          </div>-->
  <!--        </el-card>-->
  <!--     </el-card>-->
  <!--   </el-main>-->
  <!--   <el-aside width="100px" > </el-aside>&lt;!&ndash;  中间布局&ndash;&gt;-->
  <!--   </el-container>-->
  <!-- </span>-->

  <div>

    <div class="container">
      <div class="handle-box">
        <!--        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
        <!--          <el-option key="1" label="广东省" value="广东省"></el-option>-->
        <!--          <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
        <!--        </el-select>-->
        <el-input v-model="query.name" placeholder="关键字" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="主题"></el-table-column>
        <el-table-column prop="student_name" label="姓名"></el-table-column>
        <el-table-column prop="student_number" label="学号"></el-table-column>
        <el-table-column prop="blink_colleges" label="学院"></el-table-column>
        <el-table-column prop="blink_fields" label="领域" align="center"></el-table-column>
        <el-table-column prop='state' label="状态" align="center"></el-table-column>

        <el-table-column prop="date" label="发布时间"></el-table-column>
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

    <!-- 编辑弹出框 -->
    <el-dialog title="详细内容" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="主题">
          <el-input v-model="form.title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content" disabled="disabled"></el-input>
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
    name: "Browse",
    data() {
      return {
        query: {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 10
        },
        tableData: [
          {
            date: "2019-11-1",
            id: 1,
            title: 123,
            blink_colleges: "软件",
            blink_fields:'人工智能',
            state: "未满",
            content:'这是内容',
            student_name:'列车员',
            student_number:17301097,
          },
          {
            date: "2019-11-1",
            id: 2,
            title: 123,
            blink_colleges: "软件",
            blink_fields:'人工智能',
            state: "未满",
            student_name:'列车员',
            student_number:17301097,
          },
          {
            date: "2019-11-1",
            id: 2,
            title: 123,
            blink_colleges: "软件",
            blink_fields:'人工智能',
            state: "未满",
            student_name:'列车员',
            student_number:17301097,
          },



        ],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1
      };
    },
    created() {
      // this.getData();
    },
    methods: {
      ...mapMutations(['setToken']),
      // 获取 easy-mock 的模拟数据
      getData() {
        fetchData(this.query).then(res => {
          console.log(res);
          this.tableData = res.list;
          this.pageTotal = res.pageTotal || 50;
        });
      },
      // 触发搜索按钮
      handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
      },
      // 加入操作
      handleApply(index, row) {
        // 二次确认加入
        this.$confirm('确定要加入么？', '提示', {
          type: 'warning'
        })
          .then(() => {

            this.$message.success('加入成功');
            // this.tableData.splice(index, 1);
          })
          .catch(() => {});
      },



      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.tableData, this.idx, this.form);
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
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
<template>
  <el-container>
    <el-aside width="300px"></el-aside>
    <el-card class="box-card">
      <el-form  label-width="200px">
        <el-container>
          <el-aside width="40px" > </el-aside>
          <el-main>
            <!--              <h2>发布项目</h2>-->
            <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item  label="项目主题" prop="blink_title">
                <el-input v-model="ruleForm.blink_title" class="input_w"></el-input>
              </el-form-item>
              <el-form-item label="项目学院" prop="blink_college">
                <el-select v-model="ruleForm.blink_college" placeholder="请选项目学院">
                  <el-option label="软件学院" value="ruanjian"></el-option>
                  <el-option label="经管学院" value="jingguan"></el-option>
                  <el-option label="理学院" value="li"></el-option>
                  <el-option label="计算机学院" value="jisuanji"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="项目领域" prop="blink_field">
                <el-input v-model="ruleForm.blink_field"></el-input>
              </el-form-item>

              <el-form-item label="项目内容" prop="blink_content" class="blink_con">
                <el-input type="textarea" rows="10" v-model="ruleForm.blink_content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <el-aside width="40px" > </el-aside><!--  中间布局-->
        </el-container>
      </el-form>
    </el-card>
    <el-aside width="100px"></el-aside>
  </el-container>
</template>

<script>
  export default {
    name: "Project_Browse"
  }
</script>

<style scoped>

</style>
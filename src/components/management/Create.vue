<template>
  <span>create</span>
</template>

<script>
  export default {
    name: "Create",
    data() {
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
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
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>
<style>
.pagination {
  text-align: center;
  margin-top: 30px;
}
.datafilter .el-form-item {
  margin-bottom: 0;
}
th .cell {
  text-align: center;
}
</style>

<template>
  <div>
    <page-tools type="warning" :show-before="false">
      <template #before>
        <span>共25条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </page-tools>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools/index.vue'
// export default {
//   components: {
//     PageTools
//   }
// }
</script>

<style>

</style>

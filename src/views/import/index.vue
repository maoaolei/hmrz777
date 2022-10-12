<template>
  <div>
    <UploadExcel :on-success="handlesuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async handlesuccess({ header, results }) {
      // console.log(results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      console.log(arr)
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.back()
    }
  }

}
</script>

<style>

</style>

<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <UploadExcel :on-success="handlesuccess" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // async created() {
  //   const res = await this.$store.dispatch('user/getUserInfo')
  //   console.log(res)
  //   // res.username = '123'
  // }
  methods: {
    handlesuccess(data) {
      console.log(data)
    },
    beforeUpload(file) {
      console.log(file)
      if (file.size > 10240) {
        this.$message.error('文件太大')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

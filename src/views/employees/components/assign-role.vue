<template>
  <el-dialog
    title="分配角色"
    :visible.sync="dialogVisible2"
    width="50%"
    :before-close="handleClose"
    @open="onOpen"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="setrole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRole } from '@/api/role'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    dialogVisible2: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkList: [],
      list: [],
      userId: ''
    }
  },
  methods: {
    cancel() {
      this.$emit('update:dialog-visible2', false)
    },
    handleClose() {
      this.cancel()
    },
    async onOpen() {
      const { rows } = await getRole()
      // console.log(rows)
      this.list = rows
      this.getemployeesrole()
    },
    async getemployeesrole() {
      // console.log(this.userId)
      const res = await getUserDetailById(this.userId)
      this.checkList = res.roleIds || []
      // console.log(res)
    },
    async setrole() {
      // console.log(321)
      if (!this.checkList.length) return this.$message.error('请分配角色')
      try {
        await assignRoles({
          id: this.userId,
          roleIds: this.checkList
        })
        this.$message.success('分配角色成功')
      } catch (error) {
        this.$message.error('分配角色失败')
      } finally {
        this.cancel()
      }
    }
  }
}
</script>

<style>

</style>

<template>
  <el-dialog
    title="分配权限"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
    @open="onOpen"
  >
    <el-tree
      ref="tree"
      :data="data"
      node-key="id"
      :props="defaultProps"
      show-checkbox
      default-expand-all
      :default-checked-keys="defCheck"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="saverolepermission">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPerimissions } from '@/api/permission'
import { getrolesInfo, setrolespermis } from '@/api/role'
import { tranListToTreeData } from '@/utils'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: [],
      defCheck: [],
      defaultProps: {
        label: 'name'
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('update:dialog-visible', false)
    },
    cancel() {
      this.onClose()
    },
    async onOpen() {
      const res = await getPerimissions()
      this.data = tranListToTreeData(res, '0')
      // console.log(this.data)
      this.getRolePermission()
    },
    async getRolePermission() {
      // console.log(this.roleId)
      const res = await getrolesInfo(this.roleId)
      this.defCheck = res.permIds
      // console.log(res)
    },
    async saverolepermission() {
      const id = this.roleId
      const permIds = this.$refs.tree.getCheckedKeys()
      console.log(permIds)
      await setrolespermis({ id, permIds })
      // console.log(res)
      this.$message.success('更新权限成功')
      this.onClose()
    }
  }
}
</script>

<style>

</style>

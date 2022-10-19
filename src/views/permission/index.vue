<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="false">
        <template #after>
          <el-button type="primary" @click="addper(1,'0')">添加权限</el-button>
        </template>
      </PageTools>
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        row-key="id"
      >
        <el-table-column
          label="名称"
        >
          <template slot-scope="{row}">
            <div @click="expandCloum(row)">
              <template v-if="row.type===1">
                <i class="el-icon-folder-opened" />
                {{ row.name }}
              </template>
              <template v-else>
                <i class="el-icon-folder" style="margin-left:20px" />
                {{ row.name }}
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="标识"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button v-if="row.type===1" type="text" @click="addper(2,row.id)">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增权限"
      :visible.sync="dialogVisible"
      width="50%"
      @close="onClose"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="form.enVisible"
            active-color="#66b1ff"
            inactive-color="#ccc"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPerimissions, addPerimissions } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        name: '',
        description: '',
        code: '',
        enVisible: '0',
        type: '',
        pid: ''
      },
      rules: {
        name: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        code: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getPerimissions()
  },
  methods: {
    async getPerimissions() {
      const res = await getPerimissions()
      this.tableData = tranListToTreeData(res, '0')
      // console.log(res)
    },
    expandCloum(row) {
      row.isShow = !row.isShow
      this.$refs.table.toggleRowExpansion(row, row.isShow)
    },
    addper(type, pid) {
      this.dialogVisible = true
      this.form.type = type
      this.form.pid = pid
    },
    async sure() {
      await this.$refs.form.validate()
      // console.log(this.form)
      await addPerimissions(this.form)
      this.getPerimissions()
      this.$message.success('添加成功')
      this.dialogVisible = false
    },
    onClose() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: '',
        code: '',
        enVisible: '0',
        type: '',
        pid: ''
      }
      this.dialogVisible = false
    }
  }

}
</script>

<style scoped lang="scss">
::v-deep .el-table__expand-icon {
  display: none !important;
}

</style>

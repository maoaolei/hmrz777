<template>
  <div class="departments-container">
    <el-card>
      <treenode :tree-node="company" :flag="false" @addDepts="changeshow" />
    </el-card>
    <el-tree :data="departs" default-expand-all :props="defaultprops">
      <treenode slot-scope="{ data }" :tree-node="data" @addDepts="changeshow" />
    </el-tree>
    <adddept :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treenode from './components/treenode.vue'
import { tranListToTreeData } from '@/utils/index'
import adddept from './components/add-dept.vue'
export default {
  components: {
    treenode,
    adddept
  },
  data() {
    return {
      departs: [],
      defaultprops: {
        label: 'name'
      },
      company: {},
      showDialog: false,
      currentNode: {}

    }
  },
  created() { this.getDepartments() },
  methods: {
    async getDepartments() {
      const { depts, companyName, companyManage } = await getDepartments()
      // console.log(depts)
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    changeshow(node) {
      this.showDialog = true
      this.currentNode = node
    }
  }

}
</script>

<style lang="scss" scoped>
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-card__body {
      padding-right: 4px;
    }
    // .el-tree {
    //   .el-tree-node__content {
    //     // padding-right: 20px;
    //   }
    // }
  }
  </style>

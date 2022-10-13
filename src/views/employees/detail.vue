<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="登录账户设置" name="first" lazy>
            <el-form
              ref="form"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
              :model="accountInfo"
              :rules="rules"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accountInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accountInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second" lazy>
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third" lazy>
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      rules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在六位以上', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
      // console.log(res)
    },
    async update() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        console.log('校验成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      console.log(this.activeName)
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>

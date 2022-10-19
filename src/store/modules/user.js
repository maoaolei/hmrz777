import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsassTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_HRSASSTIME(state, hrsassTime) {
      state.hrsassTime = hrsassTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
      commit('SET_HRSASSTIME', +new Date())
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const points = ['role-add', 'role-assgin']
      res.roles.points = points
      const res1 = await getUserDetailById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      return res.roles
    },
    logout({ commit }) {
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
      resetRouter()
    }
  }
}

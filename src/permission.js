import router from '@/router'
import store from '@/store'
import { asyncRoutes } from '@/router'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    if (!store.getters.userId) {
      const roles = await store.dispatch('user/getUserInfo')
      console.log(asyncRoutes)
      console.log(roles)
      const filterRouters = asyncRoutes.filter(item => {
        return roles.menus.includes(item.meta.id)
      })
      console.log(filterRouters)
      router.addRoutes([...filterRouters, { path: '*', redirect: '/404', hidden: true }])
      store.commit('permission/setRoutes', filterRouters)
      // 动态添加的路由规则，后面的next必须是next(to.path)
      next(to.path)
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})

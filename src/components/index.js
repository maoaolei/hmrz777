// import PageTools from './PageTools'
// const components = [PageTools]
// export default {
//   install(Vue) {
//     components.forEach(item => {
//       console.log(item)
//       Vue.component(item.name, item)
//     })
//   }
// }

const fn = require.context('./', true, /\.vue$/)
console.log(fn.keys()) // 路径
console.log(fn('./PageTools/index.vue')) // 根据路径查找方法
// 一次性导入所有模块
const components = fn.keys().map(item => {
  return fn(item)
})

export default (Vue) => {
  components.forEach(item => {
    console.log(item)
    Vue.component(item.default.name, item.default)
  })
}

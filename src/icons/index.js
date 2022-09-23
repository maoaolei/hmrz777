import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
console.log(req.keys())
// console.log(req('./dashboard.svg'))
// const requireAll = requireContext => requireContext.keys().map(requireContext)
const requireAll = requireContext => requireContext.keys().map((val) => {
  return requireContext(val)
})
// map返回一个新数组 长度和原来一样 映射
// ['./dashboard.svg'].map(requireContext)
requireAll(req)
console.log(requireAll(req))

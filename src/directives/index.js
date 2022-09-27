export const imgerror = {
  inserted(el, binding, vnode) {
    // el dom
    // console.log(el)
    // binding当前指令的相关信息
    // console.log(binding)
    // vnode虚拟节点
    // console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}

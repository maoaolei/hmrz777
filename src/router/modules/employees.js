import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/employees'),
      name: 'employees',
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '员工',
        icon: 'people'// meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      }
    },
    {
      path: '/employees/detail/:id',
      hidden: true,
      component: () => import('@/views/employees/detail.vue')
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print.vue'),
      hidden: true
    }
  ]
}


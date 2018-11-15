import Layout from '@/views/layout/Layout'

const userinfoManagerouter = {
  path: '/userinfoManage',
  component: Layout,
  redirect: 'noredirect',
  children: [
    {
      path: 'index',
      component: () => import('@/views/userinfoManage/index'),
      name: 'Theme',
      meta: { title: 'userinfoManage', icon: 'table' }
    }
  ]
}

export default userinfoManagerouter

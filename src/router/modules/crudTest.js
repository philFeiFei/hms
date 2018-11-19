import Layout from '@/views/layout/Layout'

const crudTestrouter = {
  path: '/crudTest',
  component: Layout,
  redirect: 'noredirect',
  children: [
    {
      path: 'crudTest',
      component: () => import('@/views/crudTest/crudTest'),
      name: 'crudTest',
      meta: { title: 'crudTest', icon: 'table' }
    }
  ]
}

export default crudTestrouter

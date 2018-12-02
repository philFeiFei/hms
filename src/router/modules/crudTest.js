import Layout from '@/views/layout/Layout'

const crudTestrouter = {
  path: '/crudTest',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    roles: ['admin']
  },
  children: [
    {

      path: 'crudTest',
      component: () => import('@/views/crudTest/crudTest'),
      name: 'crudTest',
      meta: {
        title: 'crudTest', icon: 'table',
        roles: ['admin'],
      }
    }
  ]
}

export default crudTestrouter

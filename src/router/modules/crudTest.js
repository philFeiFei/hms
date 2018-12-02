import Layout from '@/views/layout/Layout'

const crudTestrouter = {
  path: '/crudTest',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    roles: ['1']
  },
  children: [
    {

      path: 'crudTest',
      component: () => import('@/views/crudTest/crudTest'),
      name: 'crudTest',
      meta: {
        title: 'crudTest', icon: 'table',
        roles: ['1'],
      }
    }
  ]
}

export default crudTestrouter

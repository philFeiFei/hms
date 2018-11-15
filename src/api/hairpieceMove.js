import request from '@/utils/request'
export function queryHairpiece(query) {
  console.log('进入article api 查询complex table。')
  return request({// 查询complex table，如果配置mock，则跳入mock对应的url。--phil
    url: '/hairpieceMove/query',
    method: 'get',
    params: query
  })
}

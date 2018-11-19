import request from '@/utils/request'
export function queryHairPici(query) {
  return request({
    url: '/hairpieceMultiManage/query',
    method: 'post',
    params: query //ordinary default sftd:0   ;  special default sftd:1
  })
}

export function createHairPici(data) {
  return request({
    url: '/hairpieceMultiManage/create',
    method: 'post',
    params: data
  })
}

export function deleteHairPici(data) {
  return request({
    url: '/hairpieceMultiManage/delete',//set yxbz = 0
    method: 'post',
    params: data
  })
}

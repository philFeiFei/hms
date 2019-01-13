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
    data//这里不能传入params。。。想传入对象，就这样。。
  })
}

export function deleteHairPici(data) {
  return request({
    url: '/hairpieceMultiManage/delete',//set yxbz = 0
    method: 'post',
    params: data
  })
}

export function getDetail4QRCode(data) {
  return request({
    url: '/hairpieceMultiManage/getDetail4QRCode',
    method: 'post',
    params: data
  })
}

export function getDetail4QRCodeByDdbh(data) {
  return request({
    url: '/jfinfo/queryJfInfoByDdbh',
    method: 'post',
    params: data
  })
}


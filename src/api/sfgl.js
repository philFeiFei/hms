import request from '@/utils/request'
export function queryRkinfo(query) {
  return request({
    url: '/sfrkgl/sfrkcx',
    method: 'post',
    data: query
  })
}

export function addRkinfo(data) {
  return request({
    url: '/sfrkgl/sfrkxz',
    method: 'post',
    data: data
  })
}

export function deleteRkinfo(data) {
  return request({
    url: '/sfrkgl/sfrksc',
    method: 'post',
    params: data
  })
}

export function queryCkinfo(query) {
  return request({
    url: '/sfckgl/sfckcx',
    method: 'post',
    data: query
  })
}

export function addCkinfo(data) {
  return request({
    url: '/sfckgl/sfckxz',
    method: 'post',
    data: data
  })
}

export function deleteCkinfo(data) {
  return request({
    url: '/sfckgl/sfcksc',
    method: 'post',
    params: data
  })
}

import request from '@/utils/request'
import { buildParams } from '@/utils'
export function xadminList(path, params) {
  params = buildParams(params)
  return request({
    url: path,
    method: 'get',
    params
  })
}
export function xadminCreate(path, data) {
  return request({
    url: path,
    method: 'post',
    data
  })
}

export function xadminGetOne(path, pk, params) {
  return request({
    url: path + '/' + pk,
    method: 'get',
    params
  })
}
export function xadminUpdate(path, id, data) {
  return request({
    url: path + '/' + id,
    method: 'put',
    data
  })
}
export function xadminDelete(path, id) {
  return request({
    url: path + '/' + id,
    method: 'delete'
  })
}
export function xadminCustom(path, data) {
  return request({
    url: path,
    method: 'post',
    data
  })
}

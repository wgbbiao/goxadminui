import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}

export function getMyVenue() {
  return request({
    url: '/myVenues',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function RefreshJwt() {
  return request({
    url: '/refreshjwt',
    method: 'get'
  })
}

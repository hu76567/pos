import http from '../utils/request.js'

/**
 * 查商品
 * @returns
 */
export function searchGood (data) {
  return http({
    url: 'msg/list',
    method: 'post',
    data
  })
}

/**
 * 查会员
 * @returns
 */
export function searchVip (data) {
  return http({
    url: 'msg/member',
    method: 'post',
    data
  })
}

/**
 * 查营业员
 * @param {*} data
 * @returns
 */
export function searchEmp (data) {
  return http({
    url: 'msg/employee',
    method: 'post',
    data
  })
}

/**
 * 登录
 * @param {*} data
 * @returns
 */
export function login (data) {
  return http({
    url: '/login/user',
    method: 'post',
    data
  })
}

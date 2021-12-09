
import http from '../utils/request.js'
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

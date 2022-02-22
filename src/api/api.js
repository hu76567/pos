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
 * 获取组织和药师接口
 * @param {*} data
 * @returns
 */
export function getOrganizationAndPharmacist () {
  return http({
    url: 'msg/organization',
    method: 'post'
  })
}

/**
 * 查流水号
 * @param {*} data
 * @returns
 */
export function getOverFlow (data) {
  return http({
    url: 'msg/billnum',
    method: 'post',
    data
  })
}

/**
 * 根据流水号查单据
 * @param {*} data  LSH
 * @returns
 */

export function searchByOverflow (data) {
  return http({
    url: 'msg/out',
    method: 'post',
    data
  })
}

/**
 * 回传guid 查明细
 * @param {*} data
 * @returns
 */
export function returnBackGuid (data) {
  return http({
    url: 'msg/out/detail',
    method: 'post',
    data
  })
}

/**
 * 获取支付方式
 * @param {*} data
 * @returns
 */
export function getPaymentWay () {
  return http({
    url: 'msg/sk',
    method: 'post'
  })
}

/**
 * 生成出库单
 * @param {*} data
 * @returns
 */
export function GenerateOutgoingList (data) {
  return http({
    url: 'msg/insert/out',
    method: 'post',
    data
  })
}

/**
 *   提交挂单
 * @param
 * @returns
 */
export function insertBill (data) {
  return http({
    url: 'msg/insert/bill',
    method: 'post',
    data
  })
}

/**
 * 读卡接口
 * @param {*} data
 * @returns
 */
export function getReadCard (data) {
  return http({
    url: '/yb/readCardBus',
    method: 'post',
    data
  })
}

/**
 * 读电子医保凭证
 * @param {*} data
 * @returns
 */
export function reMc (data) {
  return http({
    url: '/yb/ecQuery',
    method: 'post',
    data
  })
}

/**
 * 查询身份证身份信息
 */
export function queryByIpt (data) {
  return http({
    url: '/yb/readCardBusForSFZ',
    method: 'post',
    data
  })
}

/**
 * 根据身份信息获取基本信息
 * @param {*} data
 * @returns
 */
export function queryInfoByIdentity (data) {
  return http({
    url: '/yb/readSFZ',
    method: 'post',
    data
  })
}

/**
 * 医保预结算
 * @param {*} data
 * @returns
 */
export function preSettlement (data) {
  return http({
    url: '/yb/preSetl',
    method: 'post',
    data
  })
}

/**
 * 医保正式结算
 * @param {*} data
 * @returns
 */
export function formalSettlement (data) {
  return http({
    url: 'yb/setl',
    method: 'post',
    data
  })
}

/**
 * 医保撤销结算
 * @param {*} data
 * @returns
 */
export function cancelSetl (data) {
  return http({
    url: 'yb/cancelSetl',
    method: 'post',
    data
  })
}

/**
 *  医保收款
 * @param {*} data
 * @returns
 */
export function receivePayment (guid) {
  return http({
    url: 'yb/receivePayment'
  })
}

/**
 * 修改密码
 * @param {*} data
 * @returns
 */
export function changePassword (data) {
  return http({
    url: '/yb/changePIN',
    method: 'post',
    data
  })
}

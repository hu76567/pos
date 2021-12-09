import dayjs from 'dayjs'

export default {
  install (Vue) {
    Vue.prototype.$dealTime = dealTime
    Vue.prototype.$relTime = relTime
    Vue.prototype.$minTime = minTime
  }
}

function dealTime (date) {
  return dayjs(date).format('YYYY-MM-DD')
}

function relTime (date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

function minTime (date) {
  return dayjs(date).format('HH:mm:ss')
}

/**
 * 获取guid
 * @returns
 */
export function generateUUID () {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

/**
 * 乘法精度问题
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function floatMultiply (arg1, arg2) {
  if (arg1 == null || arg2 == null) {
    return null
  }
  var n1, n2
  var r1, r2 // 小数位数
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  n1 = Number(arg1.toString().replace('.', ''))
  n2 = Number(arg2.toString().replace('.', ''))
  return n1 * n2 / Math.pow(10, r1 + r2)
};

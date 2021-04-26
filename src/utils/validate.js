/* 判断是否为空 */
export function validateNull(val) {
  if (val instanceof Array) {
    if (val.length === 0) {
      return true
    }
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') {
      return true
    }
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') {
      return true
    }
    return false
  }
  return false
}

// 获取唯一guid
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function getGUID() {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/* 验证邮箱 */
export function validateEmail(email) {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  return reg.test(email)
}

/* 验证手机号码是否合法 */
export function validateMobile(mobile) {
  const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  return reg.test(mobile)
}

/* 验证身份证号是否合法（有漏洞） */
export function validateID(id) {
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(id)
}

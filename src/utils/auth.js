// 设置cookie
function setcookie(name, value) {
  var iDate = 10 * 24 * 60 * 60 * 1000
  var oDate = new Date()
  oDate.setDate(oDate.getDate() + iDate)
  document.cookie = name + '=' + value + ';expires=' + oDate
}

// 获取cookie
function getcookie(name) {
  var str = document.cookie
  var arr = str.split('; ')
  for (var i = 0; i < arr.length; i++) {
    var arr1 = arr[i].split('=')
    // eslint-disable-next-line eqeqeq
    if (arr1[0] == name) {
      return arr1[1]
    }
  }
  return ''
}

// 删除cookie
function removecookie(name) {
  setcookie(name, '', -1)
}

// 判断是否支持localStorage
function isLocalStorageSupport() {
  try {
    var isSupport = 'localStorage' in window && window['localStorage'] !== null
    if (isSupport) {
      localStorage.setItem('__test', '1')
      localStorage.removeItem('__test')
    }
    return isSupport
  } catch (e) {
    return false
  }
}

// 获取本地存取
export function getItem(key) {
  if (isLocalStorageSupport()) {
    return window.localStorage.getItem(key)
  } else if (window.navigator.cookieEnabled) {
    return getcookie(key)
  }
  return null
}

// 存储到本地
export function setItem(key, value) {
  if (isLocalStorageSupport()) {
    return window.localStorage.setItem(key, value)
  } else if (window.navigator.cookieEnabled) {
    return setcookie(key, value)
  }
  return null
}

// 清除本地存储
export function removeItem(key) {
  if (isLocalStorageSupport()) {
    return window.localStorage.removeItem(key)
  } else if (window.navigator.cookieEnabled) {
    return removecookie(key)
  }
  return null
}


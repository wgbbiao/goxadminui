/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

export function buildParams(params) {
  var p = {}
  for (const key in params) {
    if (['page', '__all__', 'o', 'preloads'].includes(key)) {
      p[key] = params[key]
    } else {
      if (params.hasOwnProperty(key)) {
        if (params[key] !== '' && params[key] !== '__all__') {
          if (key.indexOf('__') === -1) {
            p['_p_' + key + '__exact'] = params[key]
          } else {
            p['_p_' + key] = params[key]
          }
        }
      }
    }
  }
  return p
}

export function GetFormDataFromRes(res, _exclude) {
  var formData = {}
  const exclude = ['created_at', 'updated_at']
  if (_exclude) {
    exclude.push(..._exclude)
  }
  Object.entries(res).forEach(([key, value]) => {
    if (exclude.indexOf(key) === -1) {
      if (Array.isArray(value)) {
        const vs = []
        value.forEach(v => {
          if (v.hasOwnProperty('id')) {
            vs.push(v.id)
          } else {
            return
          }
        })
        if (vs.length > 0) {
          formData[key] = vs
        } else {
          // const vs = []
          // value.forEach(v => {
          //   vs.push(GetFormDataFromRes(v, _exclude))
          // })
          formData[key] = value
        }
      } else {
        formData[key] = value
      }
    }
  })
  return formData
}

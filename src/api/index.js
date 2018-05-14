import axios from 'axios'

const baseUrl = 'http://collect.frontend.web.fei'

export const request = (method = 'get', url, headers, options = {}) => {
  if (arguments.length === 3) {
    options = headers
    headers = {}
  }
  const key = ~['delete', 'get', 'head'].indexOf(method) ? 'params' : 'data'

  return axios({
    'url': url.indexOf('http') !== -1 ? url : baseUrl + url,
    'method': method,
    'headers': headers,
    [key]: options
  })
}

export const create = (data) => {
  return request('POST', '/list/create', data)
}

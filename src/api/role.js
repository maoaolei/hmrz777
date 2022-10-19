import request from '@/utils/request'
export const getRole = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export const getrolesInfo = (id) => {
  return request({
    url: '/sys/role/' + id
  })
}

export const setrolespermis = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}

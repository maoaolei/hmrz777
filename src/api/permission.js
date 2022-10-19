import request from '@/utils/request.js'
export const getPerimissions = () => {
  return request({
    url: '/sys/permission'
  })
}

export const addPerimissions = (data) => {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

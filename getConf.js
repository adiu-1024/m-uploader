
// 获取COS配置信息
const getConf = async () => {
  const config = await fetch('/api/upload/getTmpKey', {
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Authorization': localStorage.getItem('ctoken')
    },
  }).then(response => {
    const { ok, status, statusText } = response
    if (!ok) {
      return Promise.reject({ status, statusText })
    } else {
      return response.json()
    }
  })
  return config
}

export default getConf

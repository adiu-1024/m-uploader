
import validator from './validator'
import generatorFileInfo from './fileInfo'
import generatorHash from './hash'
import getConf from './getConf'
import uploadFilesToCOS from './upload'

class Uploader {
  constructor({ selector, callback }) {
    const fileInput = document.querySelector(selector.startsWith('#') ? selector : `#${selector}`)
    fileInput.addEventListener('change', async () => {
      const files = [...event.target.files]
      event.target.value = null
      files.length && callback(files)
    })
  }
  revokeLocalURL(filesInfo) {
    filesInfo.forEach(({ file, data }) => {
      URL.revokeObjectURL(data.localURL)
      delete data.localURL
    })
  }
  async beforeUpload({ type, files }) {
    let data = null
    // 文件的格式、大小校验
    const result = await validator(type, files)
    if (!result.valid) return Promise.reject(result)
    // 获取文件相关信息，如宽度、高度、文件名称等
    data = await generatorFileInfo(type, files)
    // 获取文件的 MD5 值
    data = await generatorHash(data)
    return Promise.resolve(data)
  }
  async upload(data, getProgress) {
    let filesInfo = null
    const { bucket, region, requestAddress, dir, credentials } = await getConf()
    // 生成包含文件对象的COS配置
    const files = data.map(({file, data: { metamd5 }}) => ({ Bucket: bucket, Region: region, Key: `${dir}/${metamd5}`, Body: file }))
    // 上传文件到COS
    const result = await uploadFilesToCOS(files, credentials, progressInfo => {
      typeof getProgress === 'function' && getProgress(progressInfo)
    })
    // 上传成功后需要保存的文件相关信息
    if (result.finish) {
      this.revokeLocalURL(data)
      filesInfo = result.finish && data.map(({file, data: fileInfo}) => {
        return ({ url: `${requestAddress}/${dir}/${fileInfo.metamd5}`, ...fileInfo })
      })
    }
    return Promise.resolve(filesInfo)
  }
}

export default Uploader
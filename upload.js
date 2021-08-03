
import COS from 'cos-js-sdk-v5'

/**
 * 上传文件到COS
 * @param {Array} files 包含上传文件的配置
 * @param {Object} credentials 配置信息
 */
const uploadFilesToCOS = (files, credentials, callback) => {
  return new Promise((resolve, reject) => {
    const { tmpSecretId, tmpSecretKey, sessionToken } = credentials
    const cos = new COS({
      SecretId: tmpSecretId,
      SecretKey: tmpSecretKey,
      XCosSecurityToken: sessionToken,
      UploadCheckContentMd5: true
    })
    cos.uploadFiles({
      files, SliceSize: 1024 * 1024 * 20,  // 设置大于20MB采用分块上传
      AsyncLimit: 4, // 设置分块的并发量，仅在触发分块上传时有效
      StorageClass: 'STANDARD',
      onProgress({ percent, speed }) {
        const percentage = parseInt(percent * 100)
        callback({ percentage, uploadRate: ((speed / 1024 / 1024 * 100) / 100).toFixed(2) + ' Mb/s' })
        percentage === 100 && resolve({ finish: true })
      }
    })
  })
}

export default uploadFilesToCOS
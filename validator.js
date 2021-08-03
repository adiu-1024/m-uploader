
const blobToString = async blob => {
  const buffer = await blob.arrayBuffer()
  return [...new Uint8Array(buffer)].map(n => n.toString(16).toUpperCase().padStart(2, '0')).join(' ')
}

const fileType = Object.assign(Object.create({}), {
  'isMp4': async file => {
      const str = await blobToString(file.slice(0, 8))
      return str === '00 00 00 18 66 74 79 70' || str === '00 00 00 20 66 74 79 70'
  },
  'isMov': async file => {
      const str = await blobToString(file.slice(0, 8))
      return str === '00 00 00 14 66 74 79 70'
  },
  'isJpg': async file => {
      const [strBefore, strAfter] = await Promise.all([blobToString(file.slice(0, 2)), blobToString(file.slice(-2, file.size))])
      return strBefore === 'FF D8' && strAfter === 'FF D9'
  },
  'isPng': async file => {
      const str = await blobToString(file.slice(0, 8))
      return str === '89 50 4E 47 0D 0A 1A 0A'
  },
  'isGif': async file => {
      const [strBefore, strAfter] = await Promise.all([blobToString(file.slice(0, 7)), blobToString(file.slice(0, 6))])
      return strBefore === '47 49 46 38 39 61' || strAfter === '47 49 46 38 37 61'
  }
})

const validFileType = Object.assign(Object.create({}), {
  'video': async file => {
    return (await Promise.all([fileType['isMp4'](file), fileType['isMov'](file)])).some(boolean => boolean)
  },
  'image': async file => {
    return (await Promise.all(fileType['isJpg'](file), fileType['isPng'](file), fileType['isGif'](file))).some(boolean => boolean)
  }
})

/**
 * 文件规则校验
 * @param {String} type 文件类型
 * @param {Array} files 文件对象
 */
const validator = async (type, files) => {
  const result = (await Promise.all(files.map(file => validFileType[type](file)))).every(boolean => boolean)
  return { valid: result }
}

export default validator
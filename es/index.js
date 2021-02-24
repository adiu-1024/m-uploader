class Uploader {
  static DEFAULTS = {
    timeout: 0,
  }
  constructor(config) {
    const args = Array.from(arguments)
    if (typeof config === 'string') {
      config = args[1] || {}
      config.url = args[0]
    } else {
      config = config || {}
    }
    config.pickId = config.pickId.startsWith('#') ? config.pickId : `#${config.pickId}`
    this.events = {}
    this.$options = Object.assign({}, Uploader.DEFAULTS, config)
    this.init()
  }
  init() {
    const el = document.querySelector(this.$options.pickId)
    el.addEventListener('change', this.handleChange.bind(this))
  }
  handleChange(e) {
    const fileList = [...e.target.files]
    const formData = new FormData()
    for (const file of fileList) {
      formData.append('file', file)
    }
    e.target.value = ''
    this.handleUpload(formData)
  }
  handleUpload(formData) {
    this.$emit('loading', true)
    const {
      url, timeout, tokenName = 'TOKEN', getProgress = null
    } = this.$options
    const xhr = new XMLHttpRequest()
    xhr.timeout = timeout
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Authorization', localStorage.getItem(tokenName))
    xhr.send(formData)
    xhr.onload = async () => {
      const { status,  response } = xhr
      if (status == 200) {
        this.$emit('success', JSON.parse(response))
        this.$emit('loading', false)
      }
    }
    xhr.onerror = () => {
      this.$emit('error', xhr.statusText)
      this.$emit('loading', false)
    }
    if (typeof getProgress === 'function') {
      xhr.upload.onprogress = () => {
        if(event.lengthComputable) {
          getProgress(parseInt(event.loaded / event.total * 100))
        }
      }
    }
  }
  $on(key, fn) {
    (this.events[key] || (this.events[key] = [])).push(fn)
  }
  $emit(key, ...args) {
    const cbs = this.events[key]
    cbs && cbs.forEach(cb => cb.call(this, ...args))
  }
  $off(key) {
    delete this.events[key]
  }
}

export default Uploader

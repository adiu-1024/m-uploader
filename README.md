#### Installation and import
* Using npm
  ```cmd
  npm install m-uploader
  ```

* Using yarn
  ```cmd
  yarn add m-uploader
  ```

* ES6 import mode
  ```JS
  import upload from 'm-uploader'
  ```

#### Use examples
* Basic usage
  ```JS
  const uploader = upload({
    pickId: 'selector',  // id selector
    url: '/upload'
  })
  uploader.$on('loading', value => {
    console.log('Uploading', value)
  })
  uploader.$on('success', res => {
    console.log('Response results', res)
  })
  ```
* Get upload progress
  ```JS
  const uploader = upload({
    pickId: 'selector',
    url: '/upload',
    getProgress(percentage) {
      console.log(`Upload progress：${percentage}`)
    }
  })
  ```

#### 使用示例
* 基本用法
  ```JS
  const uploader = upload({
    pickId: 'selector',
    url: '/upload'
  })
  uploader.$on('loading', value => {
    console.log('Uploading', value)
  })
  uploader.$on('success', res => {
    console.log('Response results', res)
  })
  ```
* 获取进度
  ```JS
  const uploader = upload({
    pickId: 'selector',
    url: '/upload',
    getProgress(percentage) {
      console.log(`Upload progress：${percentage}`)
    }
  })
  ```

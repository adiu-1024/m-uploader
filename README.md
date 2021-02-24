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
  import Upload from 'm-uploader'
  ```

#### Use examples
* Basic usage
  ```JS
  const uploader = new Upload({
    pickId: 'selector',  // id selector
    tokenName: 'TOKEN',  // Token name of local storage
    url: '/api/upload'
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
  const uploader = new Upload({
    pickId: 'selector',
    tokenName: 'TOKEN',
    url: '/api/upload',
    getProgress(percentage) {
      console.log(`Upload progress：${percentage}`)
    }
  })
  ```

#### 使用示例
* 基本用法
  ```JS
  const uploader = new Upload({
    pickId: 'selector',
    tokenName: 'TOKEN',
    url: '/api/upload'
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
  const uploader = new Upload({
    pickId: 'selector',
    tokenName: 'TOKEN',
    url: '/api/upload',
    getProgress(percentage) {
      console.log(`Upload progress：${percentage}`)
    }
  })
  ```

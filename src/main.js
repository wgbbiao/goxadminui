import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import permission from '@/directive/permission/index.js'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import EleForm from 'vue-ele-form'
import EleFormQuillEditor from 'vue-ele-form-quill-editor'
import EleFormImageUploader from 'vue-ele-form-image-uploader'

Vue.use(EleForm, {
  'quill-editor': {
    // 比如设置上传 action 后, 所有的 quill-editor 编辑器上传图片都会采用这个属性
    action: 'https://xxx.com/upload/images'
  },
  // 对所有具有上传属性的组件适用
  upload: {
    fileSize: 10
  },
  // 可以在这里设置全局的 image-uploader 属性
  'image-uploader': {
    action: 'https://jsonplaceholder.typicode.com/posts' // 上传地址
  }
})
Vue.component('quill-editor', EleFormQuillEditor)
Vue.component('image-uploader', EleFormImageUploader)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale, size: 'small' })

Vue.config.productionTip = false
Vue.use(permission)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

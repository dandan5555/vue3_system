// 对element-plus插件局部注册进行一个封装
import type { App } from 'vue'
import 'element-plus/theme-chalk/index.css'

import {
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio
} from 'element-plus'

const components = [
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}

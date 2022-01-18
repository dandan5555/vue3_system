import type { App } from 'vue'
import registerElement from './register-element'

export function globalRegister(app: App): void {
  //注册element-plus插件
  // registerElement(app);
  app.use(registerElement)
}

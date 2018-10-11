import VueSubmit from '../component/VueSubmit'
import { defaultButtonType as setDefaultButtonType } from '../component/utils'

export default {
  install(Vue, { defaultButtonType = 'submit', componentName = 'vue-submit' } = {}) {
    setDefaultButtonType(defaultButtonType)
    Vue.component(componentName, VueSubmit)
  }
}

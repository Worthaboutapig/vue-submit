import VueSubmit from '../component/VueSubmit'
import { defaultButtonType as setDefaultButtonType } from '../component/utils'

export default {
  install(Vue, { defaultButtonType = 'submit', tagName = 'vue-submit' } = {}) {
    setDefaultButtonType(defaultButtonType)
    Vue.component(tagName, VueSubmit)
  }
}

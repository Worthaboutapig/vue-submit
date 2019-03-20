import VueSubmit from '../component/VueSubmit'
import setDefaultButtonType from '../component/defaultButtonType'

export default {
  install(Vue, { defaultButtonType = 'submit', tagName = 'vue-submit' } = {}) {
    setDefaultButtonType(defaultButtonType)
    Vue.component(tagName, VueSubmit)
  }
}

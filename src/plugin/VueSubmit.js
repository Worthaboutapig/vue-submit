import VueSubmit from '@/component/VueSubmit'

export default {
  install(Vue, { componentName = 'vue-submit' } = {}) {
    Vue.component(componentName, VueSubmit)
  }
}

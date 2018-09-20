<template lang='pug'>
  button(class='vue-submit' type='submit' :disabled='locked' @click='click')
    slot Submit
    template(v-if='started')
      span.vue-submit.spinner(v-if='showSpinner')
</template>

<script>
import './submit.css'
import './utils'

export default {
  name: 'vue-submit',
  props: {
    disabled: Boolean,
    hideSpinner: Boolean,
    started: Boolean
  },
  data() {
    return {}
  },
  computed: {
    locked() {
      return !this.enabled
    },
    enabled() {
      // Because Boolean props are 'false' by default :S
      return !this.disabled
    },
    showSpinner() {
      // Because Boolean props are 'false' by default :S
      return !this.hideSpinner
    }
  },
  watch: {
    started(newValue) {
      if (newValue) {
        this.start()
      } else {
        this.onStop()
      }
    }
  },
  methods: {
    click() {
      if (!this.started) {
        this.$emit('clicked')
        this.start()
      }
    },
    start() {
      if (this.started) {
        return
      }

      this.$emit('started')
    },
    onStop() {
      this.$emit('stopped')
    }
  }
}
</script>

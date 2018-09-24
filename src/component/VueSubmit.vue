<template lang='pug'>
  button(class='vue-submit' type='submit' :disabled='locked' @click='click')
    slot Submit

    template(v-if='started_')
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
    return {
      started_: false
    }
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
        this.onStart()
      } else {
        this.onStop()
      }
    }
  },
  methods: {
    click() {
      this.$emit('clicked')
      if (!this.started_) {
        this.onStart()
      }
    },
    onStart() {
      this.started_ = true
      this.$emit('started')
    },
    onStop() {
      this.started_ = false
      this.$emit('stopped')
    }
  }
}
</script>

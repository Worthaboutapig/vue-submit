<template lang='pug'>
  button(:id='id' class='vue-submit' :type='type' :disabled='locked' @click='click')
    slot Submit

    p isStarted: {{ isStarted }}
    template(v-if='isStarted_')
      span.vue-submit.spinner(v-if='showSpinner')
</template>

<script>
import './submit.css'
import { defaultButtonType } from './utils'

export default {
  name: 'vue-submit',
  props: {
    id: {
      type: String,
      required: true
    },
    disabled: Boolean,
    hideSpinner: Boolean,
    isStarted: Boolean,
    autoStart: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: function() {
        return defaultButtonType()
      }
    }
  },
  data() {
    return {
      isStarted_: this.isStarted
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
    isStarted(newValue) {
      //console.log('watch: ' + newValue)
      if (newValue) {
        if (!this.isStarted_) {
          this.start()
        }
      } else {
        if (this.isStarted_) {
          this.stop()
        }
      }
    }
  },
  methods: {
    click(event) {
      if (this.autoStart && !this.isStarted_) {
        this.start()
      }
      //console.log('click s: ' + this.isStarted + ', click s_: ' + this.isStarted_)
      this.$emit('click', event)
    },
    start() {
      this.isStarted_ = true
      //console.log('start: ' + this.id)
      this.$emit('start', { id: this.id })
    },
    stop() {
      this.isStarted_ = false
      //console.log('stop: ' + this.id)
      this.$emit('stop', { id: this.id })
    }
  }
}
</script>

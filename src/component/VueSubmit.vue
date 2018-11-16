<template lang='pug'>
  button(:id='id' class='vue-submit' :type='type' :disabled='locked' @click='click')
    slot Submit

    template(v-if='started_')
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
    started: Boolean,
    startOnClick: {
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
      started_: this.started
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
      //console.log('watch: ' + newValue)
      if (newValue) {
        if (!this.started_) {
          this.start()
        }
      } else {
        if (this.started_) {
          this.stop()
        }
      }
    }
  },
  methods: {
    click(event) {
      if (this.startOnClick && !this.started_) {
        this.start()
      }
      //console.log('click s: ' + this.started + ', click s_: ' + this.started_)
      this.$emit('click', event)
    },
    start() {
      this.started_ = true
      //console.log('start: ' + this.id)
      this.$emit('start', { id: this.id })
    },
    stop() {
      this.started_ = false
      //console.log('stop: ' + this.id)
      this.$emit('stop', { id: this.id })
    }
  }
}
</script>

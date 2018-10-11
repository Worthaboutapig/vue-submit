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
    type: {
      type: String,
      default: function() {
        return defaultButtonType()
      }
    }
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
    click(event) {
      this.$emit('click', event)
      if (!this.started_) {
        this.onStart()
      }
    },
    onStart() {
      this.started_ = true
      this.$emit('started', { id: this.id })
    },
    onStop() {
      this.started_ = false
      this.$emit('stopped', { id: this.id })
    }
  }
}
</script>

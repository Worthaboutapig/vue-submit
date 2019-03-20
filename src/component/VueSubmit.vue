<template lang='pug'>
button(:id='id' class='vue-submit' :type='type' :disabled='locked' @click='click')
  slot Submit
  span.spinner(v-if='this.running')
</template>

<script>
import './submit.css'
import getDefaultButtonType from './defaultButtonType'

export default {
  name: 'vue-submit',
  props: {
    id: { type: String, required: true },
    disabled: Boolean,
    running: Boolean,
    startOnClick: { type: Boolean, default: true },
    type: {
      type: String,
      default: () => getDefaultButtonType()
      }
    }
  },
  computed: {
    locked() {
      const locked = !!(this.running | !this.enabled)
      return locked
    },
    enabled() {
      // Because Boolean props are 'false' by default :S
      return !this.disabled
    }
  },
  watch: {
    running(newValue, oldValue) {
      //console.log('watch: ' + newValue)
      if (newValue && oldValue === false) {
        this.$emit('start', { id: this.id })
      } else if (!newValue && oldValue === true) {
        this.$emit('stop', { id: this.id })
      }
    }
  },
  methods: {
    click(event) {
      //console.log('click s: ' + this.running + ', click s_: ' + this.running_)
      this.$emit('click', event)
    }
  }
}
</script>

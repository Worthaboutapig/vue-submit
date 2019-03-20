<template lang="pug">
button.vue-submit(:id='id' :type='type' :disabled='locked' @click='click' :class='buttonClasses_')
  span.spinner(v-if='this.running && this.position === Positions.Before' :class='spinnerClasses')
  slot Submit
  span.spinner(v-if='this.running && this.position === Positions.After' :class='spinnerClasses')
</template>

<script>
import './submit.css'
import getDefaultButtonType from './defaultButtonType'
import Positions from './Positions'

export default {
  name: 'vue-submit',
  props: {
    id: {
      type: String,
      required: true
    },
    disabled: Boolean,
    running: Boolean,
    startOnClick: {
      type: Boolean,
      default: () => true
    },
    position: {
      type: String,
      default: () => Positions.Before,
      validator: value => value === Positions.Before || value === Positions.After
    },
    type: {
      type: String,
      default: () => getDefaultButtonType()
    },
    buttonClasses: {
      type: String,
      default: () => ''
    },
    spinnerClasses: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      Positions
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
    },
    buttonClasses_() {
      const classes = this.buttonClasses + (this.running ? 'running' : '')
      return classes
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

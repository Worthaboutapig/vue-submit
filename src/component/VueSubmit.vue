<template lang='pug'>
  button(class='vue-submit' type='submit' :disabled='locked' @click='click')
    slot Submit
    template(v-if='inProgress')
      span.spinner(v-if='showSpinner' :style='spinStyle')
      div.progress(v-if='showProgressBar' :style='barStyle')
</template>

<script>
import './submit.css'
import './utils'

export default {
  name: 'vue-submit',
  props: {
    disabled: Boolean,
    hideSpinner: Boolean,
    hideProgressBar: Boolean,
    started: Boolean,
    stepDelay: {
      type: Number,
      default: 3000
    },
    progress: Number,
    autoProgress: Number
  },
  data() {
    return {
      currentStep: 0,
      increment: 0
    }
  },
  computed: {
    inProgress() {
      const inProgress = this.currentStep > 0 && this.currentStep <= 100
      //console.log('VS: inProgress: ' + inProgress)
      return inProgress
    },
    locked() {
      return !this.enabled || this.inProgress
    },
    barStyle() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        transition: 'width 200ms linear',
        opacity: '0.4',
        width: this.currentStep + '%',
        height: '100%',
        zIndex: 3
      }
    },
    spinStyle() {
      return {
        position: 'relative',
        border: '3.5px solid rgba(255,255,255,0.5)',
        borderRightColor: '#fff',
        borderRadius: '50%',
        display: 'inline-block',
        width: '1.33em',
        height: '1.33em',
        zIndex: 2,
        marginLeft: '6px',
        verticalAlign: 'text-top',
        top: '-1px',
        animation: 'spin 0.75s linear',
        animationIterationCount: 'infinite'
        // background: 'url("loading.gif") center center no-repeat'
      }
    },
    enabled() {
      // Because Boolean props are 'false' by default :S
      return !this.disabled
    },
    showSpinner() {
      // Because Boolean props are 'false' by default :S
      return !this.hideSpinner
    },
    showProgressBar() {
      // Because Boolean props are 'false' by default :S
      return !this.hideProgressBar
    }
  },
  watch: {
    started(newValue) {
      //console.log('VS: started: ' + newValue)
      if (newValue) {
        this.start()
      } else {
        this.onStop()
      }
    },
    progress(v) {
      if (!this.enabled && v) return
      const prev = this.inProgress
      this.currentStep = v

      if (this.stepDelay > 0) {
        if (!prev && this.inProgress) {
          this.currentStep = 1
          this.increment = 0
          this.tick()
        } // start auto progress
        if (prev && !this.inProgress) {
          this.currentStep = 0
        } // stop
      }
    }
  },
  methods: {
    click() {
      if (!this.inProgress) {
        //console.log('VS: click: starting')
        this.start()
      }
    },
    start() {
      if (this.inProgress) {
        //console.log('VS: started: already in progress')
        return
      }

      this.$emit('started')
      //console.log('VS: started')
      this.currentStep = 1
      //this.tick()
    },
    onStop() {
      this.reset()
      this.$emit('stopped')
      //console.log('VS: stopped')
    },
    reset() {
      this.currentStep = 0
      //console.log('VS: reset')
    }
    // tick() {
    //   if (!this.enabled || !this.inProgress) {
    //     console.log('VS: tick early return')
    //     return
    //   }

    //   this.currentStep = this.easeOutQuad(100)
    //   //const log = Math.round(Math.log10(0.1 + this.increment / this.stepDelay) * 100)
    //   //if (log > 0) {
    //   console.log('log: ' + this.currentStep)
    //   this.currentStep = 1 // - 100
    //   //console.log('VS: tick: ' + this.currentStep)
    //   if (this.currentStep > 95) {
    //     this.currentStep = 95
    //   }
    //   //}

    //   this.increment += 200
    //   this.$emit('ticked')
    //   setTimeout(() => this.tick(), 200)
    // },
    // easeOutQuad(t) {
    //   return t * (2 - t)
    // }
  }
}
</script>

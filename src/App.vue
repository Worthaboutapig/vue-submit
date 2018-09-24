<template lang='pug'>
#app.container
  h1 Click the buttons:

  .row.mt-4
    .col
      h2 A disabled button

    .col
      form(method='GET')
        .form-row
          .col
            vue-submit.btn.btn-primary.btn-xs(disabled) You can't click on me!

  .row.mt-4
    .col
      h2 A button that will continue spinning forever

    .col
      form(method='GET' @submit.prevent='onSubmitDummy')
        .form-row
          .col
            vue-submit.btn.btn-primary.btn-xs I'll continue forever
            
  .row.mt-4
    .col
      h2 I'll continue until you click my sibling button

    .col
      form(method='GET' @submit.prevent='onSubmitDummy')
        .form-row
          .col
            vue-submit.btn.btn-primary.btn-xs(:started='siblingStarted' @started='siblingStarted=true') {{ siblingStopPrimaryText }}
            button(:class='siblingClasses' type='button' :disabled='!siblingStarted' @click='onSiblingStop') {{ siblingStopSecondaryText }}
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'app',
  data() {
    return {
      siblingStarted: false,
      siblingStopPrimaryText: 'Click to confide in me',
      siblingStopSecondaryText: 'Waiting for my sibling to start spinning',
      siblingStop: false
    }
  },
  computed: {
    siblingClasses() {
      return {
        btn: true,
        'btn-primary': true,
        'btn-xs': true,
        'ml-2': true,
        disabled: !this.siblingStarted
      }
    }
  },
  watch: {
    siblingStarted(newSiblingStarted) {
      if (newSiblingStarted) {
        this.siblingStopPrimaryText = "I'm spinning around, get out of my way!"
        this.siblingStopSecondaryText = 'Click me to stop my sibling'
      } else {
        this.siblingStopPrimaryText = 'Click to confide in me'
        this.siblingStopSecondaryText = 'Waiting for my sibling to start spinning'
      }
    }
  },
  methods: {
    onSubmitDummy() {
      // a dummy function to allow the 'prevent' to work and prevent actual form submission
    },
    onSiblingStop() {
      this.siblingStarted = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

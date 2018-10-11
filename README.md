# vue-submit [![npm package](https://img.shields.io/npm/v/vue-submit.svg)](https://www.npmjs.com/package/vue-submit)

A pure Vue component submit button with a Ladda-style spinner.

Based on [NxtChg/pieces vue-submit](https://github.com/NxtChg/pieces/tree/master/js/vue/vue-submit) but with a different approach, using vue-cli 3 and published as a component, plugin and vue cli 3 plugin.

## Installation

Using npm:

```shell
$ npm install vue-submit
```

## Usage

Using Vue (with Webpack) in your `src/main.js` or other webpack entry file:

```js
// Load the Vue plugin globally to compile via Babel in Webpack (using vue-cli-3).
import Vue from 'vue'
import { Plugin } from 'vue-submit'

// To use the default options: { defaultButtonType = 'submit', tagName = 'vue-submit' }
Vue.use(Plugin)

// Or choose a different tag name for the component
Vue.use(Plugin, { tagName: 'an-alternative-vue-submit-tag-name' })

// Or choose the default button type for the button created. By default this is 'submit',
//  but you may want 'button' to use the spin functionality without submitting a form
Vue.use(Plugin, { defaultButtonType: 'button' })
```

And in your SFC (with the plugin activated):

```html
<template>
    <vue-submit :disabled='disabled'>A disabled button</vue-submit>
    <vue-submit type='button' :disabled='disabled'>A disabled button that behaves like a normal button instead of a submit button</vue-submit>

    <form method='GET' @submit.prevent='onSubmitDummy'>
        <vue-submit :started='siblingStarted' @started='siblingStarted=true'> {{ siblingStopPrimaryText }}</vue-submit>
        <button type='button' :disabled='!siblingStarted' @click='onSiblingStop'> {{ siblingStopSecondaryText }}</button>
    <form>
</template>

<script>
export default {
    data() {
        return {
            disabled: true,
            siblingStarted: false,
            siblingStopPrimaryText: 'Click to confide in me',
            siblingStopSecondaryText: 'Waiting for my sibling to start spinning'
        }
    }.
    watch: {
        siblingStarted(started) {
        if (started) {
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
            // a dummy function to prevent actual form submission
        },
        onSiblingStop() {
            this.siblingStarted = false
        }
    }
}
</script>
```

Or to use in your SFC as above, but with the component and not the plugin:

```html
<template>
 ...
</template>

<script>
import VueSubmit from 'vue-submit'

export default {
    ...,
    components: {
        'vue-submit': VueSubmit
    }
}
</script>
```

To use the ES6 module outside of vue-cli-3, but within webpack (with Babel), try the [webpack-babel-env-deps Babel plugin](https://github.com/andersdjohnson/webpack-babel-env-deps) to ensure the `imports` are imported as-is.

If (for some reason) you don't want to use the raw ES Vue component, there is also:

```js
// The common-js version
<script src="https://unpkg.com/vue-submit/dist/vue-submit.common.js"></script>

// The UMD version
<script src="https://unpkg.com/vue-submit/dist/vue-submit.umd.min.js"></script>
```

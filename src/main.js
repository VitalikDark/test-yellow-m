import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VTimePicker } from 'vuetify/labs/VTimePicker'

const vuetify = createVuetify({
  components: {
    ...components,
    VTimePicker
  },
  directives
})

createApp(App)
.use(store)
.use(router)
.use(vuetify)
.mount('#app')

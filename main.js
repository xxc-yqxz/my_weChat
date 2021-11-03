import App from './App'

import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
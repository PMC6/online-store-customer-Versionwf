// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.withCredentials=true
axios.defaults.baseURL='http://39.98.165.19:8080/'
// 176.122.152.6:8080    http://39.98.165.19:8080
Vue.prototype.axios=axios;


Vue.config.productionTip = false

Vue.use(VueAxios,axios);
Vue.use(iView,{
  size:'large'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

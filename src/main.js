import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(BootstrapVue);
Vue.use(VueGeolocation);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';

import routes from './router.js';

import general from './assets/style/general.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee,faWind,faTemperatureLow ,faTemperatureHigh,faCloud,faTimes,faTint} from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.use(VueRouter);
Vue.use(general);

library.add(faUserSecret,faCoffee,faWind,faTemperatureLow,faTemperatureHigh,faCloud,faTimes,faTint)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const router=new VueRouter({
  routes,
  
});

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('upperCase' , function(value) {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

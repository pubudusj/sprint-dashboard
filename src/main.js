/*!

=========================================================
* Vue Argon Dashboard - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import { store } from './store/store'

Vue.config.productionTip = false
Amplify.configure(awsconfig)

Vue.use(ArgonDashboard)
new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')

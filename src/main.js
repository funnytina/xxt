// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '../static/css/common.css'; //引入全局css
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
//import api from '@/assets/js/api.js';
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);

Vue.use(Mint);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})











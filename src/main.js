// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import axios from 'axios';
import iView from 'iview';

import 'iview/dist/styles/iview.css';    // 使用 CSS
import '../static/css/common.css'; //引入全局css
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(Mint);
Vue.use(iView);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})










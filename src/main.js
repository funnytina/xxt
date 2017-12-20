// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '../static/css/common.css'; //引入全局css
import 'mint-ui/lib/style.css';
import Mint from 'mint-ui';
import VueJsonp from 'vue-jsonp';
import AMap from 'vue-amap';

Vue.use(VueJsonp);
Vue.use(Mint);
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'b71258e6348a78d285e5645dda910d5a',
  plugin: ['AMap.Geocoder', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})











import Vue from 'vue';
import Router from 'vue-router';
//import notFound from '@/components/pages/home/notFound';
import login from '@/components/doooly/login';
import resetPassword from '@/components/doooly/resetPassword';
import home from '@/components/doooly/home';
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/home/:token',
      name: 'home',
      component: home
    }
    // {
    //   path: '*',
    //   name: 'notFound',
    //   component: notFound
    // }
  ]
})

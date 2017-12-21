import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/doooly/login';
import resetPassword from '@/components/doooly/resetPassword';
import home from '@/components/doooly/home';
import businessInfo from '@/components/doooly/businessInfo';
import hotActivity from '@/components/doooly/hotActivity';
import scanDiscounts from '@/components/doooly/scanDiscounts';
import discountTicket from '@/components/doooly/discountTicket';
import telCharge from '@/components/doooly/telCharge';
import cardBuy from '@/components/doooly/cardBuy';
import familyInvite from '@/components/doooly/familyInvite';

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
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/home/hotActivity',
      name: 'hotActivity',
      component: hotActivity
    },
    {
      path: '/scanDiscounts',
      name: 'scanDiscounts',
      component: scanDiscounts
    },
    {
      path: '/discountTicket',
      name: 'discountTicket',
      component: discountTicket
    },
    {
      path: '/telCharge',
      name: 'telCharge',
      component: telCharge
    },
    {
      path: '/cardBuy',
      name: 'cardBuy',
      component: cardBuy
    },
    {
      path: '/familyInvite',
      name: 'familyInvite',
      component: familyInvite
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/businessInfo/:dealType1/:id1/:token',
      name: 'businessinfo',
      component: businessInfo
    },
    // {
    //   path: '*',
    //   name: 'notFound',
    //   component: notFound
    // }
  ]
})

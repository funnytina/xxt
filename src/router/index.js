import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/doooly/login';
import nav from '@/components/common/nav';
import resetPassword from '@/components/doooly/resetPassword';
import home from '@/components/doooly/home';
import businessInfo from '@/components/doooly/businessInfo';
import hotActivity from '@/components/doooly/hotActivity';
import scanDiscounts from '@/components/doooly/scanDiscounts';
import coupon from '@/components/doooly/coupon';
import telCharge from '@/components/doooly/telCharge';
import cardBuy from '@/components/doooly/cardBuy';
import familyInvite from '@/components/doooly/familyInvite';
import scanDetail from '@/components/doooly/scanDetail';
import hotMerchat from '@/components/doooly/hotMerchat';
import userInfo from '@/components/doooly/userInfo';
import testScroll from '@/components/doooly/testScroll';
import cardBuyDetail from '@/components/doooly/cardBuyDetail';
import cardBuyOrder from '@/components/doooly/cardBuyOrder';

import cardBuyPay from '@/components/doooly/cardBuyPay';
import cardBuyPayResult from '@/components/doooly/cardBuyPayResult';
Vue.use(Router);
export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon
    },
    {
      path: '/cardBuyPay/:orderNum',
      name: 'cardBuyPay',
      component: cardBuyPay
    },
    {
      path: '/cardBuyPayResult',
      name: 'cardBuyPayResult',
      component: cardBuyPayResult
    },
    {
      path: '/businessInfo/:dealType1/:id1/:token',
      name: 'businessinfo',
      component: businessInfo
    },
    {
      path: '/nav',
      name: 'nav',
      component: nav,
      children: [

        {
          path: 'home/:token',
          name: 'home',
          component: home
        },
        // {
        //   path: 'hotActivity',
        //   name: 'hotActivity',
        //   component: hotActivity
        // },
        {
          path: 'scanDiscounts',
          name: 'scanDiscounts',
          component: scanDiscounts


        },







        {
          path: 'hotMerchat',
          name: 'hotMerchat',
          component: hotMerchat
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          component: userInfo
        },
        {
          path: '/testScroll',
          name: 'testScroll',
          component: testScroll
        }
      ]
    },
    {
      path: '/cardBuy',
      name: 'cardBuy',
      component: cardBuy
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/telCharge',
      name: 'telCharge',
      component: telCharge
    },
    {
      path: '/familyInvite',
      name: 'familyInvite',
      component: familyInvite
    },
    {
      path: '/scanDetail',
      name: 'scanDetail',
      component: scanDetail
    },
    {
      path: '/hotActivity',
      name: 'hotActivity',
      component: hotActivity
    },
    {
      path: '/cardBuyDetail/:productId',
      name: 'cardBuyDetail',
      component: cardBuyDetail
    },
    {
      path: '/cardBuyOrder',
      name: 'cardBuyOrder',
      component: cardBuyOrder
    },
    // {
    //   path: '*',
    //   name: 'notFound',
    //   component: notFound
    // }
  ]
})

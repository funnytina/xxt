<template>
  <div class="include_footer">
    <ul>
      <!--<li v-for="(item,index) in footerTobarData" :key="index" @click="toLink(item.tobarLink)">-->
      <li v-for="(item,index) in footerTobarData" :key="index" @click="toLink(item.tobarLink)">
        <span :class="item.tobarIcon"></span><br>{{item.tobarContent}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "dyfooter",
    data() {

      return {
        footerTobarData: [
          {
            tobarLink: '/wechat/home/index.jhtml',
            tobarIcon: 'icon-index',
            tobarContent: '首页'
          },
          {
            tobarLink: '/wechat/hotBusiness/hotMerchat.jhtml',
            tobarIcon: 'icon-company',
            tobarContent: '热门商户'
          },
          {
            tobarLink: '/wechat/member/scan/list.jhtml',
            tobarIcon: 'icon-scan',
            tobarContent: '扫码优惠'
          },
          {
            tobarLink: '/wechat/myaccount/getUserInfo.jhtml',
            tobarIcon: 'icon-center',
            tobarContent: '个人中心'
          }
        ]
      }
    },
    methods: {
      toLink(tobarLink) {
        this.$router.push({
          path: tobarLink
        })
      }
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'icomoon';
    src:  url('/static/fonts/icomoon.eot?l4zkg0');
    src:  url('/static/fonts/icomoon.eot?l4zkg0#iefix') format('embedded-opentype'),
    url('/static/fonts/icomoon.ttf?l4zkg0') format('truetype'),
    url('/static/fonts/icomoon.woff?l4zkg0') format('woff'),
    url('/static/fonts/icomoon.svg?l4zkg0#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-center:before {
    content: "\e900";
  }
  .icon-company:before {
    content: "\e901";
  }
  .icon-index:before {
    content: "\e902";
  }
  .icon-scan:before {
    content: "\e903";
  }



  .include_footer_bg{

    height: 1rem;
    width: 100%;
  }
  .include_footer{

    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 1rem;
    background: #fff;
    border-top: 1px solid #dadadb;
  }
  .include_footer ul{
    font-size: 0;
    text-align: center;
  }
  .include_footer ul li{
    display: inline-block;
    font-size: 0.24rem;
    line-height: 0.3rem;
    color: #7d7d7d;
    width: 1.8rem;
    text-align: center;
    padding-top: 0.18rem;
  }
  /*.include_footer ul li.check{*/
    /*color: #ee3f44;*/
  /*}*/

  .include_footer ul li:active{
    color: #ee3f44;
  }
  .include_footer ul li span{
    font-size:0.42rem;
    display: inline-block;
    margin-bottom: 0.05rem;
  }
</style>

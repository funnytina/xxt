<template>
  <div class="include_footer">
    <ul>
      <li class="liCommon" v-for="(item,index) in footerTobarData" :key="index" :class="{liActive:isActive==index}" @click="toLink(item.tobarLink,index)" >
        <span :class="item.tobarIcon"></span><br>{{item.tobarContent}}
      </li>
    </ul>
  </div>
</template>

<script>
  import dyfooter from '@/components/common/dyfooter';
  export default {
    name: "dyfooter",

    data() {
      return {
        footerTobarData: [
          {
            tobarLink: '/home/'+localStorage.token,
            tobarIcon: 'icon-index',
            tobarContent: '首页'
          },
          {
            tobarLink: '/hotMerchat',
            tobarIcon: 'icon-company',
            tobarContent: '热门商户'
          },
          {
            tobarLink: '/scanDiscounts',
            tobarIcon: 'icon-scan',
            tobarContent: '扫码优惠'
          },
          {
            tobarLink: '/userInfo',
            tobarIcon: 'icon-center',
            tobarContent: '个人中心'
          }
        ],
        isActive:0,
      }
    },
    methods: {
      toLink(tobarLink,tobarContent) {

        if(tobarContent==3)
        {
          window.location.href='http://test1.doooly.com/wechat/myaccount/getUserInfo.jhtml?token='+localStorage.token
        }
        else if(tobarContent==2){
          window.location.href='http://test1.doooly.com/wechat/member/scan/list.jhtml?token='+localStorage.token
        }
        else{
        this.isActive=tobarContent;
         this.$router.push({
          path: '/nav'+tobarLink
        });
        }
       // this.isActive=tobarContent;
      console.log(tobarLink,tobarContent);
       console.log(this.isActive==tobarContent);
      }
    },
    create(){
      console.log(222);
      console.log(index);
    }
  }
</script>

<style scoped>

  /*@font-face {*/
    /*font-family: 'icomoon';*/
    /*src: url('../../static/fonts/icomoon.eot?l4zkg0');*/
    /*src: url('../../static/fonts/icomoon.eot?l4zkg0#iefix') format('embedded-opentype'),*/
    /*url('../../static/fonts/icomoon.ttf?l4zkg0') format('truetype'),*/
    /*url('../../static/fonts/icomoon.woff?l4zkg0') format('woff'),*/
    /*url('../../static/fonts/icomoon.svg?l4zkg0#icomoon') format('svg');*/
    /*font-weight: normal;*/
    /*font-style: normal;*/


  @font-face {
    font-family: 'icomoon';
    src: url('../../assets/fonts/icomoon.eot?l4zkg0');
    src: url('../../assets/fonts/icomoon.eot?l4zkg0#iefix') format('embedded-opentype'),
    url('../../assets/fonts/icomoon.ttf?l4zkg0') format('truetype'),
    url('../../assets/fonts/icomoon.woff?l4zkg0') format('woff'),
    url('../../assets/fonts/icomoon.svg?l4zkg0#icomoon') format('svg');
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

  .include_footer_bg {

    height: 1rem;
    width: 100%;
  }

  .include_footer {

    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 1rem;
    background: #fff;
    border-top: 1px solid #dadadb;
  }

  .include_footer ul {
    font-size: 0;
    text-align: center;
  }

  /*.include_footer ul li {*/
    /*display: inline-block;*/
    /*font-size: 0.24rem;*/
    /*line-height: 0.3rem;*/
    /*color: #7d7d7d;*/
    /*width: 1.8rem;*/
    /*text-align: center;*/
    /*padding-top: 0.18rem;*/
  /*}*/

  .liCommon {
    display: inline-block;
    font-size: 0.24rem;
    line-height: 0.3rem;
    color: #7d7d7d;
    width: 1.8rem;
    text-align: center;
    padding-top: 0.18rem;
  }

.liActive {
    color: #ee3f44;
  }

  .include_footer ul li span {
    font-size: 0.42rem;
    display: inline-block;
    margin-bottom: 0.05rem;
  }
</style>

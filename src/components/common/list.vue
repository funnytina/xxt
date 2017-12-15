<template>
  <div class="list">
    <div class="title">
      <div class="line"></div>
      <span>热门商户</span>
    </div>
    <ul class="mobile_ul">

      <li v-for="(item,index) in listData" :key="index">
        <img :src="item.listImgSrc">
        <div class="left">
          <span class="company">{{item.listCompany}}</span><br>
          <span class="describe">{{item.listDescribe}}</span><br>
          <span class="discount">最高<b>{{item.listDiscount}}折</b></span>
  </div>
  <div class="fr">查看详情</div>
  </li>

</ul>
</div>
</template>

<script>
  import http from '@/http/http.js'
  import api from '@/assets/js/api.js';


  export default {
        name: "list",
        data(){
          return {
            listData:[
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/weipinhui.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/darunfa.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/darunfa.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/weipinhui.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/weipinhui.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              }
            ],
            config:{accessToken:"4_-OQgysrgioQuS5immkhXArOkPTOGvjEnqsUQ7783u1kcQJxgMGpW2b74PbeCYkBkfUCUsGuX6Xv1Jwq4s96DrA8D8bbf4EV2uXBXnMhXXllAH-eaEKy1jrP1qRak1-zxL192U-Iz_6mKC8H6REFiAJAJWX",
              appid:"wx2d328083c1b00c6a",
              code:"1000",
              jsapi_ticket:"kgt8ON7yVITDhtdwci0qeeaC1rjN2ke87qwrugRiXiivRBnpiuQ3AMr13ZaQPwYpLB1NIzq7uWS34U4ccKqYLQ",
              nonceStr:"aa5d537709d3484c86da520a304dea2f",
              signature:"24A4975E4F694D231BD8A7524F69134A8E7A95BA",
              timestamp:"1513242500",
              url:"http://test1.doooly.com/wechat/home/index.jhtml?token=undefined"}

          }
        },
    methods:{
      //成功回调函数
//xxt 微信接口 打开微信接口
 shareWithFriendsWX(config){
    wx.config({
      debug: false, // 是否开启调试模式
      appId: config.appid, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature,// 必填，签名，见附录1
      jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表
    });
    wx.ready(function(){

      //xxt 获取地理位置
      wx.getLocation({
        type: 'gcj02',
        success: function (data) {
          address_func(data);
        }
      })


    });
   console.log(2222222123321);
  },



    },
    created(){


//调用微信接口获取用户数据
      this.$jsonp("http://test1.doooly.com/shop/activity/jsonp/wechatConfig.jhtml",
        {//请求参数
          // params: {
          //   url:"http://test1.doooly.com/reachtest/doooly/wechat/home/index.jhtml"
          // },
          jsonp:'callback',
         // jsonpCallback:"success_jsonpCallback",
          callback:"success_jsonpCallback",
        }).then((res)=>{
        console.log(res);
        console.log(123321);
        if(res.code == 1000){
          //var config = JSON.parse(result);
          this.shareWithFriendsWX(res);

        }
 });

    },
      mounted(){

          console.log('xxtxxt121');
        http({
          method: 'get',
          url: '/reachtest/doooly/hotBusiness/hotDatas.jhtml?address="上海"&value=-1',
          data: {
           // url: location.href.split('#')[0]
           // url:"http://test1.doooly.com/doooly/wechat/home/index.jhtml"
            company:"",
            pageNumber:1,
            pageSize:10
          }
        }).then((res)=>{
          console.log(res.data);
          console.log('098');
        }).catch((error)=>{
          console.log(error);
        })

      }
    }
</script>

<style scoped>

  /*商户列表*/
  .list{
    background: #fff;
  }
  .list .title{
    height: 0.98rem;
    position: relative;
    border-bottom: 1px solid #ececec;
  }
  .list .title .line{
    position: absolute;
    left: 50%;
    top:0.48rem;
    width: 2.68rem;
    margin-left: -1.34rem;
    height: 1px;
    background:#333;
    z-index: 1;
  }
  .list .title span{
    position: absolute;
    font-size: 0.32rem;
    color: #333;
    line-height: 0.98rem;
    width: 1.48rem;
    background: #fff;
    left: 50%;
    margin-left: -0.77rem;
    z-index: 2;
    text-align: center;
  }
  .list ul{
    font-size: 0;
  }
  .list ul li{
    margin:0 0.3rem;
    height: 1.8rem;
    border-bottom: 1px solid #ececec;
    position: relative;
  }
  .list ul li img{
    margin-top: 0.3rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius:100%;



  }
  .list ul li .left{
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 0.3rem;
    margin-left: 1.5rem;

  }
  .list ul li .left span{
    display: inline-block;
    overflow: hidden;
    max-width: 3.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list ul li .left .company{
    font-size: 0.32rem;
    line-height: 0.45rem;
    height: 0.45rem;
    color: #333;
  }
  .list ul li .left .describe{
    font-size: 0.24rem;
    line-height: 0.3rem;
    height: 0.3rem;
    margin-bottom:0.15rem;
    color: #999;

    /*margin-left: 1.2rem;*/

  }
  .list ul li .left .discount{
    font-size: 0.24rem;
    line-height: 0.3rem;
    height: 0.3rem;
    color: #666;

    margin-left: 0.1rem;



  }
  .list ul li .left .discount b{
    color: #ee3f44;
    font-weight: normal;
  }
  .list ul li .fr{
    margin-top: 0.62rem;
    width: 1.36rem;
    line-height: 0.56rem;
    background: #fff;
    color: #ee3f44;
    border:1px solid #ee3f44;
    text-align: center;
    font-size: 0.24rem;
    border-radius: 0.1rem;
  }


  .company_logo{
    width: 0.83rem;
    height: 0.95rem;
    position: absolute;
    top: 0;
    right: 0.34rem;
    background-size: 100%;
    font-size: 0;
  }
  .company_logo img{
    width: 0.5rem!important;
    height: auto!important;
    position: absolute;
    left: 50%;
    top: 50%;
  }
</style>

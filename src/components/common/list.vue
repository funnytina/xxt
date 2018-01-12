<template>
  <div class="list">
    <!--<div class="title">-->
      <!--&lt;!&ndash;<div class="line"></div>&ndash;&gt;-->
      <!--<span>热门商户</span>-->
    <!--</div>-->

    <slot name="title"></slot>

    <!--ul里面几个scoller就是无限滚动的几个api-->
    <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="90" infinite-scroll-immediate-check="false">
      <div v-if="loadGifState" class="mint-loadmore-bottom"><img class="mint-loadmore-bottom-img" src="../../assets/images/loading.gif"></div>
      <!--li数据遍历循环部分-->
      <!--<li class="mui-table-view-cell" v-for="(item,index) in listData" :key="index" @click="businessDetail(2,item.id)">-->
      <li class="mui-table-view-cell" v-for="(item,index) in listData" :key="index" @click="businessDetail(item.dealType,item.id)">
        <img :src="item.logo">
        <div class="left">
          <span class="company">{{item.company}}</span><br>
          <span class="describe">{{item.remarks}}</span><br>
          <span class="discount"><i v-if="item.discount>0">最高<b>{{item.discount}}折</b></i><i
            v-if="item.discount>0&&item.maxUserRebate>0">，</i><i v-if="item.maxUserRebate>0">最高返<b>{{item.maxUserRebate}}</b>积分</i></span>
        </div>
        <div class="fr">查看详情</div>
      </li>


<div  v-show="!queryLoading">

  <div class="loadContainer" v-if="allLoaded">
          <div class="loadText"></div>
          已经全部加载完毕
          <div class="loadLine"></div>
  </div>

        <div v-show="moreLoading2&&!allLoaded" class="mint-loadmore-bottom"><img class="mint-loadmore-bottom-img" src="../../assets/images/loading.gif"></div>

      </div>
    </ul>
  </div>
</template>

<script>
  import http from '@/http/http.js'
  import api from '@/assets/js/api.js';
  import {Loadmore} from 'mint-ui';
  import Cookies from 'js-cookie';
  export default {
    name: "list",
    data() {
      return {
        //bottomDistanceValue: 90,
        listData: [
          // {
          //   logo:"http://test1.doooly.com:8001/image/201512/00d7eba2-8d1a-440d-af20-35a80e557898.png",
          //   company:'唯品会',
          //   remarks:'全球精选，正品特卖',
          //   discount:'9.5'
          // }
        ],
        searchCondition: {  //分页属性
          pageNo: "1",
          pageSize: "10"
        },
      //  allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
       // scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动

       // loadContainerState: false,
        loadGifState:true,
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        moreLoading2:false,

      }
    },
    props: ['label'],
    // components: {
    //   'v-loadmore': Loadmore
    // },
    watch: {
      label(curVal,oldVal){
        console.log(curVal,oldVal);
        console.log(222);
        this.loadLabelDate();

      }
  },
    methods: {
      // url: api.hotDatas+'?address=\'上海\'&token='+this.$route.params.token+'&value=-1&company=""&pageNumber=1&pageSize=10',
      joinHotdatasUrl(address, token,value,pageNumber, pageSize) {
        return api.hotDatas + '?address=\'' + address + '\'&token=' + token + '&value='+value+'&company=""&pageNumber=' + pageNumber + '&pageSize=' + pageSize
      },

      loadMore() {

        this.more();

      },

      //加载更多数据
      more: function () {
        // 分页查询
        this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;
        this.moreLoading2=true;
        http({
          method: 'get',
          url: this.joinHotdatasUrl('上海', localStorage.token,this.label, this.searchCondition.pageNo, this.searchCondition.pageSize),
        }).then((res) => {

          this.listData = this.listData.concat([...res.data.data.hotMerchantList]);
          if (this.searchCondition.pageNo >= res.data.data.countPage) {
            //  this.allLoaded = true;
            // this.loadContainerState = true;
            this.moreLoading=true;
            this.allLoaded=true;
            this.moreLoading2=false;

          }
        });
      },
      //加载第一页数据
      loadPageList: function () {

        http({
          method: 'get',
          url: this.joinHotdatasUrl('上海', localStorage.token,this.label, this.searchCondition.pageNo, this.searchCondition.pageSize),
        }).then((res) => {
          this.loadGifState=false;
          this.listData = [...res.data.data.hotMerchantList];
          if (this.searchCondition.pageNo >= res.data.data.countPage) {
          //  this.allLoaded = true;
           // this.loadContainerState = true;
            this.moreLoading=true;
            this.allLoaded=true;
          }

        });
      },
      // 微信接口 打开微信接口
      shareWithFriendsWX(config) {
        wx.config({
          debug: false, // 是否开启调试模式
          appId: config.appid, // 必填，公众号的唯一标识
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          //获取地理位置
          wx.getLocation({
            type: 'gcj02',
            success: function (data) {
              this.address_func(data);
            }
          })
        });
        // console.log(2222222123321);
        // this.address_func();
      },
     //把经纬度转化成省后从后台获取数据
      address_func(data) {
        //  if(isWeiXin()){
        //if(browserName == "WeChat"){
        if (true) {
          //  lnglatXY = [data.longitude, data.latitude]; //已知点坐标
          let lnglatXY = [116.395645, 39.929986];
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              let address = result.regeocode.addressComponent.province;
              //缓存
              var date = new Date();
              date.setTime(date.getTime() + 1 * 60 * 1000);
              //  $.cookie('address', address, { expires: date});
              // mobile_link = $("#base").val()+'/doooly/hotBusiness/hotDatas.jhtml?address='+address+'&token='+token+'&value=-1';
              // ajax_to_load(mobile_link);
              console.log(address, token);
            }
          });
        } else {
          let address = data;
        }
      },
      loadLabelDate(){
        http({
          method: 'get',
          url: api.hotDatas + '?address=\'' + '上海' + '\'&token=' + localStorage.token + '&value='+this.label
        }).then((res) => {
          this.loadGifState=false;
          this.listData = [...res.data.data.hotMerchantList];
        //  if (this.searchCondition.pageNo >= res.data.data.countPage) {
            this.moreLoading=true;
            this.allLoaded=true;
            this.allLoaded=false;

       //   }

        });

      },



//商户详情跳转
      businessDetail(dealType, id) {
        //if(isWeiXin()){
        //if(browserName == "WeChat"){
        if (true) {
          this.$router.push(
            {
              name: 'businessinfo',
              params: {dealType1: dealType, id1: id, token: localStorage.token}
            }
          );
        } else {
          let jsonObj = {
            "jumpType": "InsideJump",
            //  "jumpUrl":$("#httpsBase").val()+'/wechat/hotBusiness/businessInfo.jhtml?dealType='+dealType+'&id='+id+'&userId='+userId+'&token='+token
            //   "jumpUrl":'/wechat/hotBusiness/businessInfo.jhtml?dealType='+dealType+'&id='+id+'&userId='+userId+'&token='+token
            "jumpUrl": '/wechat/hotBusiness/businessInfo.jhtml?dealType=' + dealType + '&id=' + id + '&userId=' + userId + '&token=' + localStorage.token
          };
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
            window.webkit.messageHandlers.gotoNativeJump.postMessage(JSON.stringify(jsonObj));
          } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
            RHNativeJS.gotoNativeJump(JSON.stringify(jsonObj));
          }
        }
      },

    },
    created() {
     //调用微信接口获取用户数据
      this.$jsonp("http://test1.doooly.com/shop/activity/jsonp/wechatConfig.jhtml",
        {//请求参数
          // params: {
          //   url:"http://test1.doooly.com/reachtest/doooly/wechat/home/index.jhtml"
          // },
          jsonp: 'callback',
          // jsonpCallback:"success_jsonpCallback",
          callback: "success_jsonpCallback",
        }).then((res) => {
        //  this.loadMore(res.data.hotMerchantList);
        if (res.code == 1000) {
          //var config = JSON.parse(result);
          this.shareWithFriendsWX(res);
        }
      });
    },
    mounted() {

      this.loadPageList();

    }
  }
</script>

<style scoped>

  /*商户列表*/
  .list {
    background: #fff;
  }

  .list .title {
    height: 0.98rem;
    position: relative;
    border-bottom: 1px solid #ececec;
  }

  .list .title .line {
    position: absolute;
    left: 50%;
    top: 0.48rem;
    width: 2.68rem;
    margin-left: -1.34rem;
    height: 1px;
    background: #333;
    z-index: 1;
  }

  .list .title span {
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

  .list ul {
    font-size: 0;
    /*height:auto;*/
    margin-bottom: 1rem;
  }

  .list ul li {
    margin: 0 0.3rem;
    height: 1.8rem;
    border-bottom: 1px solid #ececec;
    position: relative;
  }

  /*li{*/
    /*padding:30px 0;*/
    /*background-color: #ccc;*/
    /*margin-bottom:20px;*/
  /*}*/

  .list ul li img {
    margin-top: 0.3rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 100%;

  }

  .list ul li .left {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 0.3rem;
    margin-left: 1.5rem;

  }

  .list ul li .left span {
    display: inline-block;
    overflow: hidden;
    max-width: 3.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list ul li .left .company {
    font-size: 0.32rem;
    line-height: 0.45rem;
    height: 0.45rem;
    color: #333;
  }

  .list ul li .left .describe {
    font-size: 0.24rem;
    line-height: 0.3rem;
    height: 0.3rem;
    margin-bottom: 0.15rem;
    color: #999;

    /*margin-left: 1.2rem;*/

  }

  .list ul li .left .discount {
    font-size: 0.24rem;
    line-height: 0.3rem;
    height: 0.3rem;
    color: #666;

    margin-left: 0.1rem;

  }

  .discount i {
    font-style: normal
  }

  .list ul li .left .discount b {
    color: #ee3f44;
    font-weight: normal;
  }

  .list ul li .fr {
    margin-top: 0.62rem;
    width: 1.36rem;
    line-height: 0.56rem;
    background: #fff;
    color: #ee3f44;
    border: 1px solid #ee3f44;
    text-align: center;
    font-size: 0.24rem;
    border-radius: 0.1rem;
  }

  .company_logo {
    width: 0.83rem;
    height: 0.95rem;
    position: absolute;
    top: 0;
    right: 0.34rem;
    background-size: 100%;
    font-size: 0;
  }

  .company_logo img {
    width: 0.5rem !important;
    height: auto !important;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .main-body {
    /*height: 5rem;*/
    overflow: scroll;
    min-height: 10rem;
  }

  .loadContainer {
    width: 100%;
    font-size: 0.24rem;
    text-align: center;
    padding: 0.5rem 0;
    background: #f5f5f5;
    color: #999;
    position: relative;

  }

  .loadText {
    width: 2.1rem;
    height: 1px;
    background: #ececec;
    position: absolute;
    left: 0.3rem;
    top: 50%;
  }

  .loadLine {
    width: 2.1rem;
    height: 1px;
    background: #ececec;
    position: absolute;
    right: 0.3rem;
    top: 50%;
  }

  .mint-loadmore-bottom {
    width: 100%;
    font-size: 0.26rem;
    text-align: center;
    padding: 0.1rem 0;
  }

  .mint-loadmore-bottom-img {
    width: 1rem;
  }
</style>

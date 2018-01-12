<template>
  <div>
    <div class="detail">
      <div class="sub-tc" v-html="adBusiness.businessIntroduce">
        <!--{{adBusiness.businessIntroduce}}-->
      </div>

      <div class="line"></div>
















      <div v-if="adBusiness.dealType==0">
        <div v-if="channel==0">
          <footer v-if="productId>0">
            <div class="fl"  @click="business(adBusiness.url,adBusiness.company,adBusiness.logo,adBusiness.openOneNnumber)">立即前往</div>
            <div class="fr" @click="link()">立即订购</div>
          </footer>
          <div v-else>
            <footer v-if="adBusiness.wechatJumpStyle==0" @click="business(adBusiness.url,adBusiness.company,adBusiness.logo,adBusiness.openOneNnumber)">
              立即前往
            </footer>
            <footer v-if="adBusiness.wechatJumpStyle == 1" @click="link(adBusiness.appUrl,0)">
              下载APP
            </footer>
          </div>
        </div>
        <div v-if="channel == 1">
          <footer v-if="productId>0">
            <div class="fl"  @click="business(adBusiness.url,adBusiness.company,adBusiness.logo,adBusiness.openOneNnumber)">立即前往</div>
            <div class="fr" @click="link()">立即订购</div>
          </footer>
          <div v-else>
            <footer v-if="adBusiness.appJumpStyle==0" @click="business(adBusiness.url,adBusiness.company,adBusiness.logo,adBusiness.openOneNnumber)">
              立即前往
            </footer>
            <footer v-if="adBusiness.appJumpStyle==1" @click="link(adBusiness.appUrl,0)">
              下载APP
            </footer>
          </div>

        </div>
      </div>
      <div v-if="adBusiness.dealType == 1">
        <footer class="clearfix" v-if="productId>0">
          <div class="fl"  @click="businessDetail()">附近商家</div>
          <div class="fr" @click="link()">立即订购</div>
        </footer>
        <footer v-else @click="businessDetail()">
          附近商家
        </footer>
      </div>
    </div>
    <dialogBox v-on:chaildChangeState="chaildDialogState" :dialogState="dialogState" :detailUrl="dialogBoxData.detailUrl" :company="dialogBoxData.company" :logo="dialogBoxData.logo" :openOneNnumber="dialogBoxData.openOneNnumber" :activityType="dialogBoxData.activityType"></dialogBox>
  </div>
</template>
<script>
  import http from '@/http/http'
  import dialogBox from '@/components/common/dialogBox';
  import api from '@/assets/js/api.js';
  export default {
    name: "businessDetail",
    components:{
      dialogBox
    },
    data(){
      return{
        adBusiness:'',
        dealType:"",
        url:"../../../static/images/testP1.jpg",
        businessId:"",
        channel:"",
        productId:1,
        //token:localStorage.getItem("token"),
        dialogState:false,
        dialogBoxData:{
          detailUrl:'',
          company:'',
          logo:'',
          openOneNnumber:0,
        }
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init() {
        this.dealType=this.$route.params.dealType1;
        this.businessId=this.$route.params.id1;
        http({
          method: 'get',
          url: api.businessInfoForAjax+'?token='+localStorage.token+'&dealType='+this.dealType+'&id='+this.businessId,
        }).then((res) => {
            // for (let [index, elem] of res.data.data.ads.entries()) {
            //   console.log(index, elem.imagePath);
            //   this.itemList.push(elem.imagePath);
            // }
          console.log(13);
          console.log(res.data);
          this.adBusiness=res.data.data.adBusiness;

      })
      },
      business(url,company,logo,openOneNnumber){
        this.dialogState=!this.dialogState;
        this.dialogBoxData={
          detailUrl:'',
          company:'',
          logo:''
        };
        this.dialogBoxData.detailUrl=url;
        this.dialogBoxData.company=company;
        this.dialogBoxData.logo=logo;
        this.dialogBoxData.openOneNnumber=openOneNnumber;
      },
      applink:function () {
        alert(111);
      },
      chaildDialogState(data){
        this.dialogState=false;
      },
      link(link,type) {

        if(type==0){
          if(browserName=="WeChat"){
            window.location.href=link;
          }else{
            jsonObj={
              "jumpType":"InsideJump",
              "jumpUrl":link
            };
            if (browserName == "WebKit") {  //判断iPhone|iPad|iPod|iOS
              window.webkit.messageHandlers.gotoNativeJump.postMessage(JSON.stringify(jsonObj));
            } else if (browserName == "Chrome WebView") {   //判断Android
              RHNativeJS.gotoNativeJump(JSON.stringify(jsonObj));
            }else{
              window.location.href=link;
            }
          }
        }
        else{
          if(browserName=="WeChat"){
            window.location.href=$("#base").val()+link;
          }else{
            jsonObj={
              "jumpType":"InsideJump",
              "jumpUrl":$("#httpsBase").val()+link+'&token='+token
            };
            if (browserName == "WebKit") {  //判断iPhone|iPad|iPod|iOS
              window.webkit.messageHandlers.gotoNativeJump.postMessage(JSON.stringify(jsonObj));
            } else if (browserName == "Chrome WebView") {   //判断Android
              RHNativeJS.gotoNativeJump(JSON.stringify(jsonObj));
            }else{
            }
          }
        }
      },
      businessDetail:function () {
        let browserName = getBrowser();
        let jsonObj={
          "jumpType":"InsideJump",
          "jumpUrl":"MapView",
          "company":"",
          "id":this.businessId
        };
        if(browserName=="WeChat"){

        }
        else if (browserName == "WebKit") {

        }
        else if (browserName == "Chrome WebView") {

        }
        else {
          console.log(this.token);
        }
      },
      Wechatshare(prefix,params){
        var client = 'doooly';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          client = 'wechat';//是微信
        } else {
          client = 'doooly';//不是微信
        }
        //调用微信接口获取用户数据
        this.$jsonp("http://test1.doooly.com/share/commonShareJSONPConfig",
          {//请求参数
            params: {
              url:location.href.split('/#')[0]+location.href.split('/#')[1],
              'client':client, // wechat, doooly
              'prefix':prefix,  // 配置文件前缀(活动名称,后台配置)
              'params':params //文案里需要替换的参数, 只替换title imgUrl desc里的占位符
            },
            jsonp: 'callback',
            // jsonpCallback:"success_jsonpCallback",
            callback: "success_jsonpCallback",
          }).then((res) => {
          //  this.loadMore(res.data.hotMerchantList);
          if (res.code == 1000) {
            //var config = JSON.parse(result);
            //this.shareWithFriendsWX(res);
            shareWithFriendsWX(res);
          }
        });
      }
    }
  }
</script>

<style scoped>
  .line{margin-bottom:1rem;}
  .detail{position: relative;width: 100%}
  .sub-tc{width:100%;font-size:18px;position: relative;}
  .sub-tc img {width: 100%;}
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
    font-size: 0.34rem;
    background: #ee3f44;
    line-height: 1rem;
    color: #fff;

  }
  footer div{
    width:50%;
    font-size: 0.32rem;
    line-height: 1rem;
    text-align: center;
  }
  footer .fl{
    background: #fff;
    color: #333;
    border-top:1px solid #ececec;
  }
  footer .fr{
    background: #ee3f44;
    color: #fff;
  }
</style>

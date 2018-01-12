<template>
  <div>
    <!--<div class="result" id="result">-->
    <!--<div class="model_div">-->
    <!--<a href="javascript:" title="关闭"></a>-->
    <!--<div id="resultTxt">-->
    <!--&lt;!&ndash;	<h1>此手机号不是兜礼会员</h1>-->
    <!--<p>是否邀请成为会员</p>  &ndash;&gt;-->
    <!--</div>-->
    <!--<div class="button_div">-->
    <!--<button type="button" onclick="show()" class="btn btn-primary">立即邀请</button>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash; 弹出框  end &ndash;&gt;-->
    <!--&lt;!&ndash; 弹出框 提示信息  start &ndash;&gt;-->
    <!--<div class="result" id="result1">-->
    <!--<div class="model_div">-->
    <!--<a href="javascript:" id="resultBtn1" title="关闭"></a>-->
    <!--<div id="resultTxt1">-->
    <!--&lt;!&ndash;	<h1>此手机号不是兜礼会员</h1>-->
    <!--<p>是否邀请成为会员</p>  &ndash;&gt;-->
    <!--</div>-->
    <!--&lt;!&ndash; <div class="button_div">-->
    <!--<button type="button" class="btn btn-primary">立即邀请</button>-->
    <!--</div> &ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash; 弹出框  end &ndash;&gt;-->
    <!--&lt;!&ndash; 弹出框 二维码  start &ndash;&gt;-->
    <!--<div class="result">-->
    <!--<div class="model_div">-->
    <!--<a href="javascript:" id="resultBtn" title="关闭"></a>-->
    <!--<div style="padding: 0.2rem;"><img src="../../assets/images/familyinvite/wei.jpg" /></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash; 弹出框  end &ndash;&gt;-->


    <div class="app_con">
      <header>
        <div class="header_img">
          <div class="buis_logo">
            <img src="../../assets/images/familyinvite/invite_bg.png"/>
          </div>
        </div>
      </header>
      <section class="fill_info">
        <div class="input_div">
          <input v-model="mobileNum" type="tel" minlength="11" maxlength="11" class="input_text" placeholder="填写亲友手机号"/>
        </div>
        <div class="btn_div">
          <button @click="inviteFamily" class="btn btn-primary btn-block" id="add_btn">立即邀请</button>
        </div>
      </section>
      <section class="main_div">
        <div class="title">邀请流程</div>
        <div class="line"><img src="../../assets/images/familyinvite/line.png"></div>
        <div class="progress">
          <p>1. 每位兜礼会员只能邀请3位亲友</p>
          <p>2. 填写亲友手机号 , 邀请亲友成为兜礼会员</p>
          <p>3. 亲友使用手机号登录,即可成为兜礼会员 , 享受福利</p>
          <p>4. 如有疑问 , 请及时联系客服 : <span>400-158-2212</span></p>
        </div>
      </section>
      <section class="main_div">
        <div class="title">已邀请的亲友</div>
        <div class="line"><img src="../../assets/images/familyinvite/line.png"></div>
        <div class="div_ulfamily">
          <ul>
            <!--<#list inviteeList as recordList>-->
            <li v-for="(item,index) in familyInviteList" :key="index" class="clearfix">
              <div class="head">
                <img v-if="item.headImgurl" :src="item.headImgurl"/>
                <img v-if="item.headImgurl==undefined&&item.isActive == 2"
                     src="../../assets/images/familyinvite/favicon.png"/>
                <img src="../../assets/images/familyinvite/inviting.png" v-else/>
              </div>
              <div class="lottery_name">
                {{item.name?item.name:'***'}}
              </div>
              <div class="lottery_rule">
                {{item.isActive==2?'邀请成功':'邀请中'}}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <div v-if="shareBgState" @click="changeShareBgState" class="share_bg">
      <img src="../../assets/images/familyinvite/share.png">
    </div>
  </div>
</template>

<script>
  import http from '@/http/http.js';
  import api from '@/assets/js/api.js';
  import {shareWithFriendsWX} from '@/assets/js/wechatShare2.js';

  export default {
    name: "family-invite",
    data() {
      return {
        familyInviteList: [{
          headImgurl: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%A2%85%E8%8A%B1&step_word=&hs=2&pn=20&spn=0&di=120655045170&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2471212458%2C3319392789&os=2269776337%2C3864955501&simid=3360566371%2C443026478&adpicid=0&lpn=0&ln=1997&fr=&fmq=1515137667182_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fi3.qhimg.com%2Ft0150095e8c47a66357.png&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bnma15v_z%26e3Bv54AzdH3Fv5gpjgpAzdH3F8mAzdH3Fa98nAzdH3F80AzdH3Fb8bnm80_ccandc9cb_z%26e3Bfip4s&gsm=0&rpstart=0&rpnum=0',
          isActive: 2,
          name: '婷婷'
        },
          {
            isActive: 1
          },
          {

            isActive: 2,
            name: '婷婷2'
          },
        ],
        shareBgState: false,
        mobileNum: '',
      }
    },
    methods: {

      checkMobile() {
        let re = /^1[3|4|5|7|8][0-9]{9}$/;
        if (this.mobileNum == "") {
          this.$toast("手机号不能为空");
          return false;
        }
        else if (!re.test(this.mobileNum) || this.mobileNum.length != 11) {
          this.$toast("手机号格式错误！");
          return false;
        }
        else {
          return true;
        }
      },
      //监控事件
      index_click(val, index) {
        var sort = "首页中部";
        var operation = "邀请亲友";
        var label = "立即邀请";
        umengClick(sort, operation, label, '', '');
      },

      changeShareBgState(){
        this.shareBgState=false;
      },
  //     //判断是否在微信中打开
  // Wechatshare(prefix,params){
  //   var client = 'doooly';
  //   var ua = window.navigator.userAgent.toLowerCase();
  //   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  //     client = 'wechat';//是微信
  //   } else {
  //     client = 'doooly';//不是微信
  //   }
  //   this.$jsonp("http://test1.doooly.com/share/commonShareJSONPConfig",
  //     {//请求参数
  //       // params: {
  //       //   url:"http://test1.doooly.com/reachtest/doooly/wechat/home/index.jhtml"
  //       // },
  //       jsonp: 'callback',
  //       // jsonpCallback:"success_jsonpCallback",
  //       callback: "success_jsonpCallback",
  //     }).then((res) => {
  //     //  this.loadMore(res.data.hotMerchantList);
  //     if (res.code == 1000) {
  //       //var config = JSON.parse(result);
  //       this.shareWithFriendsWX(res);
  //     }
  //   });
  //   //(xxt) var config_url = window.location.protocol == "https:"  ?  $("#httpsIURL").val() : $("#httpIURL").val() ;
  //   $.ajax({
  //     type: 'get',
  //     url:  config_url + '/share/commonShareJSONPConfig',
  //     dataType: 'JSONP',
  //     async: false,
  //     traditional: true,
  //     data: {
  //       'url': location.href.split('#')[0],
  //       'client':client, // wechat, doooly
  //       'prefix':prefix,  // 配置文件前缀(活动名称,后台配置)
  //       'params':params //文案里需要替换的参数, 只替换title imgUrl desc里的占位符
  //     },
  //     jsonp:"callback",
  //     jsonpCallback:"jsonpCallback",
  //     success: function (result) {
  //       if(result.code == 4001){
  //         //40001微信配置
  //         shareWithFriendsWX(result.data);
  //       }else if(result.code == 4002){
  //         //40002兜里配置
  //         shareWithFriendsAPP(result);
  //       }else{
  //         //获取配置错误10001
  //         console.log("error");
  //       }
  //     },
  //     error: function (result) {
  //       alert("服务器异常,请稍候重试!");
  //     }
  //   });
  // },
      inviteFamily() {
        this.index_click();
        if (this.checkMobile() == false) {
          return false;
        }
        http({
          method: 'get',
          url: api.inviteFamily + '?telephone=' + this.mobileNum + '&token=' + localStorage.token
        }).then((res) => {
          console.log(res.data);
          if (res.data.code == '1000') {
            if (browserName == "WeChat") {
            // if (true) {
              this.shareBgState = true;
              let userId = JSON.parse(res.data.userId);
              this.Wechatshare('swing', [userId]);
              setTimeout(function () {
                this.shareBgState = false;
              }, 2000)
            } else {
              let userId = JSON.parse(res.data.userId);
              //console.log(res.data.userId);
              //console.log(res.data.userId);
              this.Wechatshare('swing', [userId]);
            }
          }
          else if (res.data.code == '1003') {
            this.$toast("该手机已是您的亲友，可直接登录!");
          } else if (res.data.code == '1002') {
            if (browserName == "WeChat") {
              this.shareBgState = true;
              let userId = JSON.parse(res.data.userId);
              this.Wechatshare('swing', [userId]);
              setTimeout(function () {
                this.shareBgState = false;
              }, 2000)
            } else {

              console.log(123);
              console.log(123);
              let userId = JSON.parse(res.data.userId);
              this.Wechatshare('swing', [userId]);
            }
          }
          else {
            this.$toast(res.data.msg);
          }
        })

      },
      Wechatshare(prefix,params){
        var client = 'doooly';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          client = 'wechat';//是微信
        } else {
          client = 'doooly';//不是微信
        }

        //var config_url = window.location.protocol == "https:"  ?  $("#httpsIURL").val() : $("#httpIURL").val() ;
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

        // $.ajax({
        //   type: 'get',
        //   url:  config_url + '/share/commonShareJSONPConfig',
        //   dataType: 'JSONP',
        //   async: false,
        //   traditional: true,
        //   data: {
        //     'url': location.href.split('#')[0],
        //     'client':client, // wechat, doooly
        //     'prefix':prefix,  // 配置文件前缀(活动名称,后台配置)
        //     'params':params //文案里需要替换的参数, 只替换title imgUrl desc里的占位符
        //   },
        //   jsonp:"callback",
        //   jsonpCallback:"jsonpCallback",
        //   success: function (result) {
        //     if(result.code == 4001){
        //       //40001微信配置
        //       shareWithFriendsWX(result.data);
        //     }else if(result.code == 4002){
        //       //40002兜里配置
        //       shareWithFriendsAPP(result);
        //     }else{
        //       //获取配置错误10001
        //       console.log("error");
        //     }
        //   },
        //   error: function (result) {
        //     alert("服务器异常,请稍候重试!");
        //   }
        // });
      }
    },
    created() {
      // document.title = '{groupName}专享-热门活动';
      // initTitle('{groupName}专享-热门活动');
      document.title = '邀请好友';
      initTitle('邀请好友');
      // console.log(location.href.split('/#')[0]+location.href.split('/#')[1]);
      // console.log(location.href.indexOf('#'));
      // console.log(333);
    }
  }
</script>

<style scoped>
  .share_bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.8);
    text-align: right;
  }

  .share_bg img {
    width: 6.07rem;
  }

  #alr_loading {
    display: none;
  }

  .div_ulfamily {
    margin-top: 0.41rem
  }

  .div_ulfamily ul li {
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.4rem 0.3rem;
    overflow: hidden;
  }

  .div_ulfamily ul li .head {
    width: 0.8rem;
    height: 0.8rem;
    float: left;
    display: inline-block;
  }

  .div_ulfamily ul li .head img {
    width: 0.79rem;
    height: 0.79rem;
    border-radius: 50%;
    display: block;
  }

  .div_ulfamily ul li .lottery_name {
    font-family: "Courier", "Courier New", "Andale Mono";
    margin-left: 0.3rem;
    float: left;
    font-size: 0.3rem;
    color: #999999;
    display: inline-block;
  }

  .div_ulfamily ul li .lottery_rule {
    text-align: right;
    float: right;
    font-size: 0.24rem;
    color: #ee3f44;
    display: inline-block;
  }

  /* 家属邀请 */

  .header_img {
    width: 100%;
    height: auto;
  }

  .buis_logo {
    overflow: hidden;
    position: relative;
    top: 0;
  }

  .buis_logo img {
    width: 100%
  }

  .fill_info {
    margin-top: 0.4rem
  }

  .input_div {
    margin: 0 auto;
    border: 1px solid #c9c9c9;
    border-radius: 0.1rem;
    height: 0.83rem;
    width: 6rem;
    padding-bottom: 0.02rem
  }

  .input_text {
    width: 6rem;
    height: 0.83rem;
    background: #fff;
    font-size: 0.3rem;
    display: block;
    outline: none;
    border-radius: 0.1rem;
    text-align: center;
  }

  .btn_div {
    width: 6rem;
    margin: 0 auto;
    margin-top: 0.22rem;
  }

  .btn {
    display: inline-block;
    height: 0.82rem;
    padding-top: 0.1rem;
    box-shadow: 0 7px 0 #d8262b;
    margin-bottom: 0;
    font-size: 0.3rem;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 0.01rem solid transparent;
    border-radius: 0.1rem;
  }

  .btn-primary {
    color: #fff;
    background-color: #ee3f44;
    border-color: #ee3f44;
  }

  .btn-block {
    display: block;
    width: 100%;
  }

  .div_describe {
    text-align: center;
    color: #333;
    margin-top: 0.16rem;
  }

  .div_describe .desc_name {
    font-size: 0.3rem;
    color: #383838;
  }

  .div_describe .desc_infor {
    color: #c9c9c9;
    margin-top: 0.2rem;
    font-size: 0.24rem;
  }

  .div_describe .desc_price {
    color: #c9c9c9;
    margin-top: 0.1rem;
    font-size: 0.24rem;
  }

  .main_div {
    width: 6.6rem;
    margin: 0 auto;
    margin-top: 0.4rem;
    border-radius: 0.2rem;
    background-color: #fff;
    padding-top: 0.4rem;
    padding-bottom: 0.38rem
  }

  .title {
    text-align: center;
    color: #333333;
    font-size: 0.3rem;
  }

  .line {
    width: 100%;
    text-align: center;
    margin-top: 0.21rem;
    font-size: 0
  }

  .line img {
    width: 0.83rem;
  }

  /*激活流程*/
  .progress {
    margin-top: 0.41rem;
    padding: 0 0.3rem;
  }

  .progress p {
    font-size: 0.24rem;
    color: #999999;
    margin-bottom: 0.13rem
  }

  .progress p span {
    color: #ee3f44
  }

  .progress p:last-child {
    margin-bottom: 0
  }

  .app_con {
    padding-bottom: 0.28rem;
  }

  .result {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    background-color: rgba(0, 0, 0, 0.75);
    filter: alpha(opacity=90);
  }

  .model_div {
    width: 6rem;
    text-align: center;
    min-height: 3.5rem;
    background: #fff;
    position: absolute;
    z-index: 1060;
    border-radius: 0.1rem;
    top: 15%;
    left: 50%;
    margin-left: -3rem;
  }

  #resultTxt {
    margin-top: 0.6rem;
    padding: 0 0.3rem;
  }

  #resultTxt1 {
    margin-top: 0.6rem;
    padding: 0 0.3rem;
  }

  .model_div h1 {
    color: #000;
    font-size: 0.4rem;
    font-weight: 700;
    text-align: center;
    margin: 0.3rem 0 0.2rem 0;
  }

  .model_div p {
    color: #000;
    font-size: 0.3rem;
    margin: 0.3rem 0;
  }

  /*.result a { position: absolute; right: -0.2rem; top: -0.2rem; width: 0.5rem; height: 0.5rem; text-indent: -1rem; background: url(../../images/activity_family/close.png) #fff no-repeat; overflow: hidden;background-size: 100%;border: 3px solid #fff;border-radius: 50%;}*/
  .button_div {
    margin-top: 0.6rem;
  }
</style>

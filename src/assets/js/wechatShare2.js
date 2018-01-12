import router from '../../router';

export function gotoJumpVue(url) {


  if(browserName == "WeChat"){
    // window.location.href=$("#base").val()+'/doooly/member/supplier_order/list.jhtml';
    //this.$router.push({path:'/cardBuyPay/'+res.data.data.orderNum});
    this.$router.push({path:url});

  }else{
    let jsonObj={
      "jumpType":"InsideJump",
      "jumpUrl":'http://test1.doooly.com'+url+'?token='+localStorage.token
    };
    if (browserName == "WebKit") {  //判断iPhone|iPad|iPod|iOS
      window.webkit.messageHandlers.gotoNativeJump.postMessage(JSON.stringify(jsonObj));
    } else if (browserName == "Chrome WebView") {   //判断Android
      RHNativeJS.gotoNativeJump(JSON.stringify(jsonObj));
    }else{
      this.$router.push({path:url});
    }
  }
};


// export  function Wechatshare(prefix,params){
//   var client = 'doooly';
//   var ua = window.navigator.userAgent.toLowerCase();
//   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//     client = 'wechat';//是微信
//   } else {
//     client = 'doooly';//不是微信
//   }
//   //调用微信接口获取用户数据
//   this.$jsonp("http://test1.doooly.com/share/commonShareJSONPConfig",
//     {//请求参数
//       params: {
//         url:location.href.split('/#')[0]+location.href.split('/#')[1],
//         'client':client, // wechat, doooly
//         'prefix':prefix,  // 配置文件前缀(活动名称,后台配置)
//         'params':params //文案里需要替换的参数, 只替换title imgUrl desc里的占位符
//       },
//       jsonp: 'callback',
//       // jsonpCallback:"success_jsonpCallback",
//       callback: "success_jsonpCallback",
//     }).then((res) => {
//     //  this.loadMore(res.data.hotMerchantList);
//     if (res.code == 1000) {
//       //var config = JSON.parse(result);
//       this.shareWithFriendsWX(res);
//
//     }
//   });
// };




export function shareWithFriendsWX(config) {
  wx.config({
    debug: false, // 是否开启调试模式
    appId: config.appid, // 必填，公众号的唯一标识
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature,// 必填，签名，见附录1
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(function(){
//  accessToken = config.accessToken;
    $("#accessToken").val(config.accessToken);
  });
}
//export {Wechatshare,gotoJumpVue};



export  function onWechatConfig(){
  //调用微信接口获取用户数据
  this.$jsonp("http://test1.doooly.com/shop/activity/jsonp/wechatConfig.jhtml",
    {//请求参数
      params: {
        url:location.href.split('/#')[0]+location.href.split('/#')[1]
      },
      jsonp: 'callback',
      // jsonpCallback:"success_jsonpCallback",
      callback: "success_jsonpCallback",
    }).then((res) => {
    //  this.loadMore(res.data.hotMerchantList);
    if (res.code == 1000) {
      //var config = JSON.parse(result);
      shareWithFriendsWX(res);

    }
  }).catch((error)=>{
    this.$toast('wechatShare2.js错误');
  });
};

/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-04-27 10:08:34
 * @version $Id$
 */

//Wechatshare('swing',['AAAA','BBBB']);

//判断是否在微信中打开
// function Wechatshare(prefix,params){
//     var client = 'doooly';
//     var ua = window.navigator.userAgent.toLowerCase();
//     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//         client = 'wechat';//是微信
//     } else {
//         client = 'doooly';//不是微信
//     }
//
//     //(xxt) var config_url = window.location.protocol == "https:"  ?  $("#httpsIURL").val() : $("#httpIURL").val() ;
//     $.ajax({
//             type: 'get',
//             url:  config_url + '/share/commonShareJSONPConfig',
//             dataType: 'JSONP',
//             async: false,
//             traditional: true,
//             data: {
//                 'url': location.href.split('#')[0],
//                 'client':client, // wechat, doooly
//                 'prefix':prefix,  // 配置文件前缀(活动名称,后台配置)
//                 'params':params //文案里需要替换的参数, 只替换title imgUrl desc里的占位符
//             },
//             jsonp:"callback",
//             jsonpCallback:"jsonpCallback",
//             success: function (result) {
//                 if(result.code == 4001){
//                     //40001微信配置
//                     shareWithFriendsWX(result.data);
//                 }else if(result.code == 4002){
//                     //40002兜里配置
//                     shareWithFriendsAPP(result);
//                 }else{
//                     //获取配置错误10001
//                     console.log("error");
//                 }
//             },
//             error: function (result) {
//               alert("服务器异常,请稍候重试!");
//             }
//     });
// }

function shareWithFriendsWX(data) {
    wx.config({
        debug: false, // 是否开启调试模式
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
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
        //微信JS接口: 分享给朋友
        wx.onMenuShareAppMessage({
            title: data.shareConfig.title, // 分享标题
            desc: data.shareConfig.desc, // 分享描述
            link: data.shareConfig.link, // 分享链接
            imgUrl: data.shareConfig.imgUrl, // 分享图标
            type: data.shareConfig.type, // 分享类型,music、video或link，不填默认为link
            dataUrl: data.shareConfig.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
        });
        //微信JS接口: 分享到朋友圈
        wx.onMenuShareTimeline({
            title: data.shareConfig.title, // 分享标题
            link: data.shareConfig.link, // 分享链接
            imgUrl: data.shareConfig.imgUrl, // 分享图标
        });
    });
}
function shareWithFriendsAPP(config){
	 if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
		 window.webkit.messageHandlers.share.postMessage(config);
     } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
    	 RHNativeJS.share(JSON.stringify(config));
     }else{
     }

}

//import Vue from 'vue';
//判断使用类型(WeChat,app(苹果：WebKit,安卓：Chrome WebView), 浏览器)
//var browserName="123";
var browserName=getBrowser();
// window.browserName="";
// window.getBrowser=function(){
//   var parser = new UAParser();
//   var result = parser.getResult();
//   var name=result.browser.name;
//   browserName=name;
// //	alert(browserName);
//   return name;
// }


function getBrowser(){
	var parser = new UAParser();
	var result = parser.getResult();
	var name=result.browser.name;
	browserName=name;
//	alert(browserName);
	return name;
}

function initTitle(titleText,key){


  var jsonObj;

  if(key==1)
  {
    jsonObj={
      "title":{"text":titleText},
      "leftButton":{"name":"lbs","text":"城市","func":"goLastPage()","visable":"true"},
      "rightButton":{"name":"notice","visable":"true"},
      "visable":"true"
    };
  }
else {
    jsonObj={
    "title":{ "text":titleText},
    "leftButton":{"name":"return","text":"返回","func":"goLastPage()","visable":"true"},
    "visable":"true"
  };

  }
  //if(isWeiXin()){}
 // else{
   // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
  if (browserName == "WebKit") {  //判断iPhone|iPad|iPod|iOS
      window.webkit.messageHandlers.initPageTitle.postMessage(JSON.stringify(jsonObj));
      //window.webkit.messageHandlers.hideWaitPanel.postMessage(null);
      window.webkit.messageHandlers.hiddenBotomTabBar.postMessage("true");

    }
    //else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
  else if (browserName == "Chrome WebView") {   //判断Android
     //alert("jajaja");
     //alert(JSON.stringify(jsonObj));
      RHNativeJS.initPageTitle(JSON.stringify(jsonObj));
      RHNativeJS.hideWaitPanel();

    }
  //}
}


//判断是否为微信浏览器
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    	return true;
    }
    else{
    	return false;
    }
}
//判断是否为pc浏览器
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


//监控代码
//百度
// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?88f914c6dca039be2e821762269b9240";
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(hm, s);
// })();
// //友盟
// var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1260241271'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260241271' type='text/javascript'%3E%3C/script%3E"));
//友盟点击事件监控(事件类别,事件操作,事件标签,事件值,元素id)
function umengClick(sort,operation,label,val,id){
	_czc.push(['_trackEvent', sort, operation, label,val,id]);
}
//监控代码



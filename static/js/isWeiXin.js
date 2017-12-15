//判断使用类型(WeChat,app(苹果：WebKit,安卓：Chrome WebView), 浏览器)
var browserName="";

function getBrowser(){
	var parser = new UAParser();
	var result = parser.getResult();
	var name=result.browser.name;
	browserName=name;
//	alert(browserName);
	return name;
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

//获取id
var userId = "";
function usedId(data){
     userId = data;
}

//获取token
var token = "";
function getToken(data){
	token=data;
}

if(isWeiXin()){
	
}else{
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
    	window.webkit.messageHandlers.getUserId.postMessage("usedId");
    	window.webkit.messageHandlers.nativePreservateToken.postMessage("getToken");
    } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
    	RHNativeJS.getUserId("usedId");
    	RHNativeJS.nativePreservateToken("getToken");
    }else{}
}

if(browserName=="WeChat"){
	
}
else if(browserName=="WebKit")
{
	window.webkit.messageHandlers.getUserId.postMessage("usedId");
	window.webkit.messageHandlers.nativePreservateToken.postMessage("getToken");
}
else if(browserName=="Chrome WebView")
{
	RHNativeJS.getUserId("usedId");
	RHNativeJS.nativePreservateToken("getToken");
}else{
	if(localStorage.token != '' && localStorage.token != undefined){
		token=localStorage.token;
	}
}

//监控代码
//百度
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?88f914c6dca039be2e821762269b9240";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
//友盟
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1260241271'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260241271' type='text/javascript'%3E%3C/script%3E"));
//友盟点击事件监控(事件类别,事件操作,事件标签,事件值,元素id)
function umengClick(sort,operation,label,val,id){
	_czc.push(['_trackEvent', sort, operation, label,val,id]);
}
//监控代码



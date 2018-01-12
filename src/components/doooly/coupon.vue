<template>
    <div>
      <div class="wrapper wrapper01" id="retr">
        <div class="scroller header_div">
          <ul class="clearfix">
            <li class="clearfix">

                <div class="list_div">
                  <div class="list_img"><img src="../../assets/images/coupon/all_list.png" /></div>
                  <div class="list_txt">全部</div>
                </div>

            </li>

            <li v-for="(item,index) in couponTitleList" :key="index" class="clearfix">




                <div class="list_div">
                  <div class="list_img"><img :src="item.logo" /></div>
                  <div class="list_txt">{{item.company}}</div>
                </div>


            </li>

          </ul>
        </div>
      </div>
      <div class="tab_div clearfix">
        <div class="hide_div">

          <div  v-for="(item,index) in couponList" :key="index" class="coupon" @click="index_click(item.productName,index+1)">
            <div class="coupon_img_div">
            <img :src="item.wechatDetailImage" /></div>
            <div class="coupon-left"><div class="coupon-inner">
              <div class="inner_title">{{item.productName}}</div>
              <div class="inner_txt">{{item.remarks}}</div>
              <div class="inner_time">有效期<span>{{timeTransfer(item.beginDate)}}</span>-<span>{{timeTransfer(item.endDate)}}</span></div></div></div>
            <div class="coupon-right"><div class="coupon-inner"><div class="coupon-money"><span>¥</span>
              <span class="sum">{{item.couponValue}}</span></div>
              <div class="coupon-condition" @click="link(item.businessOnlineUrl)">立即领取</div>
              <i class="coupon-circle top"></i><i class="coupon-circle bottom"></i></div></div></div>

        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "coupon",
        data(){
          return{
            couponTitleList:[
              {company:"知我科技",
                delFlag:0,
                id:9365,
                logo:"http://test1.doooly.com:8001/image/201709/9d825723-5aad-4d76-87e0-f5546a686f2a.jpg"},
              {company:"网易严选",
                delFlag:0,
                id:9397,
                logo:"http://test1.doooly.com:8001/image/201708/707d1158-0034-466c-b9c7-393680a5100d.png"},
              {company:"西十区",
                delFlag:0,
                id:9405,
                logo:"http://test1.doooly.com:8001/image/201611/7ac5a478-f4b4-4850-b2fc-5108d867f34b.jpg"}
            ],

            couponList:[
              {beginDate:1504082033000,
                businessOnlineUrl:"http://www.haoyhq.com/zhiwo/",
                couponValue:30,
                description:"新户领取",
                distributionQuantity:0,
                endDate:1533112435000,
                kind:"0",
                productFirstCategory:0,
                productName:"兜礼新户惠购",
                productSecondCategory:0,
                remarks:"满99-30",
                remindQuantity:0,
                wechatDetailImage:"http://test1.doooly.com:8001/image/201709/9d825723-5aad-4d76-87e0-f5546a686f2a.jpg"},
              {beginDate:1513148432000,
                businessOnlineUrl:"",
                couponValue:100,
                description:"无",
                distributionQuantity:0,
                endDate:1515826833000,
                kind:"0",
                productFirstCategory:0,
                productName:"网易严选卡券",
                productSecondCategory:0,
                remarks:"无",
                remindQuantity:0,
                wechatDetailImage:"http://test1.doooly.com:8001/image/201708/707d1158-0034-466c-b9c7-393680a5100d.png"
              },
              {beginDate:1513242956000,
                businessOnlineUrl:"http://www.baidu.com",
                couponValue:100,
                description:"无",
                distributionQuantity:0,
                endDate:1544778958000,
                kind:"0",
                productFirstCategory:0,
                productName:"网易严选活动",
                productSecondCategory:0,
                remarks:"无",
                remindQuantity:0,
                wechatDetailImage:"http://test1.doooly.com:8001/image/201708/707d1158-0034-466c-b9c7-393680a5100d.png"},
              {beginDate:1510018308000,
                businessOnlineUrl:"",
                couponValue:10,
                description:"",
                distributionQuantity:0,
                endDate:1573090316000,
                kind:"0",
                productFirstCategory:0,
                productName:"西十区优惠券",
                productSecondCategory:0,
                remarks:"",
                remindQuantity:0,
                wechatDetailImage:"http://test1.doooly.com:8001/image/201611/7ac5a478-f4b4-4850-b2fc-5108d867f34b.jpg"}
            ]
          }
        },
        methods:{
          //监控事件
          index_click(val,index){
      var sort = "首页中部";
      var operation = "优惠券";
      var label = val+"("+index+")";

      umengClick(sort, operation, label,'','');
    },
      link(link){
      if(browserName == "WeChat"){
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
        }
      }
    },
          timeTransfer(time){
            let timeDate=new Date(parseInt(time));
            let transferDate=timeDate.getFullYear()+"."+(timeDate.getMonth()+1)+"."+timeDate.getDate();
            return transferDate;


          }
        }

    }
</script>

<style scoped>
  .app_div{ background: #f7f7f8;}
  /* 滑动 */
  .htit{line-height:2rem;padding:0 .3rem;color:#ff8e2e;font-size: .4rem;}
  /*.wrapper01 {*/
    /*position: relative;*/
    /*height: 1.6rem;*/
    /*width: 100%;*/
    /*overflow: hidden;*/
    /*margin: 0 auto;*/
    /*border-bottom: 1px solid #ccc;*/
    /*background: #fff;*/
    /*padding-top: 0.2rem;*/
  /*}*/

  .wrapper01 {top: 0; position:relative;z-index: 99;background: #fff;height: 2rem;width: 100%;overflow: hidden;margin:0 auto;    border-bottom: 1px solid #ccc;}
  .wrapper01 .scroller {position:absolute;}
  .wrapper01 .scroller li {height:1.6rem;width:1.6rem;float: left;line-height:1.6rem;font-size: .4rem;text-align: center;padding-left: 0.2rem;padding-top: 0.2rem;}
  .wrapper01 .scroller li a{width:1.6rem; height:1.6rem;display: block;border: 1px solid #fff;}
  .wrapper01 .scroller li a img{width:1.6rem; height:1.6rem;position:relative;border: 1px solid #ddd;}
  .wrapper01 .scroller li.cur .bor{position:absolute;top: 0;margin-top: 0.2rem;display:none;width: 1.59rem;height: 1.59rem;border:2px solid #ee3f44;}
  .wrapper01 .scroller li.cur .bor{display:block;}
  .ui-btn-inner{display: none;}
  .header_div ul li.cur a .triangle-down{display: block;}
  /*三角形*/
  .triangle-down{display: none; margin-left: 0.64rem;width:0;height:0;border-left:0.16rem solid transparent;border-right:0.16rem solid transparent;border-top:0.16rem solid #ee3f44;margin-top: -0.67rem;z-index: 999;}
  .tab_div .show {display: block;}
  .tab_div{margin: 0rem 0.2rem 0.2rem 0.2rem;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}

  .bus_div{ height:1.6rem;margin-top: 0.1rem;margin-bottom:0.2rem;border: 0.02rem solid #ddd; padding: 0.2rem 0.2rem 0.2rem 0;background:#fff;}
  .bus_div .bus_money{height: 1.2rem;width:1.6rem;padding: 0.2rem; font-size: 0.3rem; background: #EE3F44; color: #fff;overflow: hidden;}
  .bus_div .bus_money .item_price{ text-align: center;}
  .bus_div .bus_money .item_price span{font-size: 0.52rem;font-weight: bold;}
  .bus_div .bus_money .item_usable{font-size: 0.26rem; text-align: center;line-height: 0.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

  .bus_div .bus_fr{width:70%;}
  .bus_div .bus_fr .fav_title{font-size: 0.3rem; color: #000; margin-left:0.2rem;line-height: 0.36rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .bus_div .bus_fr .fav_div{color: #a0a0a0;}
  .bus_div .bus_fr .fav_div .fav_fl .fav_exclusive{font-size: 0.26rem; color: #a0a0a0;line-height: 0.3rem;margin-left:0.2rem;}
  .bus_div .bus_fr .fav_div .fav_fl .fav_time{font-size: 0.2rem;line-height: 0.26rem; color: #a0a0a0;margin-top: 0.5rem;margin-left:0.2rem;}

  .bus_div .bus_favorable{margin-left: 0.2rem; font-size: 0.3rem;}
  .bus_div .bus_favorable .fav_title{font-size: 0.3rem; color: #000;line-height: 0.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .bus_div .bus_favorable .fav_exclusive{font-size: 0.26rem;line-height: 0.3rem; color: #a0a0a0;}
  .bus_div .bus_favorable .fav_time{font-size: 0.2rem;line-height: 0.26rem; color: #a0a0a0;margin-top: 0.6rem;}
  .fav_btn .m_t{margin-top: 1rem;text-decoration: none;}
  /*button*/
  .btn{display: inline-block;padding:0.1rem 0.4rem;margin-bottom: 0;font-size: 0.2rem;font-weight:400;line-height: 1.42857143;text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 0.01rem solid transparent;border-radius: 0.1rem;}
  .btn-primary{color: #fff;background-color: #ee3f44;border-color: #ee3f44;}
  .btn-block{display: block;width: 100%;}


  .wrapper01 .scroller li {
    height: 1.6rem;
    color: #999;
    float: left;
    font-size: .4rem;
    text-align: center;
  }

  .list_div {
    width: 1.1rem;
    padding-left: 0.2rem;
  }

.list_img {
    height: 1rem;
  }

.list_img img{
  width: 100%;
  height: 100%;
}


.cur {
    color: #ee3f44;
    border-bottom: 2px solid #ee3f44;
  }

.list_txt {
    color: #999;
    font-size: 0.24rem;
    line-height: 0.56rem;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .coupon_img_div {
    float: left;
    text-align: center;
    width: 20%;
  }


  .coupon_img_div img {
    margin: 0.3rem 0.2rem;
    width: 1rem;
    height: 1rem;
    display: inline-block;
    float: left;
    border-radius: 50%;
  }

  .coupon-left {
    float: left;
    text-align: left;
    width: 54%;
  }

  .coupon-inner {
    padding-top: 0.2rem;
    height: 1.4rem;
    position: relative;
  }

  .coupon-left .coupon-inner .inner_title {
    font-size: 0.32rem;
    color: #333;
    font-weight: 500;
    line-height: 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coupon-left .coupon-inner .inner_txt {
    font-size: 0.24rem;
    color: #999;
    line-height: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coupon-left .coupon-inner .inner_time {
    font-size: 0.24rem;
    color: #666;
    line-height: 0.3rem;
    margin-top: 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coupon-right {
    float: right;
    text-align: center;
    width: 26%;
  }

  .coupon-right .coupon-inner {
    border-left: 1px dashed #ccc;
    color: #ee3f44;
    line-height: 0.3rem;
  }

  .coupon-inner {
    padding-top: 0.2rem;
    height: 1.4rem;
    position: relative;
  }

  .coupon-money, .coupon-time {
    margin-top: 0.2rem;
    font-size: 0.25rem;
  }

  .coupon-money .sum {
    font-size: 0.5rem;
  }


  .coupon-condition {
    margin: 0.1rem 0.2rem;
    width: 1.36rem;
    line-height: 0.56rem;
    background: #fff;
    color: #ee3f44;
    border: 1px solid #ee3f44;
    text-align: center;
    font-size: 0.24rem;
    border-radius: 0.1rem;
  }


  .coupon-circle.top {
    top: -0.1rem;
  }

  .coupon-circle {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: #f5f5f5;
    position: absolute;
    left: -0.11rem;
    border-radius: 50%;
  }

  .coupon-circle.bottom {
    bottom: -0.1rem;
  }

  .coupon{position:relative;background: #62c33f;margin: 0.2rem 0.2rem 0 0.2rem;height:1.6rem;line-height:0.3rem;overflow:hidden;border-radius: 0.1rem;}


  /*html{color:#000;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}*/
  /*html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0);}*/
  /*body {background:#f5f5f5;color:#4a4f5a;font: 400 14px/1.5 "微软雅黑",Helvetica,STHeiti,Droid Sans Fallback;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}*/
  /*body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}*/
  /*input,select,textarea{font-size:100%}*/
  /*article,aside,footer,header,nav,section,audio,canvas,video,img {display: block;}*/
  /*table{border-collapse:collapse;border-spacing:0}*/
  /*fieldset,img{border:0}*/
  /*abbr,acronym{border:0;font-variant:normal}*/
  /*del{text-decoration:line-through}*/
  /*address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:normal}*/
  /*ol,ul{list-style:none}*/
  /*caption,th{text-align:left}*/
  /*h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}*/
  /*q:before,q:after{content:''}*/
  /*button{outline:0;border:none;}*/
  /*a:hover{text-decoration:none}*/
  /*ins,a{text-decoration:none}*/
  /*textarea {resize: none;}*/
  /*iframe,img {border:0;}*/
  /*img{display:block;width:100%;}*/
  /*ul,ol {list-style:none;}*/
  /*input,select,textarea {outline: 0;-webkit-user-modify: read-write-plaintext-only;}*/
  /*input {-webkit-appearance: none;}*/
  /*.pr{position:relative;}*/
  /*.abs{position: absolute}*/
  /*.fl{float:left;display:inline-block;}*/
  /*.fr{float:right;display:inline-block;}*/
  /*.clearfix:after{content:".";display:block;height:0;clear: both;visibility:hidden;}*/
  /*.clearfix{*zoom:1;}*/
  /*.wrap{min-width: 320px;max-width:768px;margin:0 auto;overflow:hidden;position:relative;}*/

  /*.htit{line-height:1rem;padding:0 .3rem;color:#ff8e2e;font-size: .4rem;margin:1rem 0 .4rem 0}*/
  /*.wrapper01 {position:relative;height: 1.6rem;width: 100%;overflow: hidden;margin:0 auto; border-bottom: 1px solid #ccc;background: #fff; padding-top: 0.2rem; }*/
  /*.wrapper01 .scroller {position:absolute}*/
  /*.wrapper01 .scroller li {height: 1.6rem; color:#999;float: left;font-size: .4rem;text-align: center;}*/
  /*.wrapper01 .scroller li a{display: inline-block;}*/
  /*.wrapper01 .scroller li a .list_div{width: 1.1rem;padding-left: 0.2rem;}*/
  /*.wrapper01 .scroller li a .list_img{height: 1rem;}*/
  /*.wrapper01 .scroller li a .list_img img{height:0.8rem; width:0.8rem;border-radius: 50%;margin-left: 0.15rem;}*/
  /*.wrapper01 .scroller li a .list_txt{color:#999;font-size: 0.24rem;line-height: 0.56rem;display:block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}*/
  /*.wrapper01 .scroller li.cur a .list_txt{color:#ee3f44; border-bottom:2px solid #ee3f44;}*/

  /*.coupon{position:relative;background: #62c33f;margin: 0.2rem 0.2rem 0 0.2rem;height:1.6rem;line-height:0.3rem;overflow:hidden;border-radius: 0.1rem;}*/
  /*.coupon-diabled{background:#c3c3c3;color:#666;}*/
  /*.coupon:after{content:".";display:block;height:0;clear:both;visibility:hidden;}*/
  /*.coupon-money span{*/
    /*font-size: 0.3rem;*/
  /*}*/
  /*.coupon-money .sum{font-size:0.5rem;}*/
  /*.coupon_img_div{float:left;text-align:center;width:20%;}*/
  /*.coupon_img_div img{margin:0.3rem 0.2rem;width: 1rem;height: 1rem;display: inline-block;float: left;border-radius: 50%;}*/
  /*.coupon-left{float:left;text-align:left;width:54%;}*/
  /*.coupon-left .coupon-inner .inner_title{font-size: 0.32rem; color: #333;font-weight: 500;line-height: 0.4rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}*/
  /*.coupon-left .coupon-inner .inner_txt{font-size: 0.24rem; color: #999;line-height: 0.3rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}*/
  /*.coupon-left .coupon-inner .inner_time{font-size: 0.24rem; color: #666;line-height: 0.3rem;margin-top: 0.2rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}*/
  /*.coupon-right{float:right;text-align: center;width:26%;}*/
  /*.coupon-inner{padding-top:0.2rem;height:1.4rem;position: relative;}*/
  /*.coupon-right .coupon-inner{border-left:1px dashed #ccc; color: #ee3f44;}*/
  /*.coupon-condition{margin: 0.1rem 0.2rem;width: 1.36rem;line-height: 0.56rem;background: #fff;color: #ee3f44; border: 1px solid #ee3f44;text-align: center;font-size: 0.24rem;border-radius: 0.1rem;}*/
  /*.coupon-money,.coupon-time{margin-top:0.2rem;}*/
  /*.coupon-circle{display:inline-block;width:0.2rem;height:0.2rem;background:#f5f5f5;position: absolute;left:-0.11rem;border-radius:50%}*/
  /*.coupon-circle.top{top:-0.1rem;}*/
  /*.coupon-circle.bottom{bottom:-0.1rem;}*/
  /*.coupon-light{position:absolute;top:0.2rem;left:20%;height:1.5rem;width:100%;background:rgba(255,255,255,.2);transform: rotate(-30deg);-webkit-transform: rotate(-30deg);-moz-transform: rotate(-30deg);}*/

</style>

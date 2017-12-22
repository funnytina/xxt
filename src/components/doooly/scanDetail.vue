<template>
  <div data="page">
    <!-- main开始 -->
    <div class="mainContent">
      <header>此验证码供当面身份验证时使用</header>
      <section>
        <div class="vip"><img src="http://test1.doooly.com/resources/doooly/images/scan_discount/doooly_vip.png" alt="" /></div>
        <article class="top">
          <div class="yzm">
            <p id="dimensionCode">{{scanDetailDatalist.dimensionCode}}</p>
            <img id="mCode" :src="scanDetailDatalist.barURL" />
          </div>
        </article>
        <article class="bot">
          <div class="yzm">
            <img id="dCode" :src="scanDetailDatalist.dimensionURL"/>
          </div>
        </article>
      </section>
    </div>
    <div class="footer clearfix">
      <input id="viewType" type="hidden" value="0">
      <div class="points" @click="changePointState">
        <p>可用积分
          <span v-if="viewoffState" class="viewoff">******</span>
          <span v-if="!viewoffState" class="view">{{scanDetailDatalist.availablePoint}}</span>
          <img id="viewImg" src="http://test1.doooly.com/resources/doooly/images/scan_discount/view_off.png">
        </p>
      </div>
      <div class="checkMap">
        <!--<a class="shop" href="javascript:void(0)" onclick='checkBusiness("${businessId}","${company}","${miniLogo}","${userId}")'>查看附近商家</a>-->
        <a class="shop" href="javascript:void(0)" @click='checkBusiness(apiGetparams.id,apiGetparams.company,apiGetparams.miniLogo,apiGetparams.userId)'>查看附近商家</a>
      </div>
    </div>
  </div>
  <!--item.id,item.company,item.miniLogo,"139642","test"-->
</template>

<script>
  import bus from '@/components/common/bus';
  import http from '@/http/http.js';
  import api from '@/assets/js/api.js';
    export default {
        name: "scan-detail",
      data(){
          return{
            viewoffState:true,
            apiGetparams:{},
            scanDetailDatalist:
              {
                dimensionCode:'6808 9714 7821 970375',
                barURL:'http://test1.doooly.com:8001/image/scan_images//680897147821970375.jpg',
                dimensionURL:'http://test1.doooly.com:8001/image/scan_images/14782197037-20171222133524tdc.png',
                availablePoint:'3025.60'
              },
            i:'',
          }
      },
      methods:{
        changePointState(){
          this.viewoffState=!this.viewoffState;
        },


        refreshDimensionCode() {


          if(browserName == "WeChat"){
           var url=api.freshDimensionUrl+'?type=\'dimensionCode\'';
          }
          else{
            var url=api.freshDimensionUrl+'?token='+localStorage.token+'&type=dimensionCode';
          }

          http({
            method: 'get',
            url: url
            // data: {
            //   mobile: this.accountNum,
            //   code:enPassword
            // }
          }).then((res) => {
           // console.log(879);
           // console.log(res.data);
            this.scanDetailDatalist.dimensionCode=res.data.dimensionCode;
            this.scanDetailDatalist.barURL=res.data.barURL;
            this.scanDetailDatalist.dimensionURL=res.data.dimensionURL;
          })
            console.log(666);
          //return this.refreshDimensionCode;

//     var data={
//       'type' : 'dimensionCode'
//     };
//     var url="";
//     var link=document.getElementById("linkUrl").value;
//     if(isWeiXin()){
//       url=link+"/doooly/member/scan/freshDimensionUrl.jhtml";
//     }
//     else{
//       url=link+"/doooly/member/scan/freshDimensionUrl.jhtml?token="+token;
//     }
//     $.ajax({
//       type:'get',
//       url: url,
//       dataType:'json',
//       data: data,
//       success: function (result) {
//         if(result.code == "1000"){
//           $('#dimensionCode').text(result.dimensionCode);
//           $('#dCode').attr('src',result.dimensionURL);
//           $('#mCode').attr("src",result.barURL);
//           //barUrl = result.barURL;
//           //barImage.attr("src",result.barURL);
//           //obj.text(result.dimensionCode);
// //                dimImage.src = result.dimensionURL;
//         } else {
// //                alert("出错了!");
//         }
//       },
//       error: function () {
// //            alert("404");
//         //alert("系统错误");
//       }
    }
  },


      created(){

        bus.$on('scan',(function(data){
          this.apiGetparams=data
        }).bind(this))
      },
      beforeDestroy () {
        bus.$off('scan');
        clearInterval(this.i);
      },
      mounted(){
          this.i= setInterval(this.refreshDimensionCode,60000);
      }

    }
</script>

<style scoped>
  /*main开始*/
  .mainContent{width:100%; min-height:10.88rem; margin-bottom: 0.5rem; }
  header{font-size: 0.28rem;color: #fff;text-align: center;margin-top: 0.4rem;}
  section{width: 7rem; margin: 0 auto;background: #fff;border-radius: 0.1rem;margin-top: 0.88rem;position: relative;}
  section article{position: relative;}
  section .vip{position:absolute;left: 50%;top:0;margin-left: -0.65rem;margin-top: -0.65rem;}
  section .vip img{width: 1.36rem;}
  section .top{padding-bottom: 0.6rem;margin:0 auto;padding-top: 1.2rem;}
  section .bot{text-align: center;padding-bottom: 0.6rem;}
  section .top div{width: 77%;margin: 0 auto;background: #fff;}
  section .top div p{font-size: 0.36rem;color: #000;text-align: center;white-space: nowrap; margin-bottom: 0.12rem;}
  section .top img{width: 100%;}
  section .bot div{width: 4rem;margin: 0 auto;background: #fff;}
  section .bot div img{width:100%;}
  .refresh_div{text-align: center;margin-top: 0.44rem; margin-bottom: 0.3rem;width: 100%; -webkit-tap-highlight-color:rgba(0,0,0,0);}
  .refresh_div img{width: 3.4rem; cursor: pointer;}
  section .top .yzm_big{position: fixed;left: 0;top: 0;width: auto;height: 7.5rem; z-index: 99999;transform:rotate(90deg);text-align: center;}
  section .top .yzm_big p{font-size: 0.7rem;}
  section .top .yzm_big img{height: 3.2rem;width: auto;margin-top: 2rem;}
  section .bot .yzm_big{position: fixed;left:0;top:0;width: 100%; height: 100%;z-index: 99999;margin: 0;}
  section .bot .yzm_big img{margin-top: 2.5rem;width: 6rem;}
  .footer{position: fixed;left: 0;bottom: 0; background-color:#f16569; font-size: 0.34rem;color: #fff;margin: 0 auto;width: 7.5rem;height: 1.2rem; margin-top: 0.3rem;}
  .footer2{background:rgba(255,255,255,0.15); font-size: 0.34rem;color: #fff;margin: 0 auto;width: 7.5rem;height: 1.3rem; text-align: center; padding-top: 0.4rem;font-weight: bold;margin-top: 0.3rem;}
  .footer2 a{display: inline-block;text-align: center;color: #fff; -webkit-tap-highlight-color:rgba(0,0,0,0);}
  .footer .points{float:left;width:50%; padding:0.46rem 0;text-align: center;-webkit-tap-highlight-color:rgba(0,0,0,0);}
  .footer .points p{height:0.4rem; line-height:0.4rem}
  .footer .points p span{margin-left:0.08rem;height:0.4rem; line-height:0.4rem;}
  .footer .points p img{width: 0.4rem;}
  .footer .points p .viewoff{vertical-align: middle;}
  /*.footer p .view{display:none}*/
  .footer .checkMap{float:right;border-left:solid 1px #f59496; width:49%;padding:0.46rem 0;text-align: center;-webkit-tap-highlight-color:rgba(0,0,0,0);}
  .footer .checkMap a{width:100%; text-align: center;color: #fff; -webkit-tap-highlight-color:rgba(0,0,0,0);}

  /* 扫码优惠 */
  .comingSoon_div{text-align: center;margin-top:40%;}
  .comingSoon_div img{width:2.7rem;height:2.16rem;}
  .comingSoon_p{color:#666;font-size:0.3rem;text-align: center;margin-top:0.2rem;}
</style>

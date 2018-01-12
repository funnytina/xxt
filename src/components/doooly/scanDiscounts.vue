<template>
  <div class="main">
    <section class="enjoy">
      <article>
        <img src="http://test1.doooly.com/resources/doooly/images/scan_discount/banner.png">
      </article>
    </section>
    <section class="business_list">

      <ul>

        <li v-for="(item,index) in scanDatalist" :key="index" @click='index_click(item.company,index+1);skip(item.id,item.company,item.miniLogo,"139642","test")'>
          <img :src="item.scanImageUrl">
        </li>

        <li v-if="waitingState" class="waiting">
          <img src="http://test1.doooly.com/resources/doooly/images/scan_discount/waiting.png">
        </li>
      </ul>

    </section>
    <!--<dyfooter></dyfooter>-->
  </div>
</template>

<script>
  import bus from '@/components/common/bus';
  import dyfooter from '@/components/common/dyfooter';
  export default {
    name: "scan-discounts",
    components:{dyfooter},
    data(){
      return{
        scanDatalist: [
          {
          appUrl: "http://www.baidu.com",
          benefitContent: "33",
          benefitWay: "222",
          businessId: "TEST_bb841e7227a0c8a8457468ae809075c2",
          businessIntroduce: "111",
          bussinessRebate: "5.00",
          bussinessRebateType: "3",
          company: "大润发",
          createDate: 1450434472000,
          dataSynchronization: "1",
          dealType: "1",
          delFlag: 0,
          discount: 9.5,
          id: 12,
          isActive: "2",
          isHot: "0",
          isRebateApply: 0,
          listImageWechat: "http://test1.doooly.com:8001/image/201607/012c2fdc-4e01-4bd2-a34c-c63026106bb5.png",
          logo: "http://test1.doooly.com:8001/image/201512/00d7eba2-8d1a-440d-af20-35a80e557898.png",
          maxUserRebate: "0",
          miniLogo: "http://test1.doooly.com:8001/image/201708/52867adb-197c-4f7d-88a4-7fa61365c312.png",
          noticeInfo: "44",
          openOffLineScan: 1,
          password: "",
          remarks: "",
          scanImageUrl: "http://test1.doooly.com:8001/image/201709/6762675e-4c0c-4398-a593-914a3fb2a49e.png",
          serverEndTime: 1506765646000,
          serverStartTime: 1505901645000,
          type: "0",
          unionLogin: "",
          updateDate: 1505901756000,
          url: "http://www.baidu.com",
          userName: "",
          userRebate: "0.00",
          userRebateType: "2",
          wechatJumpStyle: "0"
        },
          {appJumpStyle:"1",
            appUrl:"",

        businessId:"TEST_70e32c929f3e67e6c029a38af6b6ca6d",
        bussinessRebate:"0.00",
          bussinessRebateType:"0",
        company:"罗森",
        dataSynchronization:"1",
        dealType:"1",
        delFlag:0,
        discount:9.5,
        id:9343,
        isActive:"2",
        isHot:"1",
        isRebateApply:0,
        logo:"http://pay.reach-life.com:23330/images/201612/3dd87276-7ca9-455a-b995-432ecee0ae21.jpg",
        miniLogo:"http://pay.reach-life.com:23330/images/201612/d5da7057-9bd3-415a-8b54-711ea26c3194.jpg",
        noticeInfo:"<strong></strong><strong>1111111</strong>",
        openOffLineScan:1,
        password:"",
        remarks:"",
        scanImageUrl:"http://test1.doooly.com:8001/image/201709/8a3bb3cb-f101-4ff0-8be5-f97aa94ee714.png",
        serverEndTime:1624255143000,
        serverStartTime:1487656738000,
        type:"0",
        unionLogin:"",
        updateDate:1505813486000,
        url:"",
        userName:"",
        userRebate:"5.00",
        userRebateType:"0",
        wechatJumpStyle:"0"}
        ],
        emitDate:{}
      }
    },
    computed:{
      waitingState() {
        if (this.scanDatalist.length%2==0) {
              return false;
        }
        else {
          return true;
        }
      }
    },
    methods:{
    //监控事件
    index_click(val,index){
    var sort = "首页中部";
    var operation = "扫码优惠";
    var label = val+"("+index+")";
    umengClick(sort, operation, label,'','');
  },
    skip(businessId,company,miniLogo,userId,groupShortName){
        this.emitDate={};
        this.emitDate.businessId=businessId;
        this.emitDate.company=company;
        this.emitDate.miniLogo=miniLogo;
        this.emitDate.userId=userId;
        this.emitDate.groupShortName=groupShortName;
        // this.$router.push('scanDetail');
      this.$router.push({path:'/scanDetail'});




    // var jsonObj={};
    // var url="";
    // var appLink="https://admin.doooly.com:7443/reachtest";
    // var link="http://test1.doooly.com/reachtest";
    // if(browserName == "WeChat"){
    //   if(company=="大润发"){
    //     url=link+"/doooly/member/scan/scan_discount_drf.jhtml?businessId="+businessId+"&company="+company+"&miniLogo="+miniLogo+"&userId="+userId+"&groupShortName="+groupShortName;
    //   }
    //   else{
    //     url=link+"/doooly/member/scan/scan_discount.jhtml?businessId="+businessId+"&company="+company+"&miniLogo="+miniLogo+"&userId="+userId+"&groupShortName="+groupShortName;
    //   }
    //   window.location.href=url;
    // }
    // else{
    //   if (browserName == "WebKit") {//判断iPhone|iPad|iPod|iOS
    //     if(company=="大润发"){
    //       url=appLink+"/doooly/member/scan/scan_discount_drf.jhtml?token="+localStorage.token+"&businessId="+businessId+"&company="+company+"&groupShortName="+groupShortName;
    //     }
    //     else{
    //       url=appLink+"/doooly/member/scan/scan_discount.jhtml?token="+localStorage.token+"&businessId="+businessId+"&company="+company+"&groupShortName="+groupShortName;
    //     }
    //     jsonObj={
    //       "jumpType":"InsideJump",
    //       "jumpUrl":url
    //     };
    //     window.webkit.messageHandlers.gotoNativeJump.postMessage(JSON.stringify(jsonObj));
    //   } else if (browserName == "Chrome WebView") {   //判断Android
    //     if(company=="大润发"){
    //       url=appLink+"/doooly/member/scan/scan_discount_drf.jhtml?token="+localStorage.token+"&businessId="+businessId+"&company="+company+"&groupShortName="+groupShortName;
    //     }
    //     else{
    //       url=appLink+"/doooly/member/scan/scan_discount.jhtml?token="+localStorage.token+"&businessId="+businessId+"&company="+company+"&groupShortName="+groupShortName;
    //     }
    //     jsonObj={
    //       "jumpType":"InsideJump",
    //       "jumpUrl":url
    //     };
    //     RHNativeJS.gotoNativeJump(JSON.stringify(jsonObj));
    //   }else{
    //     if(company=="大润发"){
    //       url=link+"/doooly/member/scan/scan_discount_drf.jhtml?businessId="+businessId+"&company="+company+"&miniLogo="+miniLogo+"&userId="+userId+"&groupShortName="+groupShortName;
    //     }
    //     else{
    //       url=link+"/doooly/member/scan/scan_discount.jhtml?businessId="+businessId+"&company="+company+"&miniLogo="+miniLogo+"&userId="+userId+"&groupShortName="+groupShortName;
    //     }
    //     window.location.href=url;
    //   }
    // }
  }
    },
    beforeDestroy(){
      bus.$emit('scan',this.emitDate);
    },

    created(){
      // document.title = '{groupShortName}专享-扫码优惠';
      // initTitle('${groupShortName}专享-扫码优惠');

      document.title = '睿渠专享-扫码优惠';
      initTitle('睿渠专享-扫码优惠',1);


    }

  }
</script>

<style scoped>
  .main {
    width: 100%;
  }

  .main .enjoy {
    width: 100%;
    margin-bottom: 0.6rem
  }

  .main .enjoy article {
    width: 100%;
    font-size: 0;
  }

  .main .enjoy article img {
    width: 100%;
  }

  .main .business_list {
    width: 6.9rem;
    margin: 0 auto;
  }

  .main .business_list ul {
    width: 100%;
    font-size: 0;
    overflow: hidden
  }

  .main .business_list ul li {
    display: inline-block;
    width: 3.3rem;
    height: 1.94rem;
    text-align: center;
    vertical-align: top;
    margin-right: 0.16rem;
    margin-bottom: 0.2rem;
    float: left
  }

  .main .business_list ul li img {
    display: block;
    width: 3.3rem;
    height: 1.94rem;
    border-radius: 0.1rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  .main .business_list ul li:nth-child(2n) {
    margin-right: 0;
    margin-left: 0;
    float: right
  }

  .main .business_list ul .waiting {
    display: none
  }
</style>

<template>
  <div class="access">
    <ul>
      <!--<li-->
      <!--onclick="link('/doooly/hotActivity/toHotActivityIndex.jhtml');_czc.push(['_trackEvent', '首页菜单按钮', '1', '热门活动','','']);">-->
      <!--<img src="${base}/resources/doooly/images/home/hot.png"><br>-->
      <!--<span>热门活动</span>-->
      <!--</li>-->
      <!--<li onclick="link('/doooly/member/scan/list.jhtml');_czc.push(['_trackEvent', '首页菜单按钮', '2', '扫码优惠','','']);">-->
      <!--<img src="${base}/resources/doooly/images/home/scan.png"><br>-->
      <!--<span>扫码优惠</span>-->
      <!--</li>-->
      <!--<li-->
      <!--onclick="link('/doooly/homeCoupon/businessList.jhtml');_czc.push(['_trackEvent', '首页菜单按钮', '3', '优惠券','','']);">-->
      <!--<img src="${base}/resources/doooly/images/home/ticket.png"><br>-->
      <!--<span>优惠券</span>-->
      <!--</li>-->
      <!--&lt;!&ndash;<li onclick="link('/doooly/member/order/toRecharge.jhtml')">&ndash;&gt;-->
      <!--<li-->
      <!--onclick="link('/doooly/member/order/toRecharge.jhtml');_czc.push(['_trackEvent', '首页菜单按钮', '4', '手机充值','','']);">-->
      <!--<img src="${base}/resources/doooly/images/home/tel_charge.png"><br>-->
      <!--<span>手机充值</span>-->
      <!--</li>-->
      <!--<li onclick="link('/doooly/selfProduct/list.jhtml');_czc.push(['_trackEvent', '首页菜单按钮', '5', '卡券购买','','']);">-->
      <!--<img src="${base}/resources/doooly/images/home/buy.png"><br>-->
      <!--<span>卡券购买</span>-->
      <!--</li>-->
      <!--<li-->
      <!--<#if member.memberType==0>onclick="link('/doooly/familyInviteApp/familyInviteApp.jhtml');_czc.push(['_trackEvent',-->
      <!--'首页菜单按钮', '6', '邀请亲友','','']);" <#elseif member.memberType==1> onclick="alr_toast('你已经是家属了')" <#else>-->
      <!--onclick="alr_toast('服务器异常')"-->
      <!--</-->
      <!--#if> >-->
      <!--&lt;!&ndash;<li onclick="alr_toast('敬请期待')">&ndash;&gt;-->
      <!--<img src="${base}/resources/doooly/images/home/family.png"><br>-->
      <!--<span>邀请亲友</span>-->
      <!--</li>-->


      <li v-for="(item,index) in accessCatagoryData" :key="index">
        <img :src="item.accessCatagoryImgSrc"><br>
        <span>{{item.accessCatagoryContent}}</span>
      </li>


    </ul>
  </div>
</template>

<script>
  export default {
    name: "access-catagory",
    data(){
      return {
        accessCatagoryData: [
          {
            title: 'HotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/hot.png',
            accessCatagoryContent: '热门活动'
          },
          {
            title: 'HotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/scan.png',
            accessCatagoryContent: '扫码优惠'
          },
          {
            title: 'HotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/ticket.png',
            accessCatagoryContent: '优惠券'
          },
          {
            title: 'HotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/tel_charge.png',
            accessCatagoryContent: '手机充值'
          },
          {
            title: 'HotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/buy.png',
            accessCatagoryContent: '卡券购买'
          },
          {
            title: 'HotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/family.png',
            accessCatagoryContent: '邀请亲友'
          }

        ]
      }
    }

  }
</script>

<style scoped>
  /*二级页面*/
  .access {

    border-bottom: 0.2rem solid #f7f7f8;

  }

  .access ul {
    font-size: 0;
    padding: 0.28rem 0;
    background: #fff;
  }

  .access ul li {
    display: inline-block;
    width: 33.3%;
    overflow: hidden;
    text-align: center;
    font-size: 0;
  }

  .access ul li img {
    width: 0.84rem;
    height: 0.84rem;
    margin-bottom: 0.2rem;
  }

  .access ul li span {
    font-size: 0.24rem;
    color: #666;
  }

  .access ul li:nth-child(1), .access ul li:nth-child(2), .access ul li:nth-child(3) {
    margin-bottom: 0.3rem;
  }
</style>

<template>
  <div class="access">
    <ul>
      <li v-for="(item,index) in accessCatagoryData" :key="index"
          @click="linkAccess(item.title);umengClickAccess(index+1)">
        <img :src="item.accessCatagoryImgSrc"><br>
        <span>{{item.accessCatagoryContent}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "access-catagory",
    props:['memberType'],
    data() {
      return {
        accessCatagoryData: [
          {
            title: '/hotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: '/static/images/accessCatagory/hot.png',
            accessCatagoryContent: '热门活动'
          },
          {
            title: '/nav/scanDiscounts',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: '/static/images/accessCatagory/scan.png',
            accessCatagoryContent: '扫码优惠'
          },
          {
            title: '/coupon',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: '/static/images/accessCatagory/ticket.png',
            accessCatagoryContent: '优惠券'
          },
          {
            title: '/telCharge',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: '/static/images/accessCatagory/tel_charge.png',
            accessCatagoryContent: '手机充值'
          },
          {
            title: '/cardBuy',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: '/static/images/accessCatagory/buy.png',
            accessCatagoryContent: '卡券购买'
          },
          {
            title: '/familyInvite',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: '/static/images/accessCatagory/family.png',
            accessCatagoryContent: '邀请亲友'
          }
        ]
      }
    },
    methods: {
      linkAccess(name) {

        if(name=='/telCharge'){
          this.$toast('正在升级');
        }
        else{

          if(name=='/familyInvite')
          {
            if(this.memberType==0)
            {
              this.$router.push({path: name});
            }
            else if(this.memberType==1)
          {
               this.$toast('你已经是家属了')
          }

          }







          else if(name=='/nav/scanDiscounts'){
            window.location.href='http://test1.doooly.com/wechat/member/scan/list.jhtml?token='+localStorage.token
          }

          else if(name=='/coupon'){
            window.location.href='http://test1.doooly.com/doooly/homeCoupon/businessList.jhtml?token='+localStorage.token
          }

          // else if(name=='/cardBuy'){
          //   window.location.href='http://test1.doooly.com/doooly/selfProduct/list.jhtml?token='+localStorage.token
          // }
















          else{
        this.$router.push({path: name});
          }
        }

        // console.log(1999);
        // console.log(this.memberType);
      },
      umengClickAccess(label) {
        umengClick('', '首页bt', label, '', '');
        //console.log(999);
        // console.log(label);
      }
    },
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

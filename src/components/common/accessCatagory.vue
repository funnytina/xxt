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
    data() {
      return {
        accessCatagoryData: [
          {
            title: 'hotActivity',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/hot.png',
            accessCatagoryContent: '热门活动'
          },
          {
            title: 'scanDiscounts',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/scan.png',
            accessCatagoryContent: '扫码优惠'
          },
          {
            title: 'discountTicket',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/ticket.png',
            accessCatagoryContent: '优惠券'
          },
          {
            title: 'telCharge',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/tel_charge.png',
            accessCatagoryContent: '手机充值'
          },
          {
            title: 'cardBuy',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/buy.png',
            accessCatagoryContent: '卡券购买'
          },
          {
            title: 'familyInvite',
            accessCatagoryLink: '/doooly/hotActivity/toHotActivityIndex.jhtml',
            accessCatagoryImgSrc: 'http://test1.doooly.com/resources/doooly/images/home/family.png',
            accessCatagoryContent: '邀请亲友'
          }
        ]
      }
    },
    methods: {
      linkAccess(name) {
        this.$router.push({name: name});
        console.log(name);
      },
      umengClickAccess(label) {
        umengClick('', '首页bt', label, '', '');
        console.log(999);
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

<template>
  <div class="list">
    <div class="title">
      <div class="line"></div>
      <span>热门商户</span>
    </div>
    <ul class="mobile_ul">

      <li v-for="(item,index) in listData" :key="index">
        <img :src="item.listImgSrc">
        <div class="left">
          <span class="company">{{item.listCompany}}</span><br>
          <span class="describe">{{item.listDescribe}}</span><br>
          <span class="discount">最高<b>{{item.listDiscount}}折</b></span>
  </div>
  <div class="fr">查看详情</div>
  </li>

</ul>
</div>
</template>

<script>
    export default {
        name: "list",
        data(){
          return {
            listData:[
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/weipinhui.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/darunfa.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/darunfa.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/weipinhui.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              },
              {
                listImgSrc:'http://test1.doooly.com/resources/doooly/images/lighten_business/weipinhui.png',
                listCompany:'唯品会',
                listDescribe:'全球精选，正品特卖',
                listDiscount:'9.5'
              }
            ]

          }
        }
    }
</script>

<style scoped>

  /*商户列表*/
  .list{
    background: #fff;
  }
  .list .title{
    height: 0.98rem;
    position: relative;
    border-bottom: 1px solid #ececec;
  }
  .list .title .line{
    position: absolute;
    left: 50%;
    top:0.48rem;
    width: 2.68rem;
    margin-left: -1.34rem;
    height: 1px;
    background:#333;
    z-index: 1;
  }
  .list .title span{
    position: absolute;
    font-size: 0.32rem;
    color: #333;
    line-height: 0.98rem;
    width: 1.48rem;
    background: #fff;
    left: 50%;
    margin-left: -0.77rem;
    z-index: 2;
    text-align: center;
  }
  .list ul{
    font-size: 0;
  }
  .list ul li{
    margin:0 0.3rem;
    height: 1.8rem;
    border-bottom: 1px solid #ececec;
    position: relative;
  }
  .list ul li img{
    margin-top: 0.3rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius:100%;



  }
  .list ul li .left{
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 0.3rem;
    margin-left: 1.5rem;

  }
  .list ul li .left span{
    display: inline-block;
    overflow: hidden;
    max-width: 3.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list ul li .left .company{
    font-size: 0.32rem;
    line-height: 0.45rem;
    height: 0.45rem;
    color: #333;
  }
  .list ul li .left .describe{
    font-size: 0.24rem;
    line-height: 0.3rem;
    height: 0.3rem;
    margin-bottom:0.15rem;
    color: #999;

    /*margin-left: 1.2rem;*/

  }
  .list ul li .left .discount{
    font-size: 0.24rem;
    line-height: 0.3rem;
    height: 0.3rem;
    color: #666;

    margin-left: 0.1rem;



  }
  .list ul li .left .discount b{
    color: #ee3f44;
    font-weight: normal;
  }
  .list ul li .fr{
    margin-top: 0.62rem;
    width: 1.36rem;
    line-height: 0.56rem;
    background: #fff;
    color: #ee3f44;
    border:1px solid #ee3f44;
    text-align: center;
    font-size: 0.24rem;
    border-radius: 0.1rem;
  }


  .company_logo{
    width: 0.83rem;
    height: 0.95rem;
    position: absolute;
    top: 0;
    right: 0.34rem;
    background-size: 100%;
    font-size: 0;
  }
  .company_logo img{
    width: 0.5rem!important;
    height: auto!important;
    position: absolute;
    left: 50%;
    top: 50%;
  }
</style>

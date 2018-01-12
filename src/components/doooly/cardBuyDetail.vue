<template>
  <div>
    <!--轮播图-->
    <adBanner :items="cardBuyDetailList.imagesList"></adBanner>
    <!-- 标题 -->
    <div class="explain padding_frm">
      <div class="title">
        {{cardBuyDetailList.selfProduct.name}}
      </div>

      <div class="details" v-if="cardBuyDetailList.selfProduct.brandDescription">
        {{cardBuyDetailList.selfProduct.brandDescription}}
      </div>

      <div class="price">
        <span class="red">￥</span><span id="sellPrice_view">{{showSellPrice}}</span><span>市场价￥<span
        id="marketPrice_view">{{showMarketPrice}}</span></span>
        <div class="fr" :class="{red:inventory<10}">{{inventoryText}}</div>
      </div>
      <ul class="label">
        <li>测试专享</li>
      </ul>
    </div>
    <div class="line_bold"></div>
    <!-- 商品规格 -->
    <div class="specification padding_frm">
      <div class="title">规格</div>
      <ul class="label">
        <!--<#list skuList as skuList>-->
        <!--<li <#if skuList_index == 0>class="check"</#if> data-id="${skuList.id}" data-buyNumberLimit="${skuList.buyNumberLimit}" data-overBuyLimit="${skuList.overBuyLimit?string ("true","false")}" data-inventory="${skuList.inventory}" data-sellPrice="${skuList.sellPrice}" data-marketPrice="${skuList.marketPrice}">${skuList.specification}</li>-->
        <!--</#list>-->
        <li :class="{check:checkSkuClass==index}" v-for="(item,index) in cardBuyDetailList.skuList" :key="index"
            @click="skuClick(index)">{{item.specification}}
        </li>
      </ul>
    </div>
    <!-- 类型 -->
    <div class="type padding_frm">
      <div class="title">卡券类型</div>
      <ul class="label">
        <!--<#list productTypeList as productTypeList>-->
        <!--<li <#if productTypeList_index == 0>class="check"</#if> data-id="${productTypeList.id}">${productTypeList.name}</li>-->
        <!--</#list>-->
        <li :class="{check:checkProTypeClass==index}" v-for="(item,index) in cardBuyDetailList.productTypeList"
            :key="index" @click="proTypeClick(index)">{{item.name}}
        </li>
        {{cardBuyDetailList.productTypeList}}
      </ul>
    </div>
    <div class="line_bold"></div>
    <!-- 详情 -->
    <div class="commodity_details">
      {{cardBuyDetailList.selfProduct.detail}}
    </div>
    <!-- 返回顶部 -->
    <div class="go_top">
      <img src="../../assets/images/cardbuy/go_top.png">
    </div>
    <!-- 底部悬浮 -->
    <div class="footer_bg"></div>
    <footer>
      <div class="fl">
        可用积分：<span>{{cardBuyDetailList.availablePoint}}</span>
      </div>
      <div class="fr" :class="{gary:inventory===0}" @click="order()">
        {{inventory===0?'已售罄':'立即订购'}}
        <!--{{inventory!=0?'立即订购':'已售罄'}}-->
      </div>
    </footer>
  </div>
</template>

<script>

  import adBanner from '@/components/common/adBanner';
  import http from '@/http/http.js';
  import api from '@/assets/js/api.js';
  import bus from '@/components/common/bus';
  export default {
    name: "card-buy-detail",
    components: {
      adBanner,
    },
    data() {
      return {
        cardBuyDetailList:
          {
            selfProduct: {
              brandDescription: "大牌",
              businessId: "9428",
              company: "test商户",
              detail: "1",
              id: "103",
              marketPrice: "32.00",
              name: "测试商品2",
              sellPrice: "29.00",
              state: 0
            },
            skuList: [
              {
                id: "493",
                inventory: 5,
                marketPrice: "32.00",
                number: "ZY00114",
                overBuyLimit: false,
                sellPrice: "29.00",
                specification: "单人套餐"
              },
              {
                id: "494",
                inventory: 21,
                marketPrice: "60.00",
                number: "ZY00115",
                overBuyLimit: false,
                sellPrice: "56.00",
                specification: "双人套餐"
              }
            ],
            productTypeList: [{
              id: "2",
              name: "电子卡券"
            }],
            availablePoint: 3000,
          },
        checkSkuClass: 0,
        checkProTypeClass: 0,
        // showSellPrice:this.cardBuyDetailList.skuList[0].sellPrice,
        // showMarketPrice:this.cardBuyDetailList.skuList[0].marketPrice
        showSellPrice:'',
        showMarketPrice:'',
        inventory:'',
        inventoryText:'',
        skuIndex:0,
        proIndex:0,
        postData:{},

      }
    },
    methods: {

      //威尔士的特殊处理
      handleWelsh(name,id){
        if(name=='威尔士健身卡')
        {
          this.Wechatshare('selfproduct',[id]);
        }

      },


      //选择商品规格
      skuClick(index) {
        this.checkSkuClass = index;
        this.skuIndex=index;
        this.showSellPrice=this.cardBuyDetailList.skuList[index].sellPrice;
        this.showMarketPrice=this.cardBuyDetailList.skuList[index].marketPrice;
        let inventory=this.cardBuyDetailList.skuList[index].inventory;
        console.log(9797);
        console.log(index);
        console.log(inventory);
        this.handleInventory(inventory);

      },
      proTypeClick(index) {
        this.checkProTypeClass = index;
        this.proIndex=index;
      },
      order() {
       // this.$router.push('cardBuyOrder')
        console.log(this.cardBuyDetailList);
        console.log(777);
        console.log(this.cardBuyDetailList.productTypeList[this.proIndex].id);
        this.postData=	{
            productType:this.cardBuyDetailList.productTypeList[this.proIndex].id,
            merchantProduct:[{
            merchantId:this.cardBuyDetailList.selfProduct.businessId,
            remarks:'',
            productSku:[{
              'productId':this.cardBuyDetailList.selfProduct.id,
              'skuId':this.cardBuyDetailList.skuList[this.skuIndex].id,
              'buyNum':1
            }]

          }],
            img:this.cardBuyDetailList.imagesList[0],
            name:this.cardBuyDetailList.selfProduct.name,
            specification:this.cardBuyDetailList.skuList[this.skuIndex].specification,
            sellPrice:this.showSellPrice,

        }
        this.$router.push({path: '/cardBuyOrder'})
      },

      //带库存量的商品处理方法
      handleInventory(inventory){
        this.inventory=inventory;
        console.log(555666);
        console.log(inventory);

        if(inventory===0){
          this.inventoryText="库存0件";
          console.log(555);
        }
        else if(inventory==''|| inventory == undefined)
        {
          //this.inventory=this.cardBuyDetailList.skuList[0].inventory;
          this.inventoryText='';
        }

        else if(inventory>0&&inventory<10){
          this.inventoryText="库存紧张";
        }
        else if(inventory>=10){
          this.inventoryText="库存"+inventory+"件";
        }
      },

      //加载商品详情信息
      loadCardBuyDetailList(){
        http({
          method: 'get',
          url: api.detailForAjax+'?productId='+this.$route.params.productId+'&token='+localStorage.token,
        }).then((res) => {

          console.log(333);
          console.log(res.data);
          this.cardBuyDetailList=res.data;
          this.showSellPrice=this.cardBuyDetailList.skuList[0].sellPrice;
          this.showMarketPrice=this.cardBuyDetailList.skuList[0].marketPrice;
          let inventory=this.cardBuyDetailList.skuList[0].inventory;
           this.handleInventory(inventory);



        })
      }

    },
    beforeDestroy(){
      bus.$emit('cardbuy',this.postData);
    },
    mounted(){
      this.handleWelsh(this.cardBuyDetailList.selfProduct.name,this.cardBuyDetailList.selfProduct.id);
      this.loadCardBuyDetailList();
      console.log(this.inventory);
      document.title = '商品详情';
      initTitle('商品详情');
    }
  }
</script>

<style scoped>

  .padding_frm{
    margin: 0 0.3rem;
  }
  .line_bold{
    width: 100%;
    height: 0.2rem;
    background: #f5f5f5;
  }
  /*标题部分*/
  .explain {
    margin-top: 0.4rem;
  }

  .explain .title {
    margin-bottom: 0.2rem;
    color: #333;
    font-size: 0.36rem;
    line-height: 100%;
  }

  .explain .details {
    font-size: 0.24rem;
    color: #999;
    line-height: 0.32rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .explain .price {
    margin-top: 0.4rem;
    font-size: 0.4rem;
    color: #ee3f44;
    line-height: 100%;
  }

  .explain .price span {
    display: inline-block;
    margin-left: 0.12rem;
    font-size: 0.24rem;
    color: #999;
  }

  .explain .price span.red {
    margin: 0;
    color: #ee3f44;
    font-size: 0.28rem;
    text-decoration: none;
  }

  .explain .fr {
    font-size: 0.24rem;
    color: #999;
    line-height: 0.5rem;
  }

  .explain .fr.red {
    color: #ee3f44;
  }

  .explain .label {
    font-size: 0;
    margin-top: 0.16rem;
    margin-bottom: 0.3rem;
  }

  .explain .label li {
    display: inline-block;
    padding: 0 0.1rem;
    line-height: 0.4rem;
    background: #fff;
    color: #ee3f44;
    font-size: 0.24rem;
    border: 1px solid #ee3f44;
    text-align: center;
    border-radius: 0.1rem;
  }

  #sellPrice_view {
    display: inline;
    margin: 0;
    font-size: 0.4rem;
    color: #ee3f44;
  }

  #marketPrice_view {
    display: inline;
    margin: 0;
  }

  /*规格*/
  .specification {
    padding-top: 0.4rem;
    padding-bottom: 0;
    border-bottom: 1px solid #f5f5f5;
  }

  /*类型*/
  .type {
    padding-top: 0.3rem;
    padding-bottom: 0.1rem;
  }

  .specification .title, .type .title {
    margin-bottom: 0.18rem;
    line-height: 100%;
    font-size: 0.28rem;
    color: #333;
  }

  .specification .label, .type .label {
    font-size: 0;
  }

  .specification .label li, .type .label li {
    display: inline-block;
    line-height: 0.64rem;
    padding: 0 0.2rem;
    font-size: 0.24rem;
    color: #333;
    background: #f5f5f5;
    border-radius: 0.1rem;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;
  }

  .specification .label li.check, .type .label li.check {
    background: #ee3f44;
    color: #fff;
  }

  /*商品详情*/
  .commodity_details {
    font-size: 0;
  }

  .commodity_details img {
    width: 100%;
  }

  /*返回顶部*/
  .go_top {
    position: fixed;
    right: 0.3rem;
    bottom: 1.3rem;
    width: 0.82rem;
    height: 0.82rem;
    border-radius: 100%;
    border: 1px solid #ccc;
    opacity: 0.7;
    font-size: 0;
    background: #fff;
    display: none;
  }

  .go_top img {
    width: 100%;
    height: 100%;
  }

  /*底部悬浮*/
  .footer_bg {
    height: 1rem;
    width: 100%;
  }

  footer {
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 0.32rem;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    z-index: 9;
  }

  footer .fl {
    width: 4.46rem;
    text-align: left;
    text-indent: 0.3rem;
    border-top: 1px solid #ececec;
  }

  footer .fl span {
    font-size: 0.36rem;
    color: #ee3f44;
  }

  footer .fr {
    width: 3rem;
    background: #ee3f44;
    color: #fff;
    text-align: center;
  }

  footer .fr.gary {
    background: #ccc;
  }

  form {
    display: none;
  }
</style>

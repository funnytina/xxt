<template>
  <div>
    <!--<swiper :options="swiperOption"  ref="mySwiper">-->
      <!--&lt;!&ndash; 这部分放你要渲染的那些内容 &ndash;&gt;-->
      <!--<swiper-slide v-for="(item,index) in items" :key="index">-->
        <!--<img :src="item">-->
      <!--</swiper-slide>-->
      <!--&lt;!&ndash; 这是轮播的小圆点 &ndash;&gt;-->
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    <!--</swiper>-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in items" :key="index"><img :src="item"></mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';


  export default {
    components: {
      'mt-swipe':Swipe,
      'mt-swipe-item':SwipeItem
    },

    data() {
      return {
        items:['http://test1.doooly.com:8001/image/201709/10196c51-5d4c-4612-97a7-9ddca69aebae.png','http://test1.doooly.com:8001/image/201711/ff6c810a-91af-4ddc-a7c3-155a714f3972.jpg','http://test1.doooly.com:8001/image/201709/71e6cda4-0719-40f4-9ffd-285fb318861d.png'],

    }}


  }
</script>
<style scoped>
.mint-swipe{
  height: 3rem;
}

img{
  width: 100%;
  height: 100%;
}

</style>

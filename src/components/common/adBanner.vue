<template>
  <div>
    <swiper :options="swiperOption"  ref="mySwiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide v-for="(item,index) in items" :key="index">
        <img :src="item">
      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        items:['http://test1.doooly.com:8001/image/201709/10196c51-5d4c-4612-97a7-9ddca69aebae.png','http://test1.doooly.com:8001/image/201711/ff6c810a-91af-4ddc-a7c3-155a714f3972.jpg','http://test1.doooly.com:8001/image/201709/71e6cda4-0719-40f4-9ffd-285fb318861d.png'],
      swiperOption: {
        initialSlide:0,//设定初始化时slide的索引
          direction:'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
          loop: false,  //无限滚动
          speed:300,//滑动速度
          autoplay:2500,//自动切换的时间间隔
         autoplayDisableOnInteraction:false,
          pagination : '.swiper-pagination',
          onSlideChangeEnd: swiper => { //滑动之后回调函数
          //切换结束时，告诉我现在是第几个slide
          console.log('kkkkkkkkkkk')
        }

        // autoplay:true,
        // pagination: '.swiper-pagination',
        // slidesPerView: 1,
        // paginationClickable: true,
        // mousewheelControl: true

      }
    }},
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    //定义这个sweiper对象

    // mounted () {
    //   //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
    //   this.swiper.slideTo(0, 0, false);
    // }
    methods:{
      test(){

        console.log(this.swiperOption)
      }

    }


  }
</script>
<style scoped>
img{
  width: 100%;
  height: 100%;
}

</style>

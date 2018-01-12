<template>
    <div>这是个人中心

      <!--<dyfooter></dyfooter>-->
    </div>
</template>

<script>
  import dyfooter from '@/components/common/dyfooter';
    export default {
        name: "user-info",
        components:{dyfooter},
      created(){
        // document.title = '{groupShortName}专享-扫码优惠';
        // initTitle('${groupShortName}专享-扫码优惠');

        document.title = '个人中心';
        initTitle('个人中心',1);


      }


    }
</script>

<style scoped>

</style>

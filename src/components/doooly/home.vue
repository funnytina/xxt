<template>
  <div>
    <ad-banner :items="itemList"></ad-banner>
    <access-catagory :memberType="memberType"></access-catagory>

    <list :label="currentLabel">

      <div slot="title" class="title">
        <!--<div class="line"></div>-->
        <span>热门商户</span>
      </div>
    </list>
    <!--<dyfooter></dyfooter>-->
  </div>
</template>

<script>
  import accessCatagory from '@/components/common/accessCatagory';
  import adBanner from '@/components/common/adBanner';
  import dyfooter from '@/components/common/dyfooter';
  import list from '@/components/common/list';
  import http from '@/http/http.js';
  import api from '@/assets/js/api.js';
  export default {
    name: "home",
    components: {
      accessCatagory,
      adBanner,
      dyfooter,
      list
    },
    data(){
      return{
        currentLabel:-1,
        itemList:[],
        memberType:''

      }
    },

    methods:{

  loadAccessCatagory(){
      http({
             method: 'get',
             url: api.indexForAjax+'?address='+'上海'+'&token='+localStorage.token,
  }).then((res) => {
    this.memberType=res.data.data.type;
        for (let [index, elem] of res.data.data.ads.entries()) {
          console.log(index, elem.imagePath);
          this.itemList.push(elem.imagePath);
        }

      })

  }
  },

    created(){
      // document.title = '{data.groupShortName}专享';
      // initTitle('{data.groupShortName}专享');

      document.title = '睿渠专享';
      initTitle('睿渠专享',1);
      this.loadAccessCatagory();


    },


  }
</script>

<style scoped>

</style>

<template>
    <div>
      <router-view></router-view>
      <dyfooter v-if="dyfooterState"></dyfooter>
    </div>
</template>

<script>

  import dyfooter from '@/components/common/dyfooter';
    export default {
        name: "nav",
        components:{dyfooter},
      data(){
          return{

            dyfooterState:true
          }

      },
        mounted(){
          if(browserName == "WebKit" || browserName == "Chrome WebView"){
                     this.dyfooterState=false;
                    // alert(1);
          }
          else{
            this.dyfooterState=true;
          }
        }
    }
</script>

<style scoped>

</style>

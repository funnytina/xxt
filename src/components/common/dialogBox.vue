<template>
  <div class='app_alr_bg' v-if="dialogState" @click="appAlrClose()">
    <div class='app_alr_lighten'>
      <img class='app_alr_lighten_banner' :src='logo' >
      <section class='app_alr_lighten_section'>
        <div class='app_alr_lighten_title'>正在为你跳转{{company}}</div>
        <p class='app_alr_lighten_p'>您即将浏览{{company}}网页，请使用您的兜礼会员对应的手机号注册并登录购买，即可享受兜礼会员折扣。</p>
        <input @click="applink()" class='single_close' type='button' value="我知道了">
      </section>
    </div>
  </div>
</template>
<script>
    export default {
      name: "dialogBox",
      data(){
        return{

        }
      },
      props:['detailUrl','company','logo','activityType','dialogState'],
      methods:{
        appAlrClose:function () {
          this.$emit("chaildChangeState",false)
        },
        applink:function () {

        }
      }
    }
</script>

<style scoped>
  /*.app_alr_bg{*/
    /*width:50%;*/
    /*position: absolute;*/
    /*!*top: 50%;*!*/
    /*left: 50%;*/
    /*-moz-transform: translate(-50%, -50%);*/
    /*-ms-transform: translate(-50%, -50%);*/
    /*-webkit-transform: translate(-50%, -50%);*/
    /*transform: translate(-50%, -50%);*/
    /*background:rgba(0,0,0,0.4);*/
    /*z-index: 9999;*/
  /*}*/
  .app_alr_bg{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.4);
    z-index: 9999;
  }
  .app_alr_lighten{
    position: fixed;
    width: 6rem;
    left: 0;
    right: 0;
    margin: auto;
    top: 20%;
    background: #ffffff;
    border-radius: 0.2rem;
    z-index: 10000;
    font-size: 0;
    text-align: center;
    font-family: '微软雅黑';
  }
  .app_alr_lighten_banner{
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.6rem 0 0.4rem;
    border-radius: 50%;
  }
  /*.app_alr_lighten_close{*/
    /*background: url(../../assets/close.png) no-repeat 0 0;*/
    /*background-size: 100%;*/
    /*width: 0.5rem;*/
    /*height: 0.5rem;*/
    /*position: absolute;*/
    /*top: 0.1rem;*/
    /*right: 0.1rem;*/
  /*}*/

  .app_alr_lighten_section{
    background: #f8f8f8 url(/static/images/alr_arc.jpg) no-repeat 0 0;
    background-size: 100%;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
  .app_alr_lighten_title{
    font-size: 0.36rem;
    color: #333;
    line-height: 0.36rem;
    text-align: center;
    padding-top: 0.56rem;
    margin: 0 0 0.6rem 0;
  }
  .app_alr_lighten_p{
    padding: 0 0.54rem;
    font-size: 0.28rem;
    line-height: 0.38rem;
    color: #666;
    text-align: left;
  }
  .single_close{
    margin: 0.6rem 0 0.7rem 0;
    width: 4.28rem;
    line-height: 0.7rem;
    color: #fff;
    border-radius: 1rem;
    font-size:0.28rem;
    background: linear-gradient(to right,#ee603f, #ee3f44);
    background: -webkit-linear-gradient(left,#ee603f, #ee3f44);
    background: -o-linear-gradient(right, #ee603f, #ee3f44);
    background: -moz-linear-gradient(right, #ee603f, #ee3f44);
  }
  .srollhidden{
    height:100%;
    overflow: hidden;
  }
</style>

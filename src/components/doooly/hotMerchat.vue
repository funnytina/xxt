<template>
    <div>
      <div class="classify_down_bg" v-if="upState"></div>
      <!--<dyfooter></dyfooter>-->
      <ad-banner :items="itemList"></ad-banner>
      <div class="list">
        <div class="title">
          <ul class="classify">
            <!--<li data-id="-1" class="l1">全部<div></div></li>-->
            <li v-for="(item,index) in tabList" :key="index" :class="{l1:l1Class==index}" @click="loadLiData(index,item.id)">{{item.label}}</li>

          </ul>
          <ul class="classify_down" v-if="upState">
            <li v-for="(item,index) in tabList" :key="index" :class="{l1:l1Class==index}" @click="loadLiData(index,item.id)">{{item.label}}</li>
          </ul>
          <div class="toggle" :class="{up:upState,down:downState}" @click="changeUpDown">
            <div class="box">
              <img src="../../assets/images/classDown.png">
            </div>
          </div>
        </div>
    </div>
    <list :label="currentLabel"></list>
    </div>
</template>

<script>

    import adBanner from '@/components/common/adBanner';
    import http from '@/http/http.js';
    import api from '@/assets/js/api.js';
    import list from '@/components/common/list';
    export default {
        name: "hot-merchat",
        components:{adBanner,list},
        data(){
          return{
                tabList:[{id:-1,label:'全部'}],
            upState:false,
            downState:false,
            l1Class:0,
            currentLabel:-1,
            itemList:[],
          }

        },
        methods:{
          loadTabList(){
            http({
              method: 'get',
              url: api.dictDatas+'?address=\'' + '上海' + '\'&token=' + localStorage.token
            }).then((res)=>{
              for (let [k, v] of res.data.data.dicts.entries()) {
                this.tabList.push({id:v.value,label:v.label});
                console.log(v.label);
              }

            })
          },
          changeUpDown(){
              if(this.upState==false)
              {
              this.upState=true,
              this.downState=false
              }
              else{
                   this.upState=false,
                  this.downState=true
              }
          },
          loadLiData(index,id){
            this.l1Class=index;
            this.upState=false;
            this.currentLabel=id;
          },
          loadAccessCatagory(){
            http({
              method: 'get',
              url: api.hotDataForAjax+'?address='+'上海'+'&token='+localStorage.token,
            }).then((res) => {

              console.log(res.data);
              console.log(233);
              for (let [index, elem] of res.data.data.ads.entries()) {
                console.log(index, elem.imagePath);
                this.itemList.push(elem.imagePath);
              }

            })

          }

        },
      created(){
        // document.title = '{groupShortName}专享-扫码优惠';
        // initTitle('${groupShortName}专享-扫码优惠');

        document.title = '睿渠专享-热门商户';
        initTitle('睿渠专享-热门商户',1);


      },
      mounted(){
              this.loadTabList();
              this.loadAccessCatagory();
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
    /*display: none;*/
    border-bottom: 0.2rem solid #f7f7f8;
  }
  .list .title .toggle{
    position: absolute;
    right: 0;
    top:0;
    width: 1.4rem;
    height: 0.98rem;
    font-size: 0;
    overflow: hidden;
    background: transparent;
    text-align: right;
  }
  .list .title .toggle .box{
    display: inline-block;
    width: 0.9rem;
    height: 0.98rem;
    font-size: 0;
    background: #fff;
    box-shadow: -10px 0px 20px #fff;
    position: relative;
  }
  .list .title .toggle .box img{
    width: 0.24rem;
    height: 0.24rem;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left:-0.12rem;
    margin-top:-0.12rem;
  }
  .list .title .up img{
    animation: up 0.6s forwards;
  }
  @keyframes up{
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(45deg);
    }
  }
  .list .title .down img{
    animation: down 0.6s forwards;
  }
  @keyframes down{
    from {
      transform:rotate(45deg);
    }
    to {
      transform:rotate(0deg);
    }
  }

  .list .title .classify{
    font-size: 0;
    overflow: scroll;
    white-space:nowrap;
    position: relative;
    padding:0 0.05rem;
    padding-right: 0.9rem;
    border-bottom:1px solid #ececec;
  }
  .list .title .classify li{
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.98rem;
    margin: 0 0.24rem;
    padding:0 0.03rem;
    position: relative;
  }
  .list .title .classify li.l1{
    color: #ee3f44;
    border-bottom: 2px solid #db3c16;
  }
  .list .title .classify li div{
    width:100%;
    height:0.04rem;
    background:#db3c16;
    position: absolute;
    left:0;
    bottom:0;
    margin-top:-0.04rem;
  }
  .classify_down_bg{
    position: fixed;
    left:0;
    top:3.98rem;
    margin-top:1px;
    /*display:none;*/
    background:rgba(0,0,0,0.5);
    z-index:1000;
  }
  .list .title .classify_down{
    /*display: none;*/
    font-size: 0;
    position: absolute;
    left: 0;
    top: 100%;
    margin-top:1px;
    background: #fff;
    padding: 0.25rem 0.13rem;
    z-index:1001;
  }
  .list .title .classify_down li{
    display: inline-block;
    font-size: 0.24rem;
    color: #333333;
    line-height: 0.64rem;
    width: 1.5rem;
    text-align: center;
    margin:0.15rem;
    border-radius: 0.1rem;
    background: #f5f5f5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list .title .classify_down li.l1{
    color: #fff;
    background:#ee3f44;
  }
</style>

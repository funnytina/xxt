<template>
  <div>
  <div id="mytabs" class="list">
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
                  :bottomDistance="bottomDistanceValue" bottomDropText="" bottomPullText="">
    <ul id="activityList">
      <li v-for="(item,index) in activityData" :key="index" @click="changedialogBoxData(item.activityLinkUrl,item.company,item.logo,item.activityType);indexClick(item.company,index+1)">
        <img :src="item.listImageUrl" alt="item.company">
        <!--<dialogBox :dialogState="dialogState" :detailUrl="item.detailUrl" :company="item.company" :logo="item.logo" :activityType="item.activityType"></dialogBox>-->
      </li>
      <div class="loadContainer" v-if="loadContainerState">
        <div class="loadText"></div>
        已经全部加载完毕
        <div class="loadLine"></div>
      </div>
    </ul>
        <div class="mint-loadmore-bottom"><img class="mint-loadmore-bottom-img" src="/static/images/loading.gif"></div>
      </v-loadmore>
    </div>
  </div>
  <dialogBox v-on:chaildChangeState="chaildDialogState" :dialogState="dialogState" :detailUrl="dialogBoxData.detailUrl" :company="dialogBoxData.company" :logo="dialogBoxData.logo" :openOneNnumber=0></dialogBox>
  </div>
</template>

<script>
  import http from '@/http/http.js';
  import api from '@/assets/js/api.js';
  import {Loadmore} from 'mint-ui';
  import dialogBox from '@/components/common/dialogBox';
    export default {
        name: "hot-activity",
        data(){return{
          bottomDistanceValue: 70,
          activityData:[],
          pageNumber:1,
          pageSize:10,
          allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
          loadContainerState: false,
          scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
          loadFinish: false,
          dialogState:false,
          dialogBoxData:{
            detailUrl:'',
            company:'',
            logo:''
          }
        }},
      components: {
        'v-loadmore': Loadmore,
        dialogBox:dialogBox,
      },
        methods:{

          joinActivityUrl(token, pageNumber, pageSize) {
            return api.getHotActivityList + '?token=' + token + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize
          },
          loadFirstPage(){
            http({
              method: 'post',
              url: this.joinActivityUrl(localStorage.token, this.pageNumber, this.pageSize),
            }).then((res) => {
             this.activityData = [...res.data.data.list];
              if (this.pageNumber >= res.data.data.countPage) {
                this.allLoaded = true;
                this.loadContainerState = true;
              }
             console.log(res.data);
          });
            this.$nextTick(function () {
              this.scrollMode = "touch";
            });
          },
          more(){
            this.pageNumber = this.pageNumber + 1;
            http({
              method: 'post',
              url: this.joinActivityUrl(localStorage.token, this.pageNumber, this.pageSize),
            }).then((res) => {
              if (this.pageNumber >= res.data.data.countPage) {
                this.allLoaded = true;
                this.loadContainerState = true;
              }
              this.activityData = this.activityData.concat([...res.data.data.list]);
            });
          },
          // 上拉加载
          loadBottom() {
            this.more();// 上拉触发的分页查询
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
          },

          indexClick(val,index){
            var sort = "首页中部";
            var operation = "热门活动";
            var label = val+"("+index+")";
            console.log(123);
            umengClick(sort, operation, label,'','');
          },
          changedialogBoxData(detailUrl,company,logo,activityType){

           // if(activityType==10 || activityType==12) {
            if(true){
              this.dialogState = !this.dialogState;
              this.dialogBoxData = {
                detailUrl: '',
                company: '',
                logo: ''
              };
              this.dialogBoxData.detailUrl = detailUrl;
              this.dialogBoxData.company = company;
              this.dialogBoxData.logo = logo;

            }else{
              if(browserName=="WeChat"){
                window.location.href=detailUrl;
              }else{
                var typeLink="";
                if(detailUrl.indexOf("?") > 0 ){
                  typeLink = detailUrl + '&token=' + localStorage.token;
                }else{
                  typeLink = detailUrl + '?token=' + localStorage.token;
                }
                let jsonObj={
                  "jumpType":"InsideJump",
                  "jumpUrl":typeLink
                };
                if (browserName == "WebKit") {  //判断iPhone|iPad|iPod|iOS
                  window.webkit.messageHandlers.gotoNativeJump.postMessage(JSON.stringify(jsonObj));
                } else if (browserName == "Chrome WebView") {   //判断Android
                  RHNativeJS.gotoNativeJump(JSON.stringify(jsonObj));
                }else{
                  window.location.href=typeLink;
                }
              }
            }

          },
          chaildDialogState(data){
            this.dialogState=false;
          }
        },
      mounted(){
          this.loadFirstPage();
      }

    }
</script>

<style scoped>
  .list{width:100%}
  .list ul{wdith:100%;padding-top:0.1rem}
  .list ul li{width:100%; height:3.4rem; margin-bottom:0.1rem;-webkit-tap-highlight-color:rgba(0,0,0,0);}
  .list ul li img{width:100%; height:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}


  .main-body {
    /*height: 5rem;*/
    overflow: scroll;
  }

  .loadContainer {
    width: 100%;
    font-size: 0.24rem;
    text-align: center;
    padding: 0.5rem 0;
    background: #f5f5f5;
    color: #999;
    position: relative;
  }

  .loadText {
    width: 2.1rem;
    height: 1px;
    background: #ececec;
    position: absolute;
    left: 0.3rem;
    top: 50%;
  }

  .loadLine {
    width: 2.1rem;
    height: 1px;
    background: #ececec;
    position: absolute;
    right: 0.3rem;
    top: 50%;
  }

  .mint-loadmore-bottom {
    width: 100%;
    font-size: 0.26rem;
    text-align: center;
    padding: 0.1rem 0;
  }

  .mint-loadmore-bottom-img {
    width: 1rem;
  }
</style>

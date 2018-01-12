<template>
  <div>
    <div class="line_bold" onclick="ceshi()"></div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in cardBuyList" :key="index" class="clearfix"
            @click="index_click(item.name,index+1);link(item.countdownTime,item.id)">
          <div class="fl view">
            <img class="discount" v-if="item.discount"
                 :src='"../../assets/images/discount"+parseInt(item.discount)+".png"'>
            <img :src="item.image"/>
          </div>
          <div class="fl describe">
            <div class="title">
              <span>{{item.tagName}}</span>{{item.name}}
            </div>
            <br/>
            <div class="time">
              {{item.introduction}}
            </div>
            <br/>
            <div class="countDown fff" v-if="item.countdownTime&&time_post(item.countdownTime).countDownState">
              <!--{{'好啦'+JSON.stringify(time_post(item.countdownTime))}}-->
             <!--{{ var tt=time_post(item.countdownTime)}}-->
              {{"倒计时："+time_post(item.countdownTime).htmlHour+":"+time_post(item.countdownTime).minute+":"+time_post(item.countdownTime).seconds}}
              <!--{{ item.countdownTime}}-->
            </div>
            <br/>
            <div class="price">
              <span class="red">￥</span>{{item.sellPrice}}
              <span>￥{{item.marketPrice}}</span>
            </div>
          </div>
          <div class="button" :class="{time_return:item.countdownTime&&time_post(item.countdownTime).countDownState}">
            {{item.countdownTime&&time_post(item.countdownTime).countDownState?'即将开始':'立即订购'}}
          </div>
        </li>
      </ul>
    </div>
    <div class="No_items" v-if="noItemState">
      <img src="../../assets/images/No_items.png"><br>
      <span>暂无商品，敬请期待</span>
    </div>
  </div>
</template>

<script>

  import http from '@/http/http.js';
  import api from '@/assets/js/api.js';

  export default {
    name: "card-buy",
    data() {
      return {
        cardBuyList: [],
        //buttonText:'立即订购',
        noItemState: false,
        //htmlHour:'',
        //minute:'',
        // seconds:'',
        // countDownState:true,
        getServerDate: '',
        i:'',
        ii:''

      }
    },
    methods: {



      // 加载卡券购买列表
     loadCardList() {
        http({
          method: 'get',
          url: api.first + '?token=' + localStorage.token
        }).then((res) => {
            console.log(this.cardBuyList);
            this.cardBuyList = [...res.data.selfProductList];
            if (res.data.selfProductList.length == 0) {
              this.noItemState = true;
            }
            this.cardBuyList.push({
            discount: "",
            id: "112",
            image: "http://test1.doooly.com:8001/image/201712/c7a167a9-33d5-46e4-a572-7b65d111f6cc.jpg",
            introduction: "test",
            inventory: "",
            marketPrice: "4.00",
            name: "111测试",
            sellPrice: "6.00",
            state: 0,
            tagName: "婷婷",
            countdownTime: 1515061800000,
            currentTime: 1514957051602
          });
          this.cardBuyList.push({
            discount: "",
            id: "112",
            image: "http://test1.doooly.com:8001/image/201712/c7a167a9-33d5-46e4-a572-7b65d111f6cc.jpg",
            introduction: "test",
            inventory: "",
            marketPrice: "4.00",
            name: "222测试",
            sellPrice: "6.00",
            state: 0,
            tagName: "婷婷婷",
            countdownTime: 1515058129000,
            currentTime: 1514957051602
          });
          }
        )
      },
  //埋点统计
      index_click(val, index) {
        var sort = "首页中部";
        var operation = "卡券购买";
        var label = val + "(" + index + ")";
        umengClick(sort, operation, label, '', '');
      },
      //点击进入卡券详情
      link(countdownTime,id, link, ths) {
        //活动开始时间未到拦截
        if (countdownTime > this.getServerDate ) {
          this.$toast('活动尚未开始');
          return;
        }
        //
        // if(isWeiXin() || IsPC()){
        //   window.location.href=$("#base").val()+link;
        // }else{
        //   jsonObj={
        //     "jumpType":"InsideJump",
        //     "jumpUrl":$("#httpsBase").val()+link+'&token='+token
        //   };
        //   if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
        //     window.webkit.messageHandlers.gotoNativeJump.postMessage(JSON.stringify(jsonObj));
        //   } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
        //     RHNativeJS.gotoNativeJump(JSON.stringify(jsonObj));
        //   }
        // }

        this.$router.push({path: '/cardBuyDetail/' + id});
      },
      //计算当月最后一天
      daysBetween(DateOne, DateTwo) {
        var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
        var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
        var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
        var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
        var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
        var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
        var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
        return Math.abs(cha);
      },
      //时间戳转日期格式
      getLocal(nS) {
        return new Date(parseInt(nS)).toLocaleString().substr(0, 17)
      },
      //页面添加计时器setInterval("time_post(time)",1000),其实time格式为事件戳,然后自定义回调函数time_return(day,hour,minute,seconds);
      time_post(time) {
        if (time < 0 || time< this.getServerDate ) {
          return {countDownState: false};
        }
        else if (time >= 0) {
          console.log(12);
          console.log(this.getServerDate);
          console.log(time);
          // this.getServer();
        }
        if (this.getServerDate == NaN || this.getServerDate == "") {
          console.log(13);

          return {countDownState: false};
        }
        var data = new Date(this.getServerDate);
        //  var data = new Date();
        var strYear = data.getFullYear();//当前年
        var strMonth = data.getMonth() + 1;//当前月
        var strDate = data.getDate();//当前日
        var strHours = data.getHours();//当前小时
        var strMinute = data.getMinutes();//当前分
        var strSeconds = data.getSeconds();//当前秒
        var DateTwo = strYear + '-' + strMonth + '-' + strDate;

        var time_sjc = new Date(time * 1);//目标时间戳
        var time_data = time_sjc.getFullYear() + "-" + (time_sjc.getMonth() + 1) + "-" + time_sjc.getDate();
        var DateOne = time_data.substr(0, 10);
        var hour = time_sjc.getHours();//目标小时
        var minute = time_sjc.getMinutes();//目标分
        var seconds = time_sjc.getSeconds();//目标秒

        var nowDay = this.daysBetween(DateOne, DateTwo);//当前时间戳到目标时间天数
        var fate = nowDay * 24;//当前时间戳到目标时间小时数
        var nowHour = hour - strHours;
        var nowMinute = minute - strMinute;
        var nowSeconds = seconds - strSeconds;

        if (nowSeconds < 0) {
          nowMinute--;
          nowSeconds = nowSeconds + 60;
        }

        if (nowMinute < 0) {
          nowHour--;
          nowMinute = nowMinute + 60;
        }

        if (nowHour < 0) {
          nowDay--;
          nowHour = nowHour + 24;
        }
       // console.log(123);
        return this.time_return(nowDay, nowHour, nowMinute, nowSeconds);//回调函数
      },
      //事件回调函数模板(天，小时，分，秒)
      time_return(day, hour, minute, seconds) {
        if (day > 0) {
          var htmlHour = day * 24 + hour;
        } else {
          htmlHour = hour;
        }

        if (htmlHour < 10) {
          htmlHour = "0" + htmlHour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        if (seconds < 10 && seconds >= 0) {
          seconds = "0" + seconds;
        }

        //var html ="倒计时："+htmlHour+":"+minute+":"+seconds;

        if (htmlHour <= 0 && minute <= 0 && seconds <= 0) {
          return {countDownState: false}
        }
        else {
          return {
            countDownState: true,
            htmlHour: htmlHour,
            minute: minute,
            seconds: seconds
          }
        }
      },

      //获取服务器当前时间
      getServer() {

        http({
          url: api.getCurrentTime + '?token=' + localStorage.token,
          method: 'get'
        }).then((res) => {
          this.getServerDate = res.data.currentTime;
          console.log(666);
          console.log(res.data);
        })


      },

      //对当前时间加1s
      countDown() {
        this.getServerDate += 1000;

      }
    },
      created() {
        // document.title = '{groupShortName}专享-扫码优惠';
        // initTitle('${groupShortName}专享-扫码优惠');

        document.title = '消费卡卷';
        initTitle('消费卡卷');
        this.loadCardList();

      },
      mounted() {
        this.getServer();
        //this.i= setInterval(this.getServer,1000);
        this.ii= setInterval(this.countDown,1000);
      },
      beforeDestroy(){
      clearInterval(this.ii);
      }


  }
</script>

<style scoped>
  .line_bold {
    width: 100%;
    height: 0.2rem;
    background: #f5f5f5;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  ul {
    padding: 0 0.3rem;
    background: #fff;
  }

  ul li {
    padding: 0.3rem 0;
    position: relative;
    border-bottom: 1px solid #ececec;
    overflow: hidden;
  }

  ul li:last-child {
    border: 0;
  }

  ul li .view {
    width: 2rem;
    height: 2rem;
    margin-right: 0.3rem;
    position: relative;
  }

  ul li .view img {
    width: 100%;
    height: 100%;
  }

  ul li .view img.discount {
    position: absolute;
    left: 0;
    top: 0;
    width: 0.48rem;
    height: 0.56rem;
  }

  ul li .describe {
    font-size: 0;
  }

  ul li .describe div {
    display: inline-block;
    line-height: 100%;
  }

  ul li .describe .title {
    font-size: 0.32rem;
    color: #333;
    margin-top: 0.1rem;
  }

  ul li .describe .title span {
    display: inline-block;
    background: linear-gradient(to bottom right, #ee3f8b, #ee3f44);
    border-radius: 0.05rem;
    color: #fff;
    font-size: 0.24rem;
    padding: 0 0.05rem;
    margin-right: 0.1rem;
    vertical-align: top;
  }

  ul li .describe .time {
    font-size: 0.24rem;
    color: #999;
    margin-top: 0.24rem;
    min-height: 0.24rem;
  }

  ul li .describe .countDown {
    font-size: 0.24rem;
    color: #ee3f44;
    margin-top: 0.2rem;
    line-height: 0.36rem;
    height: 0.36rem;
    min-width: 1.94rem;
    background: #fdebec;
    text-align: center;
    border-radius: 0.05rem;
    padding: 0 0.14rem;
  }

  ul li .describe .countDown.fff {
    background: #fff;
  }

  ul li .describe .price {
    font-size: 0.4rem;
    color: #ee3f44;
    margin-top: 0.2rem;
  }

  ul li .describe .price span {
    display: inline-block;
    margin-left: 0.12rem;
    font-size: 0.24rem;
    color: #999;
    text-decoration: line-through;
  }

  ul li .describe .price span.red {
    margin: 0;
    color: #ee3f44;
    font-size: 0.28rem;
    text-decoration: none;
  }

  ul li .button {
    position: absolute;
    right: 0;
    top: 1.74rem;
    width: 1.36rem;
    line-height: 0.56rem;
    text-align: center;
    border: 1px solid #ee3f44;
    color: #ee3f44;
    border-radius: 0.1rem;
    font-size: 0.24rem;
  }

  ul li .button.time_return {
    color: #fff;
    background: #ccc;
    border-color: #ccc;
  }

  .No_items {
    /*display: none;*/
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -1.35rem;
    margin-top: -2rem;
    text-align: center;
    font-size: 0;
    width: 2.7rem;
  }

  .No_items img {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .No_items span {
    font-size: 0.28rem;
    color: #666;
  }
</style>

<template>
  <div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <ul>
        <li v-for="(item,index) in listdata" >{{item}}</li>
        <li v-for="(item,index) in downdata" >{{item}}</li>
      </ul>
    </v-scroll>
  </div>
</template>
<script>
  import Scroll from '@/components/common/scroll';
  import axios from 'axios';
  import http from '@/http/http.js'

  export default{
    data () {
      return {
        counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        num : 15,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: []  // 上拉更多的数据存放数组
      }
    },

    methods: {


      getList(){
         for(let i=0;i<11;i++) {
           this.listdata.push(i);
           console.log(i);
         }


      },
      onRefresh(){
        for(let i=11;i<21;i++) {
          this.listdata.push(i);
        }
      },
      onInfinite() {
        for(let i=21;i<33;i++) {
            this.downdata.push(i);
          }
      }
    },
    components : {
      'v-scroll': Scroll
    },
    created(){
      this.getList();
      console.log(this.listdata);
    }
  }
</script>

<template>
  <div>
    <header><img :src="headerImgSrc"/></header>
    <section class="logo_main">
      <form @focusin="focusinMethod" @focusout="focusoutMethod">
        <div id="log3">
          <article class="clearfix tel">
            <div class="index_div">
              <input type="tel" v-model="mobileNum3" class="form-control" maxlength="11"
                     name="loginMobile" placeholder="请输入手机号码">
            </div>
          </article>
          <article class="clearfix">
            <div class="index_div">
              <input type="tel" v-model="validCodeNum3" placeholder="请输入验证码" class="form-control" maxlength="6"
                     id="code"
                     name="code">
              <div class="code_btn_txt" id="hq" @click="getValidCode3" v-if="codeState3">获取验证码</div>
              <div class="code_btn_d" v-if="!codeState3">{{timeNum3}}s后重新获取</div>

            </div>
          </article>
          <div class="btn_div_d">
            <button @click="forgetPwdLogin" class="btn" :disabled="log1Disable3" type="button"
                    :class="classObject13">{{loginText3}}
            </button>
          </div>
        </div>


      </form>
      <div class="deal_div">
        <div class="fl"><a href="/reachtest/wechat/activation/getUserProtocol.jhtml">用户登录即代表同意<span>《用户协议》</span></a>
        </div>

      </div>
    </section>
  </div>
</template>

<script>

  import http from '@/http/http.js'
  import {MessageBox} from 'mint-ui';
  import Cookies from 'js-cookie';
  import api from '@/assets/js/api.js';

  export default {
    name: "reset-password",
    data() {

      return{
        headerImgSrc: 'http://test1.doooly.com/resources/wechat/images/staff_a/logo_header.jpg',
        mobileNum3: "",
        validCodeNum3: "",
        codeState3: true,
        loginText3: "登录",
        timeNum3: 11,
        isLoading3: false,

      }

    },
    computed: {
      log1Disable3: function () {
        if ((this.mobileNum3 == "" || this.validCodeNum3 == "") || this.isLoading3) {
          return true
        }
        else {
          return false
        }
      },
      //log3 登录样式控制
      classObject13: function () {
        if ((this.mobileNum3 != "" && this.validCodeNum3 != "") && !this.isLoading3) {
          return {
            dis_btn: false,
            click_btn: true
          }
        }
        else {
          return {
            dis_btn: true,
            click_btn: false
          }

        }

      }
    },

    methods:{

      focusinMethod() {
        this.headerImgSrc = 'http://test1.doooly.com/resources/wechat/images/staff_a/logo_header_small.jpg'
      },
      focusoutMethod() {
        this.headerImgSrc = 'http://test1.doooly.com/resources/wechat/images/staff_a/logo_header.jpg'
      },
      altNonentity() {
        MessageBox({
          title: '账号不存在',
          message: '此手机号未被激活，无法享受兜礼服务， 是否通过验证激活方式来激活会员账户',
          confirmButtonText: '激活',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then(({value, action}) => {
          this.mobileCall();
        });
      },
      getValidCode3(){
        if (this.checkForgetPwd() == false) {
          return false;
        }
        http({
          method: 'post',
          url: api.getvcodepc,
          data: {
            mobile: this.mobileNum3
          }
        }).then((res) => {
          //this.codeState3 = !this.codeState3;
          this.$toast(res.data.msg.content);
          if (res.data.code == 1001) {
            // if(this.timeNum!=60){
            //   this.codeState3 = false;
            // }
            this.timercode();


          }
          else {
            if (res.data.code == 1002) {
              this.altNonentity()
            }
            else {
              this.$toast(res.data.msg.content);
            }
          }


        }).catch((error) => {
          this.$toast("网络繁忙");

        })
      },
      timercode(){
       // this.codeState3 = !this.codeState3;
        let interval = setInterval(() => {
          if (this.timeNum3 >= 0 && this.timeNum3 < 12) {
            --this.timeNum3;
          }
          else if (this.timeNum3 == -1) {
            clearInterval(interval);
            this.timeNum3 = 11;
          }
          // else if(this.timeNum!=11 ) {
          //   this.codeState3 = false;
          // }
           if(this.timeNum!=11 ) {
            this.codeState3 = false;
          }
          if(this.timeNum=11){
            this.codeState3 = true;
          }
          }, 1000)
     //  this.codeState3 = true;
      },
      //忘记密码的登录方法
      forgetPwdLogin() {
        this.forgetPwdAndroid();
        if (this.checkForgetPwd() == false) {
          return false;
        }
        if (isNaN(this.validCodeNum3) || this.validCodeNum3.length != 6) {
          this.$toast("请输入正确的验证码");
          return false;
        }
        this.loginText3 = "登录中";
        this.isLoading3 = true;
        http({
          method: 'post',
          url: api.resetPwd,
          data: {
            mobile: this.mobileNum3,
            verifyCode: this.validCodeNum3
          }
        }).then((res) => {
          let token = res.data.token;
          if (res.data.code == 1000) {
            // let mobileVal = $('#loginMobile').val().trim();
            let successMsg = "你的兜礼账号密码已发送至对应手机号（" + this.mobileNum3 + "），请查收。"
            this.$toast(successMsg);
            let browserName = getBrowser();
            if (browserName == "WeChat") {
              //修改密码成功，登录并进入首页
              // location.href ="${base}/wechat/home/index.jhtml?address=";
              this.$router.push('home');
            }
            else if (browserName == "WebKit") {
              //判断iPhone|iPad|iPod|iOS
              //nativeUserInfomation(res.data.mess,"0",res.data.token);
              let str = res.data.userInfo;
              let userInfo = JSON.parse(str);
              let param = {"userInfo": userInfo.adUserConn, "type": "0", "token": token}
              window.webkit.messageHandlers.nativeUserInfomation.postMessage(param);

            }
            else if (browserName == "Chrome WebView") {
              //判断Android
              RHNativeJS.nativeUserInfomation(res.data.userInfo, "0", token);
            }
            else {
              // let token=res.data.token;
              localStorage.token = token;
              //alert("web");
              //location.href ="${base}/wechat/home/index.jhtml?address=&token="+token;
              this.$router.push({path: '/home/' + token});
            }
          } else if (res.data.code == 1003) {
            //账户未激活
            this.altNonentity();
          }
          else if (res.data.code == 1002) {
            // $('#pwd_btn').attr('disabled', false);
            // $("#pwd_btn").addClass("click_btn").removeClass("dis_btn");
            this.loginText3 = "登录";
            this.isLoading3 = false;
            this.$toast(res.data.msg.content);
          } else {
            // $('#pwd_btn').attr('disabled', false);
            // $("#pwd_btn").addClass("click_btn").removeClass("dis_btn");
            this.loginText3 = "登录";
            this.isLoading3 = false;
            this.$toast('系统繁忙');

          }
        }).catch((error) => {
          this.loginText3 = "登录";
          this.isLoading3 = false;
          this.$toast('系统繁忙');
        })


      },

      checkForgetPwd() {
        let re = /^1[3|4|5|7|8][0-9]{9}$/;
        if (this.mobileNum3 == "") {
          this.$toast("手机号不能为空");
          return false;
        }
        else if (!re.test(this.mobileNum3) || this.mobileNum3.length != 11) {
          this.$toast("手机号格式错误！");
          return false;
        }
        else {
          return true;
        }
      },



    },
    create(){
      let jsonObj = {
        "title": {"text": "忘记密码"},
        "leftButton": {"name": "return", "text": "返回", "func": "goLastPage()", "visable": "true"},
        "visable": "true"
      };
      let browserName = getBrowser();
      if (browserName == "WebKit") {
        window.webkit.messageHandlers.initPageTitle.postMessage(JSON.stringify(jsonObj));
        //  window.webkit.messageHandlers.getPhoneDeviceId.postMessage("phoneid");
      }
      else if (browserName == "Chrome WebView") {
        RHNativeJS.initPageTitle(JSON.stringify(jsonObj));
        RHNativeJS.hideWaitPanel();
        //   RHNativeJS.getPhoneDeviceId("phoneid");
        $('body').height($(window).height() + 150 + 'px');
        $('body').css('height', '110%');
      }
    }
  }
</script>

<style scoped>
  header img {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    vertical-align: middle;
    display: inline-block;
  }

  .logo_main {
    background: #fff;
    padding: 0 0.6rem;
  }

  .clearfix {
    zoom: 1;
  }

  .index_div {
    border: 0;
    border-bottom: 1px solid #ECECEC;
    margin-top: 0.4rem;
    float: left;
    height: 0.77rem;
    width: 100%;
  }

  .index_div .form-control {
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: 0.32rem;
    display: block;
    text-indent: 0.1rem;
    outline: none;
    border: 0;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .btn_div_d {
    margin-top: 0.4rem;
    background: #fff;
    color: #ee3f44;
    border: none;
    width: 100%;
    line-height: 0.82rem;
    font-size: 0.36rem;
    border-radius: 0 0 5px 5px;
  }

  .btn_div_d .btn {
    text-align: center;
    line-height: 0.82rem;
    width: 100%;
    height: 0.82rem;
    margin: 0 auto;
    border: 0;
    border-radius: 0.08rem;
    display: block;
    font-size: 0.32rem;
  }

  .btn_div_d .dis_btn {
    color: #f9c5c6;
    background: #f58c8f;
  }

  .btn_div_d .click_btn {
    color: #fff;
    background: #ee3f44;
  }

  .deal_div {
    margin-top: 0.3rem;
    font-size: 0.24rem;
    color: #999;
  }

  .disableCss {
    color: #333;
    text-decoration: none;
    background: #fff;
    font-size: 0.24rem;
    cursor: pointer;
  }

  .footer_fixed {
    margin: 0;
    position: fixed;
    background: #fff;
    width: 100%;
    bottom: 0.6rem;
    text-align: right;
  }

  .footer_fixed .btn_block {
    font-size: 0.28rem;
    background: #fff;
    color: #ee3f44;
    float: right;
    cursor: pointer;
  }

  .code_btn_txt {
    float: right;
    display: inline-block;
    margin: 0 !important;
    font-size: 0.28rem !important;
    color: #ee3f44 !important;
    background: #fff !important;
    margin-top: 0.2rem !important;
    width: 2rem !important;
    text-align: right;
    line-height: 0.3rem;
    height: 0.4rem !important;
    margin-right: 0.1rem !important;
    cursor: pointer;
  }

  .footer-wrapper {
    position: relative;
    z-index: 99999;
    line-height: 0.4rem;
    margin-right: 0.6rem;
  }

  #code {
    width: 3.6rem;
    float: left;
    display: inline-block;
  }

  .fl a {
    color: #999;
  }

  .fl span {
    color: #666;
    font-size: 0.24rem;
  }

  .code_btn_d {
    float: right;
    display: inline-block;
    margin: 0;
    font-size: 0.28rem;
    color: #999;
    background: #fff;
    margin-top: 0.2rem;
    width: 2rem;
    text-align: right;
  }


</style>

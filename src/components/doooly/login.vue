<template>
  <div>
    <header><img :src="headerImgSrc"/></header>
    <section class="logo_main">
      <form @focusin="focusinMethod" @focusout="focusoutMethod">
        <!--手机登录-->
        <div id="log1" v-if="mobileState">
          <article class="clearfix tel">
            <div class="index_div">
              <input type="tel" v-model="mobileNum" class="form-control" maxlength="11"
                     name="loginMobile" placeholder="请输入手机号码">
            </div>
          </article>
          <article class="clearfix">
            <div class="index_div">
              <input type="tel" v-model="validCodeNum" placeholder="请输入验证码" class="form-control" maxlength="6" id="code"
                     name="code">
              <div class="code_btn_txt" id="hq" @click="getValidCode" v-if="codeState">获取验证码</div>
              <div class="code_btn_d" v-if="!codeState">{{timeNum}}s后重新获取</div>
            </div>
          </article>
          <div class="btn_div_d">
            <button @click="mobileLogin" class="btn" :disabled="log1Disable" id="log1_dl" type="button"
                    :class="classObject1">{{loginText}}
            </button>
          </div>
        </div>
        <!--账号密码登录-->
        <div id="log2" v-if="accountState">
          <article class="clearfix man">
            <div class="index_div">
              <input type="tel" v-model="accountNum" maxlength="11" minlength="11" class="form-control" id="username"
                     name="username" placeholder="请输入账号">
            </div>
          </article>
          <article class="clearfix">
            <div class="index_div">
              <input v-model="passwordNum" class="passwordType form-control" maxlength="6" minlength="6" type="tel"
                     id="password" name="enPassword" placeholder="请输入密码">
            </div>
          </article>
          <div class="btn_div_d">
            <div @click="accountLogin" class="logo_btn btn" :disabled="log2Disable" id="log2_dl" :class="classObject2">
              {{this.loginText2}}
            </div>
          </div>
        </div>
      </form>
      <div class="deal_div">
        <div class="fl"><a href="/reachtest/wechat/activation/getUserProtocol.jhtml">用户登录即代表同意<span>《用户协议》</span></a>
        </div>
        <div class="fr">
          <div @click="forgetPwd" class="disableCss" id="btn_pwd" v-if="!mobileState">忘记密码？</div>
        </div>
      </div>
    </section>
    <footer class="footer_fixed">
      <div class="footer-wrapper" @click="changeLogin">
        <div class="btn_block" id="cardLoginDiv" v-if="mobileState">账号密码登录</div>
        <div class="btn_block" id="telLoginDiv" v-else>手机验证登录</div>
      </div>
    </footer>
  </div>
</template>

<script>
  import http from '@/http/http.js';
  import api from '@/assets/js/api.js';
  import {MessageBox} from 'mint-ui';
  import Cookies from 'js-cookie';


  export default {
    name: "login",
    data() {
      return {
        headerImgSrc: 'http://test1.doooly.com/resources/wechat/images/staff_a/logo_header.jpg',
        mobileState: true,
        mobileNum: "",
        accountNum: "",
        validCodeNum: "",
        passwordNum: "",
        codeState: true,
        timeNum: 60,
        loginText: "登录",
        loginText2: "登录",
        isLoading: false,
        isLoading2: false,
        accountState: false,
      }
    },
    computed: {
      // log1 登录状态控制
      log1Disable: function () {
        if ((this.mobileNum == "" || this.validCodeNum == "") || this.isLoading) {
          return true
        }
        else {
          return false
        }
      },
      //log2 登录状态控制
      log2Disable: function () {
        if ((this.accountNum == "" || this.passwordNum == "") || this.isLoading2) {
          return true
        }
        else {
          return false
        }
      },
      //log1 登录样式控制
      classObject1: function () {
        if ((this.mobileNum != "" && this.validCodeNum != "") && !this.isLoading) {
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
      },
      //log2 登录样式控制
      classObject2: function () {
        if (this.accountNum != "" && this.passwordNum != "" && !this.isLoading2) {
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
    methods: {
      //拨打电话
      mobileCall() {
        window.location.href = 'tel://400-158-2212';
      },
      //账号不存在
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
      //退出当前账户
      altQuit() {
        MessageBox('请退出当前账户');
      },
      //等待激活
      altAwaitActive(date) {
        MessageBox('等待激活', '您已经在' + date + '提交过申请，我们会在5个工作日内完成审核。如有疑问，您可以拨打客服电话400-158-2212(周一至周五, 9:00AM-18:00PM)');
      },
      //审核未通过
      altUnapprove() {
        MessageBox('提示', '很抱歉您自主申请的兜礼会员审核未通过，请与所在单位联系！');
      },
      //密码错误
      altPwdError() {
        MessageBox({
          title: '密码错误',
          message: '是否找回密码',
          confirmButtonText: '是',
          cancelButtonText: '否',
          showCancelButton: true
        });
      },
      //账号异常
      altAccountError() {
        MessageBox({
          title: '账号异常',
          message: '亲爱的会员，您的账号存在异常，请拨打客服电话“400-158-2212”进行处理 (周一至周五, 9:00AM-6:00PM)',
          confirmButtonText: '立即拨打',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then(({value, action}) => {
          this.mobileCall();
        });
      },
      //各种异常处理
      altAllError() {
        MessageBox({
          title: '提示',
          message: '亲爱的会员，您的账号存在异常，请拨打客服电话“400-158-2212”进行处理 (周一至周五, 9:00AM-6:00PM)',
          confirmButtonText: '立即拨打',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then(({value, action}) => {
          this.mobileCall();
        })
      },
      // 改变登录方式
      changeLogin() {
        this.mobileState = !this.mobileState;
        this.accountState = !this.accountState;
      },
      focusinMethod() {
        this.headerImgSrc = 'http://test1.doooly.com/resources/wechat/images/staff_a/logo_header_small.jpg'
      },
      focusoutMethod() {
        this.headerImgSrc = 'http://test1.doooly.com/resources/wechat/images/staff_a/logo_header.jpg'
      },
      checkMobile() {
        let re = /^1[3|4|5|7|8][0-9]{9}$/;
        if (this.mobileNum == "") {
          this.$toast("手机号不能为空");
          return false;
        }
        else if (!re.test(this.mobileNum) || this.mobileNum.length != 11) {
          this.$toast("手机号格式错误！");
          return false;
        }
        else {
          return true;
        }
      },
      checkAccout() {
        let re = /^1[3|4|5|7|8][0-9]{9}$/;
        if (this.accountNum == "") {
          this.$toast("账号不能为空");
          return false;
        }
        else if (!re.test(this.accountNum) || this.accountNum.length != 11) {
          this.$toast("手机号格式错误！");
          return false;
        }
        else {
          return true;
        }
      },
      // 60s倒计时
      timingCode() {
        let interval = setInterval(() => {
          if (this.timeNum > 0 && this.timeNum < 61) {
            this.codeState = false;
            this.timeNum--;
          }
          else if (this.timeNum == 0) {
            this.codeState = true;
            clearInterval(interval);
            this.timeNum = 60;
          }
        }, 1000)
      },
      // 获取验证码
      getValidCode() {
        if (this.checkMobile() == false) {
          return false;
        }
        http({
          method: 'post',
          url: api.checkMobile,
          data: {
            mobile: this.mobileNum
          }
        }).then(
          (res) => {
            if (res.data.code == "1000") {
              http({
                method: 'post',
                url: api.getLoginVCode,
                data: {
                  mobile: this.mobileNum
                }
              }).then(
                (res) => {
                  this.$toast(res.data.msg.content);
                  if (res.data.code == 1001 || res.data.code == 1006) {
                    this.timingCode();
                  }
                }
              ).catch((error) => {
                this.$toast("服务器异常");
              })
            }
            else {
              if (res.data.code == "1010") {
                this.altAwaitActive(res.data.date);
              }
              else if (res.data.code == "1011") {
                this.altUnapprove();
              }
              else if (res.data.code == "1004") {
                this.altNonentity();
              }
              else if (res.data.code == "1003") {
                this.altQuit()
              }
              else if (res.data.code == "1008") {
                MessageBox({
                  title: '提示',
                  message: '验证码错误',
                  showCancelButton: true
                });
              }
              else {
                this.altAllError();
              }
            }
          }
        ).catch((error) => {
            this.$toast("服务器异常");
            console.log(error)
          }
        )
      },
      //手机号登录
      mobileLogin() {
        if (this.checkMobile() == false) {
          return false;
        }
        if (isNaN(this.validCodeNum) || this.validCodeNum.length != 6) {
          this.$toast("请输入正确的验证码");
          return false;
        }
        this.loginText = "登录中";
        this.isLoading = true;
        http({
          method: 'post',
          url: api.checkcode,
          data: {
            mobile: this.mobileNum,
            code: this.validCodeNum
          }
        }).then(
          (res) => {
            if (res.data.code == 1001) {
              http({
                method: 'post',
                url: api.telLogin,
                data: {
                  mobile: this.mobileNum
                }
              }).then(
                (res) => {

                  if(res.data.token){
                    var token=res.data.token;
                    localStorage.token = token;
                  }
                  else{
                    var token;
                  }
                 // let browserName = getBrowser();
                  if (res.data.code == "1000") {
                    if (browserName == "WeChat") {
                      //this.$router.push('home');
                      this.$router.push({path: '/nav/home/' + token})
                    }
                    else if (browserName == "WebKit") {

                      var str = res.data.userInfo;
                      var userInfo = JSON.parse(str);
                      var params = {"userInfo": userInfo.adUserConn, "type": "0", "token": token};
                      window.webkit.messageHandlers.nativeUserInfomation.postMessage(params);
                    }
                    else if (browserName == "Chrome WebView") {
                      RHNativeJS.nativeUserInfomation(res.data.userInfo, "0", token);
                    }
                    else {
                      // var token=loginData.token;
                     // localStorage.token = token;
                      // [#if redirectUrl??]
                      // location.href = "${redirectUrl}?token="+token;
                      // [#else]
                      // //location.href = "${base}/wechat/receiveGift/comredbag.jhtml";
                      // location.href ="${base}/wechat/home/index.jhtml?address=&token="+token;
                      // [/#if]
                     // this.$router.push({path: '/home/' + token})
                     // this.$router.push({path: '/home'})
                      this.$router.push({path: '/nav/home/' + token})
                    }
                  }
                  else {
                    if (res.data.code == "1004") {
                      this.altNonentity();
                    }
                    else if (res.data.code == "1003") {
                      this.altQuit();
                    }
                    else if (res.data.code == "1006") {

                      if (browserName == "WeChat") {
                        var timestamp = Date.parse(new Date());
                        if (timestamp < 1510416000000) {
                          // [#if redirectUrl??]
                          // location.href = "${redirectUrl}";
                          // [#else]
                          // location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml";
                          // //location.href ="${base}/doooly/home/index.jhtml?address=";
                          // [/#if]
                          alert('请更新个人信息！1')
                          if (Cookies.get('redirectUrl')) {
                            this.$router.push({path: 'redirectUrl'})
                          }
                          else {
                            this.$router.push('improvePersonalData');
                          }
                        } else {
                          //location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml";
                          this.$router.push('improvePersonalData');
                          alert('请更新个人信息！2')
                        }
                      }
                      else if (browserName == "WebKit") {
                        var str = res.data.userInfo;
                        var userInfo = JSON.parse(str);
                        var params = {"userInfo": userInfo.adUserConn, "type": "1", "token": token}
                        window.webkit.messageHandlers.nativeUserInfomation.postMessage(params);
                        //window.webkit.messageHandlers.nativeUserInfomation.postMessage(res.data.userInfo,"1", res.data.token);
                        //nativeUserInfomation(res.data.mess,"1", res.data.token);
                      }
                      else if (browserName == "Chrome WebView") {
                        RHNativeJS.nativeUserInfomation(res.data.userInfo, "1", token);
                      }
                      else {
                        //localStorage.token = token;
                        // [#if redirectUrl??]
                        // location.href = "${redirectUrl}?token="+token;
                        // [#else]
                        // location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml?token="+token;
                        // [/#if]
                        alert("请更新个人信息！3")
                      }
                    }
                    else if (res.data.code == "1010") {
                      this.altAwaitActive(res.data.date);
                    } else if (res.data.code == "1011") {
                      this.altUnapprove();
                    }
                    else if (res.data.code == "1008") {
                      this.altPwdError();
                    }
                    else {
                      this.altAccountError();
                    }
                    this.loginText = "登录";
                    this.isLoading = false;
                  }
                }).catch((error) => {
                  console.log(error)
                }
              )
            }
            else {
              this.loginText = "登录";
              this.isLoading = false;
              this.$toast(res.data.msg.content);
            }
          }).catch((error) => {
          //console.log(error);
          this.loginText = "登录";
          this.isLoading = false;
          this.$toast("服务异常，请稍后再试");
        })
      },
      //卡号登录
      accountLogin() {
        if (this.checkAccout() == false) {
          return false;
        }
        else if (isNaN(this.passwordNum) || this.passwordNum.length != 6) {
          this.$toast("请输入正确的密码");
          return false;
        }
        this.loginText2 = "登录中";
        this.isLoading2 = true;
        let rsaKey = new RSAKey();
        http({
          method: 'get',
          url: api.public_key,
          // data: {
          //   mobile: this.accountNum,
          //   code:enPassword
          // }
        }).then((res) => {
          rsaKey.setPublic(b64tohex(res.data.modulus), b64tohex(res.data.exponent));
          let enPassword = hex2b64(rsaKey.encrypt(this.passwordNum));
          http({
            method: 'post',
            url: api.submit1,
            data: {
              username: this.accountNum,
              enPassword: enPassword
            }
          }).then((res) => {
           // let browserName = getBrowser();
            if(res.data.token){
              var token=res.data.token;
              localStorage.token = token;
            }
            else{
              var token;
            }


            if (res.data.code == "1000") {
              if (browserName == "WeChat") {
                // [#if redirectUrl??]
                // location.href = "${redirectUrl}";
                // [#else]
                // location.href ="${base}/wechat/home/index.jhtml?address=";
                // [/#if]
                if (Cookies.get('redirectUrl')) {
                  this.$router.push({path: 'redirectUrl'})
                }
                else {
                  //this.$router.push('home');
                  this.$router.push({path: '/nav/home/' + token});
                }
              }
              else if (browserName == "WebKit") {
                //判断iPhone|iPad|iPod|iOS
                var str = res.data.userInfo;
                var userInfo = JSON.parse(str);
                var param = {"userInfo": userInfo.adUserConn, "type": "0", "token": token}
                window.webkit.res.dataHandlers.nativeUserInfomation.postres.data(param);
              }
              else if (browserName == "Chrome WebView") {
                //判断Android
                RHNativeJS.nativeUserInfomation(res.data.userInfo, "0", token);
              }
              else {
                // var token=res.data.token;
                //  localStorage.token = token;
                //  [#if redirectUrl??]
                //  location.href = "${redirectUrl}?token="+token;
                //  [#else]
                //  location.href ="${base}/wechat/home/index.jhtml?address=&token="+token;
                //  [/#if]
                // this.$router.push({path: '/home'})
                this.$router.push({path: '/nav/home/' + token});
              }
            }
            else {
              //用户信息不存在，提示是否去激活
              if (res.data.code == "1004") {
                this.altNonentity();
              }
              else if (res.data.code == "1003") {
                this.altQuit();
              }
              else if (res.data.code == "1006") {
                if (browserName == "WeChat") {
                  var timestamp = Date.parse(new Date());
                  if (timestamp < 1510416000000) {
                    // [#if redirectUrl??]
                    // location.href = "${redirectUrl}";
                    // [#else]
                    // location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml";
                    //
                    // [/#if]
                    if (Cookies.get('redirectUrl')) {
                      this.$router.push({path: 'redirectUrl'});
                    }
                    else {
                      this.$router.push('improvePersonalData');
                    }
                    // alert("更新个人资料11")
                  } else {
                    // location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml";
                    //alert("更新个人资料22");
                    this.$router.push('improvePersonalData');
                  }
                }
                else if (browserName == "WebKit") {
                  var str = res.data.userInfo;
                  var userInfo = JSON.parse(str);
                  var params = {"userInfo": userInfo.adUserConn, "type": "1", "token": token}
                  window.webkit.res.dataHandlers.nativeUserInfomation.postres.data(params);
                }
                else if (browserName == "Chrome WebView") {
                  RHNativeJS.nativeUserInfomation(res.data.userInfo, "1", token);
                }
                else {
                  // var token=res.data.token;
                  // localStorage.token = token;
                  // [#if redirectUrl??]
                  // location.href = "${redirectUrl}?token="+token;
                  // [#else]
                  // location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml?token="+token;
                  // [/#if]
                  alert("improvePersonalData");
                }
              }
              else if (res.data.code == "1010") {
                this.altAwaitActive(res.data.date);
              }
              else if (res.data.code == "1011") {
                this.altUnapprove();
              }
              else if (res.data.code == "1008") {
                this.altPwdError();
              }
              else {
                this.altAccountError();
              }
              this.loginText2 = "登录";
              this.isLoading2 = false;
            }
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
          this.loginText2 = "登录";
          this.isLoading2 = false;
        })
      },
      //点击忘记密码执行的函数
      forgetPwd() {
        this.$router.push('resetPassword');
      },

      appInit(){
        if(browserName=="WebKit"){
          window.webkit.messageHandlers.getPhoneDeviceId.postMessage("phoneid");
        }
        else if(browserName=="Chrome WebView"){
          RHNativeJS.hideWaitPanel();
          RHNativeJS.getPhoneDeviceId("phoneid");
          $('body').css('height', '120%');
        }

      }
    },
    created(){
      document.title = '会员登录';
      initTitle('会员登录');
      this.appInit();

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

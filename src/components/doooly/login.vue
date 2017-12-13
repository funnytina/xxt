<template>
  <div>
    <header><img :src="headerImgSrc"/></header>


    <section class="logo_main">
      <form @focusin="focusinMethod" @focusout="focusoutMethod">
        <div id="log1" v-if="mobileState">
          <article class="clearfix tel">
            <div class="index_div">
              <input type="tel" v-model="mobileNum" class="form-control" maxlength="11" id="loginMobile"
                     name="loginMobile" placeholder="请输入手机号码">
            </div>
          </article>
          <article class="clearfix">
            <div class="index_div">
              <input type="tel" v-model="validCodeNum" placeholder="请输入验证码" class="form-control" maxlength="6" id="code"
                     name="code">
              <div class="code_btn_txt" id="hq" @click="getValidCode" v-if="codeState">获取验证码</div>
              <!-- <div class="code_btn_txt" id="hq" v-if="codeState">获取验证码</div> -->
              <div class="code_btn_d" v-if="!codeState">{{timeNum}}s后重新获取</div>

            </div>
          </article>
          <div class="btn_div_d">
            <button @click="mobileLogin" class="btn" :disabled="log1Disable" id="log1_dl" type="button"
                    :class="classObject1">{{loginText}}
            </button>
          </div>
        </div>
        <div id="log2" v-if="!mobileState">
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
            <div @click="accountLogin" class="logo_btn btn" :disabled="log2Disable" id="log2_dl" :class="classObject2">{{this.loginText2}}
            </div>
          </div>
        </div>
      </form>
      <div class="deal_div">
        <div class="fl"><a href="/reachtest/wechat/activation/getUserProtocol.jhtml">用户登录即代表同意<span>《用户协议》</span></a>
        </div>
        <div class="fr">
          <div class="disableCss" id="btn_pwd" v-if="!mobileState">忘记密码？</div>
        </div>
      </div>
    </section>

    <footer class="footer_fixed">
      <div class="footer-wrapper" @click="changeLogin">
        <div class="btn_block" id="cardLoginDiv" v-if="mobileState">账号密码登录</div>
        <div class="btn_block" id="telLoginDiv" v-else>手机验证登录</div>
      </div>
    </footer>


    <!-- 弹出框 start -->
    <div class="coverBg"></div>
    <!-- 账号不存在 start -->
    <div class="alt_nonentity" style="padding-bottom:0;">
      <div class="alt_title">账号不存在</div>
      <div class="model_con">此手机号未被激活，无法享受兜礼服务， 是否通过验证激活方式来激活会员账户</div>
      <div class="model_btn_div">
        <button type="button" onclick="cancelBtn()" class="cancel">取消</button>
        <button type="button" onclick="confirmBtn()" class="active">激活</button>
      </div>
    </div>
    <!-- 提示信息 start -->
    <div class="alt_tate" style="padding-bottom:0;">
      <div class="alt_title">提示</div>
      <div class="model_con" id="model_msg"></div>
      <div class="model_btn_div">
        <button type="button" onclick="cancelBtn()" class="btn_bottom">确定</button>
      </div>
    </div>
    <!-- 弹出框 end -->
    <!-- 提交成功 start -->
    <div class="alt_succeed" style="padding-bottom:0;">
      <div class="alt_title">等待激活</div>
      <div class="model_con" id="model_msg_s"></div>
      <div class="model_btn_div">
        <button type="button" onclick="cancelBtn()" class="btn_bottom">确定</button>
      </div>
    </div>
    <!-- 提交成功 end -->
    <!-- 密码错误 start -->
    <div class="alt1">
      <div class="alt_title">密码错误</div>
      <p>是否找回密码</p>
      <div class="btn_div">
        <input type="button" class="cancel" value="否" onclick="cancelBtn()"/>
        <input type="button" class="active" value="是" onclick="confirmFindPSW()"/>
      </div>
    </div>
    <!-- 账号异常 start -->
    <div class="alt2">
      <p>亲爱的会员，您的账号存在异常，请拨打客服电话“400-158-2212”进行处理 (周一至周五, 9:00AM-6:00PM)</p>
      <div class="btn_div">
        <input type="button" class="cancel" value="取消" onclick="cancelBtn()"/>
        <input type="button" class="appDial active" value="立即拨打" onclick="dialPhone()"/>
        <a class="dial active" href="tel:4001582212">立即拨打</a>
      </div>
    </div>
    <div class="alt3">
      <p>请退出当前账户</p>
      <div class="btn_div">
        <input type="button" class="active" value="确定" onclick="cancelBtn()"/>
      </div>
    </div>


  </div>
</template>

<script>

  // import {checkmobile} from '@/assets/js/checkIdentityAndMobile';
  import http from '@/http/http.js'
  import { MessageBox } from 'mint-ui';

  export default {
    name: "login",
    data() {
      return {
        headerImgSrc: 'http://test1.doooly.com/resources/wechat/images/staff_a/logo_header.jpg',
        mobileState: true,
        // log1Disable:true,
        // log2Disable:true,
        mobileNum: "",
        accountNum: "",
        validCodeNum: "",
        passwordNum: "",
        // classObject1: {
        //   dis_btn: true,
        //   click_btn: false
        // },
        // classObject2: {
        //   dis_btn: true,
        //   click_btn: false
        // }
        codeState: true,
        //     disableRegainCode:true,
        timeNum: 60,
        loginText: "登录",
        loginText2:"登录",
        isLoading: false,
        isLoading2: false,
      }
    },
    computed: {

      log1Disable: function () {
        if ((this.mobileNum == "" || this.validCodeNum == "") || this.isLoading) {
          //
          // console.log(111111111);
          return true
        }
        else {
          return false
        }
      },
      log2Disable: function () {
        if ((this.accountNum == "" || this.passwordNum == "") || this.isLoading2) {
          return true
        }
        else {
          return false
        }
      },
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

      //账号不存在
      altNonentity(){
        MessageBox({
          title: '账号不存在',
          message: '此手机号未被激活，无法享受兜礼服务， 是否通过验证激活方式来激活会员账户',
          confirmButtonText: '激活',
          cancelButtonText: '取消',
          showCancelButton: true
        });
      },
      //退出当前账户
      altQuit(){
        MessageBox('请退出当前账户');
      },

      //等待激活
      altAwaitActive(date){
        MessageBox('等待激活', '您已经在'+date+'提交过申请，我们会在5个工作日内完成审核。如有疑问，您可以拨打客服电话400-158-2212(周一至周五, 9:00AM-18:00PM)');
      },

      //审核未通过
      altUnapprove(){
        MessageBox('提示','很抱歉您自主申请的兜礼会员审核未通过，请与所在单位联系！');
      },

      //密码错误
      altPwdError(){
        MessageBox({
          title: '密码错误',
          message: '是否找回密码',
          confirmButtonText:'是',
          cancelButtonText: '否',
          showCancelButton: true
        });
      },

      //账号异常
      altAccountError(){
        MessageBox({
          title: '账号异常',
          message: '亲爱的会员，您的账号存在异常，请拨打客服电话“400-158-2212”进行处理 (周一至周五, 9:00AM-6:00PM)',
          confirmButtonText:'立即拨打',
          cancelButtonText: '取消',
          showCancelButton: true
        });
      },
      //各种异常处理
      altAllError(){
        MessageBox({
          title: '提示',
          message: '亲爱的会员，您的账号存在异常，请拨打客服电话“400-158-2212”进行处理 (周一至周五, 9:00AM-6:00PM)',
          confirmButtonText: '立即拨打',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then(({ value, action }) => {
          console.log(value)
        });
      },


      changeLogin() {

        this.mobileState = !this.mobileState

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


          //alert("手机号格式错误！");
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


          //alert("手机号格式错误！");
          this.$toast("手机号格式错误！");
          return false;
        }
        else {

          return true;
        }

      },
      timingCode() {

        var interval = setInterval(() => {
          // console.log(this.timeNum)


          if (this.timeNum > 0 && this.timeNum <= 60) {
            this.timeNum--;
          }
          else if (this.timeNum == 0) {
            clearInterval(interval);
            this.codeState = !this.codeState;
            this.timeNum = 60;
          }
        }, 1000)
      },
      // var interval = setInterval(function() {
      //   node.text(num+"s后重新获取");
      //   --num;
      //   if (num == 0) {
      //     clearInterval(interval);
      //     $("#hq").addClass("code_btn_txt").removeClass("code_btn_d");
      //     node.text('获取验证码');
      //     $('#hq').attr('disabled', false);
      //     xnum = 0;
      //   }
      // }, 1000);

      getValidCode() {
        if (this.checkMobile() == false) {
          return false;
        }
        else {
          //console.log(this.checkMobile())
          //this.codeState = !this.codeState;
          //this.timingCode();
          http({
            method: 'post',
            url: '/reachtest/doooly/login/checkMobile.jhtml',
            data: {
              mobile: this.mobileNum
            }
          }).then(
            (res) => {
            //  console.log(11111111111111)
           //   console.log(res)

              if (res.data.code == "1000") {
                this.codeState = !this.codeState;

                http({
                  method: 'post',
                  url: '/reachtest/wechat/register/getLoginVCode.jhtml',
                  data: {
                    mobile: this.mobileNum
                  }
                }).then(
                  (res) => {
                    this.$toast(res.data.msg.content);
                    if (res.data.code == 1001 || res.data.code == 1006) {
                      this.timingCode();

                    }


                   // console.log(res.data);
                   // console.log(3333333333)
                  }
                ).catch((error) => {
                 // console.log(44444444444)
                 // console.log(res.data)
                  this.$toast("服务器异常");
                })


              }
              else {
                 if(res.data.code == "1010"){
                   // MessageBox({
                   //   title: '等待激活',
                   //   message: '您已经在'+data.date+'提交过申请，我们会在5个工作日内完成审核。如有疑问，您可以拨打客服电话400-158-2212(周一至周五, 9:00AM-18:00PM)',
                   //   showCancelButton: true
                   // });
                   this.altAwaitActive(res.data.date);
                 }
                 else if(res.data.code == "1011"){
                   // MessageBox({
                   //   title: '提示',
                   //   message: '很抱歉您自主申请的兜礼会员审核未通过，请与所在单位联系！',
                   //   showCancelButton: true
                   // });
                   this.altUnapprove();
                 }
                 else if (res.data.code == "1004") {
                   this.altNonentity();
                 }
                 else if(res.data.code == "1003"){
                   // MessageBox({
                   //   title: '提示',
                   //   message: '请退出当前账户',
                   //   showCancelButton: true
                   // });
                   this.altQuit()
                 }
                 else if(res.data.code == "1008"){
                   MessageBox({
                     title: '提示',
                     message: '验证码错误',
                     showCancelButton: true
                   });
                 }
                 else{
                   this.altAllError();
                 }

              }

            }
          ).catch((error) => {
              this.$toast("服务器异常");
              console.log(66666666666)
            console.log(error)
            }
          );
        }


      },
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
        console.log(333333333333)
        http({
          method: 'post',
          url: '/reachtest/wechat/register/checkcode.jhtml',
          data: {
            mobile: this.mobileNum,
            code:this.validCodeNum
          }
        }).then(
          (res) => {
            if (res.data.code == 1001) {

              http({
                method: 'post',
                url: '/reachtest/wechat/login/telLogin.jhtml',
                data: {
                  mobile: this.mobileNum
                }
              }).then(
                (res) => {
                 console.log(999);
                //console.log(res);
                  //var browserName=getBrowser();
                  //console.log(browserName)
                  let parser = new UAParser();
                  let browserName=parser.getBrowser();
                  console.log(browserName)

                  let token=res.data.token;

                  if (res.data.code == "1000") {


                    if (browserName == "WeChat") {
                      this.$router.push('home')


                    }
                    else if(browserName=="WebKit"){
                      var str=res.data.userInfo;
                      var userInfo=JSON.parse(str);
                      var params={"userInfo":userInfo.adUserConn,"type":"0","token":token}
                      window.webkit.messageHandlers.nativeUserInfomation.postMessage(params);
                      //nativeUserInfomation(loginData.userInfo,"0", loginData.token);
                    }
                    else if(browserName=="Chrome WebView"){
                      RHNativeJS.nativeUserInfomation(res.data.userInfo,"0",token);
                    }
                    else{
                     // var token=loginData.token;
                      localStorage.token = token;
                      // [#if redirectUrl??]
                      // location.href = "${redirectUrl}?token="+token;
                      // [#else]
                      // //location.href = "${base}/wechat/receiveGift/comredbag.jhtml";
                      // location.href ="${base}/wechat/home/index.jhtml?address=&token="+token;
                      // [/#if]

                      this.$router.push({path:'/home/'+token})
                    }

                  }
                }).catch((error) => {
                  console.log(error)
                }
              )

            }
            else{
              if (res.data.code == "1004") {
                this.altNonentity();
              }
              else if(res.data.code == "1003"){
              this.altQuit();
              }
              else if(res.data.code == "1006"){
                if(browserName=="WeChat"){
                  var timestamp = Date.parse(new Date());
                  if(timestamp < 1510416000000){
                    // [#if redirectUrl??]
                    // location.href = "${redirectUrl}";
                    // [#else]
                    // location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml";
                    // //location.href ="${base}/doooly/home/index.jhtml?address=";
                    // [/#if]
                      alert('请更新个人信息！1')

                  }else{
                    //location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml";
                    alert('请更新个人信息！2')
                  }
                }
                else if(browserName=="WebKit"){
                  var str=res.data.userInfo;
                  var userInfo=  JSON.parse(str);
                  var params={"userInfo":userInfo.adUserConn,"type":"1","token":token}
                  window.webkit.messageHandlers.nativeUserInfomation.postMessage(params);
                  //window.webkit.messageHandlers.nativeUserInfomation.postMessage(res.data.userInfo,"1", res.data.token);
                  //nativeUserInfomation(res.data.mess,"1", res.data.token);
                }
                else if(browserName=="Chrome WebView"){
                  RHNativeJS.nativeUserInfomation(res.data.userInfo,"1",token);
                }
                else{

                  //localStorage.token = token;
                  // [#if redirectUrl??]
                  // location.href = "${redirectUrl}?token="+token;
                  // [#else]
                  // location.href ="${base}/wechat/myaccount/improvePersonalData.jhtml?token="+token;
                  // [/#if]
                  alert("请更新个人信息！3")
                }
              }
              else if(res.data.code == "1010"){
                this.altAwaitActive(res.data.date);
              }else if(res.data.code == "1011"){
                this.altUnapprove();
              }
              else if(res.data.code == "1008"){
                this.altPwdError();
              }
              else{
                this.altAccountError();
              }

            }


          }).catch((error) => {
            console.log(error)
          })



      },
      accountLogin(){
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
       // console.log(rsaKey);


        http({
          method: 'get',
          url: '/reachtest/wechat/common/public_key.jhtml',
          // data: {
          //   mobile: this.accountNum,
          //   code:enPassword
          // }
        }).then((res)=>{
          rsaKey.setPublic(b64tohex(res.data.modulus),b64tohex(res.data.exponent));
          let enPassword = hex2b64(rsaKey.encrypt(this.passwordNum));
          console.log(enPassword);

          http({
            method: 'post',
            url: '/reachtest/wechat/login/submit.jhtml',
            data: {
              username: this.accountNum,
              enPassword:enPassword
            }
          }).then((res)=>{
            console.log(res.data);
            console.log(10101010);
            let parser = new UAParser();
            let browserName=parser.getBrowser();
            let token=res.data.token;

            if (res.data.code == "1000") {
              if(browserName=="WeChat"){
                // [#if redirectUrl??]
                // location.href = "${redirectUrl}";
                // [#else]
                // location.href ="${base}/wechat/home/index.jhtml?address=";
                // [/#if]
              }
              else if(browserName=="WebKit"){
                //判断iPhone|iPad|iPod|iOS
                var str=res.data.userInfo;
                var userInfo=  JSON.parse(str);
                var param={"userInfo":userInfo.adUserConn,"type":"0","token":token}
                window.webkit.res.dataHandlers.nativeUserInfomation.postres.data(param);
              }
              else if(browserName=="Chrome WebView"){
                //判断Android
                RHNativeJS.nativeUserInfomation(res.data.userInfo,"0",token);
              }
              else{
               // var token=res.data.token;
               //  localStorage.token = token;
               //  [#if redirectUrl??]
               //  location.href = "${redirectUrl}?token="+token;
               //  [#else]
               //  location.href ="${base}/wechat/home/index.jhtml?address=&token="+token;
               //  [/#if]
                this.$router.push({path:'/home/'+token})
              }
            }












          }).catch((error) => {
            console.log(error)
          })

        }).catch((error) => {
          console.log(error)
        })


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

  .coverBg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    display: none;
  }

  .alt, .alt1, .alt2, .alt3 {
    position: absolute;
    width: 6rem;
    min-height: 3rem;
    left: 10%;
    top: 30%;
    background: #fff;
    border-radius: 0.2rem;
    display: none;
    z-index: 100000;
    padding-bottom: 0.2rem;
  }

  .alt_title {
    font-size: 0.32rem;
    padding-bottom: 0.2rem;
    width: 100%;
    text-align: center;
    background: #fff !important;
    margin-top: 0.5rem;
    font-weight: bold
  }

  .alt p, .alt1 p {
    font-size: 0.28rem;
    text-align: center;
    width: 4.9rem;
    margin: 0 auto;
    color: #323232;
    text-indent: 0 !important;
  }

  .alt2 p, .alt3 p {
    font-size: 0.28rem;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    margin-top: 0.5rem;
    color: #323232;
    text-indent: 0 !important;
  }

  .btn_div {
    width: 100%;
    text-align: center;
    background: #fff !important;
    margin-top: 0.5rem;
    padding: 0;
  }

  .alt input, .alt1 input, .alt2 input, .alt3 input {
    line-height: 0.5rem;
    width: 1.6rem;
    text-align: center;
    border-radius: 0.1rem;
    font-size: 0.24rem;
    color: #fff;
    border: 0
  }

  .dial {
    display: inline-block;
    width: 1.6rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.1rem;
    font-size: 0.24rem;
    color: #fff;
  }

  .active {
    background: #ee3f43;
  }

  .cancel {
    background: #868686;
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

  .btn_div_d .dis_btn {
    text-align: center;
    line-height: 0.82rem;
    width: 100%;
    height: 0.82rem;
    margin: 0 auto;
    border: 0;
    background: #f58c8f;
    display: block;
    font-size: 0.32rem;
    color: #f9c5c6;
  }

  .btn_div_d .click_btn {
    text-align: center;
    line-height: 0.82rem;
    width: 100%;
    height: 0.82rem;
    margin: 0 auto;
    border: 0;
    background: #ee3f44;
    display: block;
    font-size: 0.32rem;
    color: #fff;
  }

  .deal_div {
    margin-top: 0.3rem;
    font-size: 0.24rem;
    color: #999;
  }

  .footer_fixed .btn_block {
    font-size: 0.28rem;
    background: #fff;
    color: #ee3f44;
    float: right;
    cursor: pointer;
  }

  .model_btn_div {
    width: 100%;
    display: block;
    border-top: 1px solid #ececec;
    height: 1rem;
    line-height: 1rem;
    margin-top: 0.3rem;
    border-radius: 0 0 5px 5px;
  }

  .model_btn_div .cancel, .model_btn_div .active {
    float: left;
    display: inline-block;
    width: 49.9%;
    background: #fff;
    line-height: 1rem;
    font-size: 0.32rem;
    text-align: center;
  }

  .model_btn_div .cancel {
    color: #333;
    border-right: 1px solid #ececec;
    border-radius: 0 0 0 0.2rem;
  }

  .model_btn_div .active {
    color: #ee3f44;
    border-radius: 0 0 0.2rem 0;
  }

  .result {
    position: absolute;
    width: 6rem;
    min-height: 3rem;
    left: 10%;
    top: 30%;
    background: #fff;
    border-radius: 0.2rem;
    display: none;
    z-index: 100000;
  }

  .btn_bottom {
    border: 0;
    background: #fff;
    font-size: 0.3rem;
    color: #ee3f44;
    line-height: 1rem;
    text-align: center;
    width: 100%;
    border-radius: 0 0 0.2rem 0.2rem;
  }

  .model_title {
    font-size: 0.42rem;
    margin-top: 0.7rem;
    color: #333;
  }

  .model_con {
    line-height: 0.42rem;
    font-size: 0.3rem;
    color: #999;
    text-align: center;
    padding: 0 0.26rem;
  }

  .btn_div {
    background: #fff;
    color: #ee3f44;
    border: none;
    width: 100%;
    line-height: 1rem;
    font-size: 0.36rem;
    border-top: 1px solid #ddd;
    border-radius: 0 0 5px 5px;
  }

  .btn_div .btn_bottom {
    border: 0;
    background: #fff;
    font-size: 0.42rem;
    color: #ee3f44;
  }

  .color_ee3f44 {
    color: #ee3f44;
  }

  .alt_nonentity, .alt_tate, .alt_succeed {
    position: absolute;
    width: 70%;
    min-height: 3rem;
    left: 15%;
    top: 30%;
    background: #fff;
    border-radius: 0.2rem;
    display: none;
    z-index: 100000;
  }

  .alt_title {
    margin-top: 0.6rem;
    font-size: 0.36rem;
  }

  .disableCss {
    color: #333;
    text-decoration: none;
    background: #fff;
    font-size: 0.24rem;
    cursor: pointer;
  }

  /*.code_btn_d {*/
  /*float: right;*/
  /*display: inline-block;*/
  /*margin: 0;*/
  /*font-size: 0.28rem;*/
  /*color: #999;*/
  /*background: #fff;*/
  /*margin-top: 0.2rem;*/
  /*width: 2rem;*/
  /*text-align: right;*/
  /*}*/


</style>

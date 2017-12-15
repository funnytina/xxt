//拨打电话
mobileCall(){
  window.location.href = 'tel://400-151-1111';
  console.log(121);
  console.log(api);
};


//账号不存在
altNonentity()
{
  MessageBox({
    title: '账号不存在',
    message: '此手机号未被激活，无法享受兜礼服务， 是否通过验证激活方式来激活会员账户',
    confirmButtonText: '激活',
    cancelButtonText: '取消',
    showCancelButton: true
  }).then(({value, action}) => {
    this.mobileCall();
  });
}
;


//退出当前账户
altQuit()
{
  MessageBox('请退出当前账户');
}
;

//等待激活
altAwaitActive(date)
{
  MessageBox('等待激活', '您已经在' + date + '提交过申请，我们会在5个工作日内完成审核。如有疑问，您可以拨打客服电话400-158-2212(周一至周五, 9:00AM-18:00PM)');
}
;

//审核未通过
altUnapprove()
{
  MessageBox('提示', '很抱歉您自主申请的兜礼会员审核未通过，请与所在单位联系！');
}
,

//密码错误
altPwdError()
{
  MessageBox({
    title: '密码错误',
    message: '是否找回密码',
    confirmButtonText: '是',
    cancelButtonText: '否',
    showCancelButton: true
  });
}
;

//账号异常
altAccountError()
{
  MessageBox({
    title: '账号异常',
    message: '亲爱的会员，您的账号存在异常，请拨打客服电话“400-158-2212”进行处理 (周一至周五, 9:00AM-6:00PM)',
    confirmButtonText: '立即拨打',
    cancelButtonText: '取消',
    showCancelButton: true
  }).then(({value, action}) => {
    this.mobileCall();
  });
}
;
//各种异常处理
altAllError()
{
  MessageBox({
    title: '提示',
    message: '亲爱的会员，您的账号存在异常，请拨打客服电话“400-158-2212”进行处理 (周一至周五, 9:00AM-6:00PM)',
    confirmButtonText: '立即拨打',
    cancelButtonText: '取消',
    showCancelButton: true
  }).then(({value, action}) => {
    this.mobileCall();
  })
}
;

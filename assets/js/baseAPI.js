
//为jq的异步请求新增一个回调函数，每次jq异步请求之前，会先执行下面的
$.ajaxPrefilter(function (opt) {
  opt.url = 'http://ajax.frontend.itheima.net'+ opt.url
  //统一为有权限的接口设置Headers请求头
  if (opt.url.indexOf('/my/') !== -1) { 
    opt.headers = {
      Authorization:localStorage.getItem('token')
    }
  }
  opt.complete = function (res) { 
    if (res.responseJSON.status === 1) { 
       alert('没有权限!请重新登录');
//删除伪造的token
      localStorage.removeItem('token');
      //跳转至登录页面
      window.location='login.html'
    }
  }
});
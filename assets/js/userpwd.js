$(function () { 
  $('#btnsubmit').on('click', function () { 
    rePwd();
  })
})
function rePwd() { 
  var data = $('#f3').serialize();
  // if()
  $.ajax({
    url:'/my/updatepwd',
    method: 'POST',
    data: data,
    success: function (res) { 
      console.log(res);
      if (res.status === 0) {
        layui.layer.msg(res.message)
        // 修改成功重新登录
        localStorage.removeItem('token');

        //是window在跳转而不是fm
        window.parent.location='../login.html'
      } else { 
        layui.layer.msg(res.message)
      }
    }
  })
}
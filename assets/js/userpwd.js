$(function () {
  layui.form.verify({
    rePwd: function (oldPwd) {
      var newpwds = $('[name=newPwd]').val().trim()
      if (newpwds != oldPwd) { 
        return '两次密码输入不一致'
      }
    }
  })


  //表单提交
  //触发layui的表单验证机制
  $('#btnsubmit').on('submit', function (e) { 
    e.preventDefault();
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
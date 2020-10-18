$(function () { 
  // 获取用户的基本信息
  getUserInfo();
  $('#tuichu').on('click', function () {
    console.log(111);
    //提示用户是否确认退出
    layui.layer.confirm('确认退出登录？', { icon: 3, title: '提示' },
      function (index) { 
        // 清空token
        localStorage.removeItem('token')
        //跳转至登录页
        window.location ='login.html'
        layui.layer.close(index)
      })
  })
})
function getUserInfo() { 
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
   //headers请求头配置对象
    // headers: {
    //   Authorization:localStorage.getItem('token')
    // },
    success: function (res) { 
      // console.log(res);
      if (res.status === 1) {
        return layui.layer.msg(res.message)
      }
      showUser(res.data)
    }
  }) 
}
function showUser(data) { 
  var name = data.nickname || data.username;
  $('.welcome').html('欢迎,'+name)
  // console.log($('.welcome'));
  // console.log(name);
  //显示用户头像
  if (data.user_pic != null) {
    $('.layui-nav-img').attr('src', data.user_pic).show()
    $('.text-avatar').hide()
  } else { 
    $('.layui-nav-img').hide();
    // 提取名字的首字符
    var firstChar = name[0].toUpperCase();
    $('.text-avatar').html(firstChar)
    $('.text-avatar').show()
  }
}

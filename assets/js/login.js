var $loginBox, $regBox;

$(function () {
  // 点击事件发生时，不用再次查找元素
  $loginBox = $('.login-Box');
  $regBox = $('.reg-Box');
  //登录/注册 的超链接添加点击事件
  $('#linkReg').on('click', function () {
    $regBox.hide();
   $loginBox.show()
  });
  $('#linkLogin').on('click', function () { 
    $regBox.show();
   $loginBox.hide()
  })



  //从layui中获取form对象
  var form = layui.form
  //通过form.verify()函数自定义校验规则
  form.verify({
    //自定义一个pwd校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须为6~12位，且不能出现空格'],
     //检验两次密码是否一致
    repwd: function (value) { 
      //通过形参拿到的是确认密码框中的内容
      //需要拿到密码框中的值
      //判断
      var pwd = $('.reg-Box [name=password]').val()
      if (pwd !== value) { 
        return '两次密码不一致'
      }
    }
  })



  //监听注册表单的提交事件
  $('#f1').on('submit', function (e) { 
    e.preventDefault();
    // 属性选择器
    let data = {
      username : $('#f1 [name=username]').val().trim(),
      password : $('#f1 [name=password]').val().trim(),
    }
    $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) { 
      if (res.status === 1) {
       layui.layer.msg(res.message);
        $('#f1 [name=username]').val('')
        return
      } 
      if (res.status === 0) { 
        layui.layer.msg(res.message, function () { 
// 清空注册表单的内容
$('#linkReg').click()
$('#f1')[0].reset();
        });  
        //把用户名和密码直接给登录框
        $('.login-Box  [name = username]').val(data.username);
        $('.login-Box  [name=password]').val(data.password)
      }
    })
  })



  //登陆表单的提交事件
  $('#f2').on('submit', function (e) { 
    e.preventDefault();
    //获取用户名和密码
    var datas = $(this).serialize();
    console.log(datas);
    $.post('http://ajax.frontend.itheima.net/api/login', datas, function (res) { 
// console.log(res);
      if (res.status === 0) {
        layui.layer.msg(res.message, function () {
          localStorage.setItem('token',res.token)
          window.location = 'index.html'
        })
      } else if (res.status ===1) { 
        return layui.layer.msg(res.message)
      }
    })
  })
})
$(function () {
  var form = layui.form

  form.verify({
    nickname: function (value) { 
      console.log(11);
      if (value.length > 6) { 
        
        return '昵称长度必须在1~6个字符之间'
      }
    }
  })

  getUserInfo();
  $('#btnreset').on('click', function (e) { 
    e.preventDefault();
    //将数据还原成初始
    getUserInfo();
  })

  $('#btnsubmit').on('click', function () { 
    goSubmit();
  })
})


function getUserInfo() { 
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    success: function (res) { 
      console.log(res);
      layui.form.val('f1',res.data)
    }
  })
}

function goSubmit() { 
  var data = $('#f2').serialize();
  $.ajax({
    url: '/my/userinfo',
    method: 'POST',
    data: data,
    success: function (res) { 
// console.log(res);
      if (res.status === 0) { 
        layui.layer.msg(res.message);
        window.top.getUserInfo();
      } else {
        layui.layer.msg(res.message)
      }
    }
  })
}
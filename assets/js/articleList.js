//定义查询参数 


  //将请求参数对象提交到服务器
  var p = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state:''
  }

$(function () { 
  

    //调用获取文章列表数据的函数
    allList()
})

 
// 定义美化时间的过滤器
template.defaults.imports.dataFormat = function(date) {
  const dt = new Date(date)

  var y = dt.getFullYear()
  var m = padZero(dt.getMonth() + 1)
  var d = padZero(dt.getDate())

  var hh = padZero(dt.getHours())
  var mm = padZero(dt.getMinutes())
  var ss = padZero(dt.getSeconds())

  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

// 定义补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

 //获取文章的列表数据
function allList() { 
  $.ajax({
    method: 'GET',
    url: '/my/article/list',
    data: p,
    success: function (res) { 
      console.log(res);
      if (res.status === 0) { 
        layui.layer.msg(res.message)
        var list = template('listF', res)
        $('#addbook').html(list)
      } else (
        layui.layer.msg(res.message)
      )
    }
  })
}





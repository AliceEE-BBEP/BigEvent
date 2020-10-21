//定义查询参数 


  //将请求参数对象提交到服务器
  var p = {
    pagenum: 1,
    pagesize: 2,
    cate_id:'',
    state:''
  }

$(function () { 
    //调用获取文章列表数据的函数
  allList()
  //调用获取文章分类的函数
  artclass()

  //为筛选绑定submit事件
  $('#choose').on('click', chooseList)

  //删除按钮
  $('tbody').on('click','#btnDelete',btnDelete)
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
  // console.log(11);
  $.ajax({
    method: 'GET',
    url: '/my/article/list',
    data: p,
    success: function (res) { 
      // console.log(res);
      if (res.status === 0) { 
        // layui.layer.msg(res.message)
        var list = template('listF', res)
        $('#addbook').html(list)
        choosepage(res.total)
      } else (
        layui.layer.msg(res.message)
      )
    }
  })
}


//获取文章分类
function artclass() { 
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) { 
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      // 模板引擎
     var dataclass = template('allsclass',res)
      $('#allchoose').append(dataclass)
      layui.form.render()
    }
  })
}


//筛选
function chooseList(e) { 
  e.preventDefault();
  p.cate_id = $('#allchoose').val();
  p.state = $('#allstate').val();
  console.log(p);
  console.log(p.cate_id);
  allList()
}


//定义渲染分页的方法
function choosepage(total) { 
  layui.laypage.render({
    elem: 'pageBox',
    count: total,
    limit: p.pagesize,
    curr: p.pagenum,
    layout: ['count', 'limit','prev', 'page', 'next', 'skip'],
    limits: [2, 5, 8],
    //分页发生切换的时候
    jump: function (obj,first) {
      p.pagenum = obj.curr
      p.pagesize = obj.limit
      //直接调用会发生死循环 jump一直在被触发
      //只要调用了laypage.render就会直触发jump
      // allList-> choosepage->allList->choosepage的死循环
      // 通过first判断是通过laypage, render触发的jump还是点击的时候触发的Jump
      // first
      if (!first) { 
        allList()
      } 
}
  })
}


//删除
function btnDelete() {
  // console.log(1);
  var id = $(this).attr('data-id')
  //获取删除按钮的个数
  var btnNum = $('.layui-table tbody  tr .btn-del').length
  console.log(btnNum);
  // console.log(id);
  layui.layer.confirm('确定删除吗', { icon: 3, title: '提示' }, function () { 
    // console.log(id);
    $.ajax({
      method: 'get',
      url: '/my/article/delete/' + id,
      success: function (res) { 
        // console.log(res);
        if (res.status === 0) {
          layui.layer.msg(res.message)
          if (btnNum == 1) {
            p.pagenum = p.pagenum==1?1:p.pagenum-1
          }
          //判断删除数据后 分页内是否还有数据，如果灭有剩余的数据 页码值-1
   //通过判断按钮的个数判断还是否有数据
          allList()
        } else { 
          layui.layer.msg(res.message)
        }
      }
    })
  })
}





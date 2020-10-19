
$(function () { 
  showList()
  var closetan = null
  var indexEdit = null

  //添加分类
    $('#adds').on('click', function () { 
    //打开面板并保存面板的Id
    closetan= layui.layer.open(
      {
        type: 1,
        title: '添加文章分类',
        content: $('#tanadd').html(),
        area: ['500px', '250px'],   
      }
    )
  })


  //页面刚开始没有f4这个表单 表单时动态生成的
  //通过代理的方式为表单绑定submit事件
  //确认添加
  $('body').on('submit', '#f4',function (e) { 
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success:function (res) {
        // console.log(res);
        // console.log(11);
        if (res.status === 0) {
          layui.layer.msg(res.message)
          showList();
          //关闭当前窗口
         layui.layer.close(closetan)
        } else { 
          layui.layer.msg(res.message)
        }
      }
    })
  })


  //编辑
  $('body').on('click', '#edit', function (e) {
   indexEdit= layui.layer.open(
      {
        type: 1,
        title: '修改文章',
        content: $('#tanedit').html(),
        area: ['500px', '250px'],   
      }
    )
      // e.preventDefault();
      // console.log($(this));
    var id = $(this).attr('data-id');
    console.log(id);
    // var td2 = $(this).parent().prev('td')[0];
    // var td1 = $(this).parent().prev('td').prev('td')[0];
    // console.log(td2);
    // console.log(td1);
    //获取当前分类名 分类别民
    // console.log(this);
      // console.log(Id);
      $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        // data: id,
        success: function (res) { 
          // console.log(res);
          layui.form.val('form-edit',res.data)
        }
      })
  })

//确认编辑
  //表单提交事件绑定方法
  $('body').on('click', '#btnSubmit', function (e) { 
    e.preventDefault()
    // console.log(11);
    // showList()
    var fmData = $('#f5').serialize();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: fmData,
      success: function (res) { 
        // console.log(res);
        if (res.status === 0) { 
          layui.layer.msg(res.message)
          showList()
          layui.layer.close(indexEdit)
        } else (
          layui.layer.msg(res.message)
        )
      }
    })
  })


//删除
  $('body').on('click','#btnDelete' ,function (e) { 
    e.preventDefault()
    // console.log(11111);
    var id = $(this).attr('data-id');
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/'+id,
      // data:id,id
      success: function (res) { 
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        } else { 
          layui.layer.msg(res.message);
          showList();
          // layui.layer.close(indexEdit)
        }
      }
    })
  })
})

function showList() { 
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) { 
      // console.log(res);
      if (res.status === 0) { 
        var books = template('tables', res)
        $('#addbook').html(books)
      }
    }
  })
}
// 1.3 创建裁剪区域
var options=null
var $image = null
var btnstate = '草稿'
$(function () { 
  initEditor()
  selectClass()
  // 1. 初始化图片裁剪器
$image = $('#image')
// 2. 裁剪选项
 options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}
// 3. 初始化裁剪区域
  $image.cropper(options)
  

  $('#chooseImg').on('click', function (e) { 
    e.preventDefault()
    $('#choosefile').click()
  })



  $('#choosefile').on('change', changeFile)
  // $('#btnsive').on('click', giveState)
  // $('#formgives').on('submit', formgive);
  // console.log($('#formgives'));
  $('#form-pub').on('submit',formgive)
})


// 获取文章分类
function selectClass() { 
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) { 
      if (res.status !== 0) {
        layui.layer.msg(res.message)
      } else { 
        // console.log(11);
        var dataClass = template('allchoose', res)
        $('#allschoose').append(dataClass)
        layui.form.render()
      }
    }
  })
}

//裁剪图片
function changeFile(e) { 
  if (e.target.files.length === 0) { 
    return layui.layer.msg('请选择文件')
  }
  //获取选中文件创建虚拟路径
  var select = e.target.files[0]
  var virPath = URL.createObjectURL(select);
  $image
  .cropper('destroy')      // 销毁旧的裁剪区域
  .attr('src', virPath)  // 重新设置图片路径
  .cropper(options)   
}


//获取表单内容
function formgive(e) {
  e.preventDefault();
  console.log(11);
  var fd = new FormData(this)
  fd.append('state',btnstate)
  fd.forEach(function (k, val) { 
    console.log(k,val);
  })

    // 4. 将封面裁剪过后的图片，输出为一个文件对象
     $image
     .cropper('getCroppedCanvas', {
       // 创建一个 Canvas 画布
       width: 400,
       height: 280
     })
     .toBlob(function(blob) {
       // 将 Canvas 画布上的内容，转化为文件对象
       // 得到文件对象后，进行后续的操作
       // 5. 将文件对象，存储到 fd 中
       fd.append('cover_img', blob)
       giveForm(fd)
       // 6. 发起 ajax 数据请求
     })
}


// function giveState(e) { 
//   console.log(1);
//   e.preventDefault();
//   btnstate = '草稿'
//   console.log(btnstate);
// }
 
function giveForm(fd) {
  $.ajax({
    method: 'post',
    url: '/my/article/add',
    data:fd,
    contentType: false,
    processData: false,
    success: function (res) { 
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      } else { 
        layui.layer.msg(res.message);
        window.location='articleList.html'
      }
    }
  })
}



// const layuiAll = require("../lib/layui/layui.all")

$(function () { 
  // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
  $image.cropper(options)
  


  $('#btnfile').on('click', function () { 
    $('#file').click()
  })
  
  $('#file').on('change', function (e) { 
    // console.log(e);
    var filelist = e.target.files
    console.log(filelist);
    //文件选择框内容发生改变才会触发
    if (filelist.length === 0) { 
  return    layui.layer.msg('用户没有选择头像')
    }

    //拿到用户更换后的图片
    var img = e.target.files[0];
    // console.log(img);
    //创建一个虚拟路径
    var imgUrl =  URL.createObjectURL(img)
    // console.log(imgUrl);
    // $('#image').src=imgUrL
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', imgUrl)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })

  $('#btnSubmit').on('click', function (e) { 
    e.preventDefault();
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  // console.log(dataURL);
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar:dataURL
      },
      success: function (res) { 
        console.log(res);
        if (res.status === 0) { 
          layui.layer.msg(res.message)
          window.parent.getUserInfo();
        }
      }
    })
  })
})



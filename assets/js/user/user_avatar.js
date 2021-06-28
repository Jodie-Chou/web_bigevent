$(function() {
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

  // 为‘上传按钮’绑定事件
  $('#chooseFile').on('click', function() {
    $('#file').click()
  })

  // 监听文件选择框的change事件
  $('#file').on('change', function(e) {
    var fileList = e.target.files
    if (fileList.length <= 0) {
      return layui.layer.msg('请选择文件')
    }
    // 选择用户选择的文件
    var files = fileList[0]
    var newUrl = URL.createObjectURL(files)
    $image
    .cropper('destroy')
    .attr('src', newUrl)
    .cropper(options)
  })

  // 确定上传
  $('#btnUpload').on('click', function(){
    // 获取裁剪后的图片路径
    var dataUrl = $('#image')
      .cropper('getCroppedCanvas', 
        {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
      // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      .toDataURL('image/png') 
    // 上传到服务器
    $.ajax({
      url: '/my/update/avatar',
      method: 'POST',
      data: {
        avatar: dataUrl
      },
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新头像失败')
        }
        layui.layer.msg('更新头像成功')
        window.parent.getUserInfo()
      }
    })
  })
})
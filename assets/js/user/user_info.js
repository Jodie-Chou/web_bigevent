$(function() {
  var form = layui.form
  var layer = layui.layer
  // 预定义表单验证规则
  form.verify({
    nickname: function(value){
      if (value.length > 6) {
        return '昵称必须为1-6个字符'
      }
    }
  })

  // 调用函数获取用户信息
  getUserInfo(layer,form)

  // 为重置按钮绑定事件
  $('#resetBtn').on('click', function(e) {
    e.preventDefault()
    form.val('formUserInfo', user)
  })
  // 为表单绑定提交事件
  $('#formUserInfo').on('submit', function(e){
    e.preventDefault()
    $.ajax({
      url: '/my/userinfo',
      method: 'POST',
      data: $(this).serialize(),
      success: function(res){
        if (res.status != 0) {
          return layer.msg('更新失败')
        }
        layer.msg('更新成功')
        getUserInfo(layer,form)
        window.parent.getUserInfo()
      }
    })
  })
})

// 获取用户信息
function getUserInfo (layer,form) {
  $.get('/my/userinfo',function(res){
    if (res.status !== 0) {
      return layer.msg('获取用户信息失败')
    }
    user = res.data
    // // 初始化用户信息
    form.val('formUserInfo', user)
  })
}



$(function() {
  var layer = layui.layer
  // 调用函数获取用户信息
  getUserInfo()

  // 退出链接绑定点击事件
  $('#loginOut').on('click', function() {
    layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
      //do something
      //1. 清空localStorage中的token
      localStorage.removeItem('token')
      layer.msg('退出成功！')
      //2. 跳转到登录页
      setTimeout(function(){
        location.href = '/login.html'
      },800)
      // 关闭弹出层
      layer.close(index);
    });
  })
})

// 获取用户信息
function getUserInfo(){
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    success: function (res) {
      if(res.status !== 0) {
        layui.layer.msg(res.message)
        return 
      }
      // 调用renderUserAvatar函数渲染头像
      renderUserAvatar(res.data)
    }
  })
}

// 渲染用户头像
function renderUserAvatar(user){
  var uname = user.nickname || user.username
  // 设置欢迎文本
  $('#welcomeText').html('欢迎&nbsp;&nbsp;' + uname)
  // 设置用户头像
  if(user.user_pic) {
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    var textAvatar = uname[0].toUpperCase()
    $('.layui-nav-img').hide()
    $('.text-avatar').html(textAvatar).show()
  }
}
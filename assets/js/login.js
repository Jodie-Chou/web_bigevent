$(function() {
  
  var form = layui.form
  var layer = layui.layer
  $('#toRegisterBtn').on('click', function() {
    $('.login').hide()
    $('.register').show()
  })
  $('#toLoginBtn').on('click', function() {
    $('.register').hide()
    $('.login').show()
  })
  // 通过layui自定义验证规则
  form.verify({
    pwd: [
      /^\S{6,12}$/,
      '密码必须6-12位，且不得包含空格'
    ],
    rePwd: function (value) {
      // 通过形参value可拿到确认密码输入的值
      // 再通过dom操作获取密码框输入的值
      // 将两个值进行比较，返回字符串
      var pwd = $('.register [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听注册提交事件
  $('#form_reg').on('submit', function(e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password:$('#form_reg [name=password]').val()
    }
    $.post({
      url: '/api/reguser',
      data: data,
      success: function(res){
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        // 触发点击`去登录`链接
        $('#toLoginBtn').click()
      }
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功')
        var token = res.token
        // 将获取到的token值存入本地存储中
        localStorage.setItem('token',token)
        window.location.href = '/index.html'
      }
    })
  })
})
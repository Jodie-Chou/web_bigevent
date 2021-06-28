$(function(){
  var form = layui.form

  // 预定义表单校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须6到12位'
    ],
    samePwd: function(value){
      if (value === $('[name=oldPwd]').val()) {
        return '新老密码不能相同'
      }
    },
    rePwd: function(value){
      if ($('[name=newPwd]').val() !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 绑定表单提交事件
  $('#formPwd').on('submit', function(e) {
    e.preventDefault()
    var _this = $(this)
    $.post(
      '/my/updatepwd',
      $(this).serialize(),
      function(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('密码重置成功')
        // 重置表单元素
        _this[0].reset()
      })
  })
})
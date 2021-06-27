// 每次调用$.get或$.post或$.ajax()的时候，会先调用$.ajaxPreFilter方法，此方法可以拿到向Ajax提供的配置对象
$.ajaxPrefilter(function(opts) {
  opts.url = 'http://api-breakingnews-web.itheima.net' + opts.url

  // 统一为有权限访问的接口设置headers请求头
  if (opts.url.indexOf('/my/') !== -1) {
    opts.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 全局统一挂载complete回调
  opts.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token')
      layer.msg('请先登录')
      setTimeout(function(){
        location.href = '/login.html'
      },800)
    }
  }
})
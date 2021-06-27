// 每次调用$.get或$.post或$.ajax()的时候，会先调用$.ajaxPreFilter方法，此方法可以拿到向Ajax提供的配置对象
$.ajaxPrefilter(function(opts) {
  opts.url = 'http://api-breakingnews-web.itheima.net' + opts.url
})
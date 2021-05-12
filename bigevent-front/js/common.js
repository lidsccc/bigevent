
$(function () {
  // 菜单展开/折叠交互
  $('.menus .triangle').click(function () {
    $(this).parents('li').toggleClass('collapsed');
  })

  //ajax预处理函数
  $.ajaxPrefilter(function (options) {
    //获取url地址,拼接然后传给ajax请求作为url
    options.url = 'http://127.0.0.1:8888' + options.url
  })

  getLink()
  function getLink() {
    $.ajax({
      method: 'GET',
      url: '/api/links',
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return res.message
        }
        var htmlStr = template('link-tpl', res)
        $('.kr_collaborator').html(htmlStr)
        layui.form.render()
      }
    })
  }
})
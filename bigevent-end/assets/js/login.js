$(function () {
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: data,
            success: (res) => {
                if (res.status !== 0) return layui.layer.msg(res.message, {
                    icon: 5
                })
                layui.layer.msg('登陆成功', {
                    icon: 6
                }, function () {
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                })
            }
        })
    })
})
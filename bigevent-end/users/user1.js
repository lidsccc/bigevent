$(function() {
    //给表单绑定提交事件
    layui.form.verify({
            pwd: [
                /^[\S]{6,12}$/,
                '密码必须是6-12位的非空字符'
            ],
            rePwd: function(value) {
                // value 确认密码
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码不一致'
                }
            }
        })
        /**** 2-完成密码更改 ****/
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
            // console.log(data)
        $.ajax({
            method: 'PUT',
            url: '/admin/users/' + id,
            data: data,
            success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 清空表单
                    $('.layui-form')[0].reset()
                })
            }
        })
    })
})
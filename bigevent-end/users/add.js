//-------------------编辑功能--------------
//在渲染到页面上
$(function() {
    //绑定表单提交事件
    $('.layui-form').on('submit', function(e) {
            //阻止默认表单提交行为
            e.preventDefault()
                //获取所有的内容
            var data = $(this).serialize()
                //向数据库提交内容
            $.ajax({
                type: "post",
                url: "/admin/users",
                data: data,
                success: function(res) {
                    //进行判断
                    if (res.status != 0) {
                        return layui.layer.msg(res.message, { icon: 5 })
                    }
                    layui.layer.msg(res.message, { icon: 6 }, function() {
                        //数据提交完毕后，返回父节点的点击事件
                        window.parent.document.querySelector('#yonghu').click()
                    })
                }
            });


        })
        //正则表达式
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须是6-12位的非空字符'
        ],
        email: [
            /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            '邮箱地址必须符合规范'

        ],
        rePwd: function(value) {
            // value 确认密码
            if (value !== $('[name=password]').val()) {
                return '两次密码不一致'
            }
        }
    })
})
$(function () {
    //-------------退出功能--------------
    // 点击按钮，实现退出功能
    $('#logout-btn').on('click', function () {
        // alert('ok')
        var layer = layui.layer
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = './login.html'

            // 关闭询问框
            layer.close(index)
        })
    })

    // ------------更换头像----------







})
$(function() {
    console.log(location.search);
    //利用location.search进行截取获得？id=28，
    //在利用slice获取索引值为1的数据,在利用split将其转换为数组，将=转化为，
    var id = location.search.slice(1).split('=')[1]
        // console.log(id);
    initUser()

    function initUser() {

        $.ajax({
            //从数据库获取数据
            type: "get",
            //获取其id的内容
            url: "/admin/users/" + id,
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                //快速将内容渲染到页面上
                layui.form.val('editForm', res.data)


            }
        })
    }
    //绑定表单提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单提交事件
        e.preventDefault()
            //获取所有的内容
        var data = $(this).serialize()
            //向数据库提交内容
        $.ajax({
            type: "PUT",
            url: "/admin/upuser",
            data: data,
            success: function(res) {
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })
                    //跳转到user.html页面
                location.href = '../user/user.html'
            }
        });



    })

    //重置事件
    $('.layui-btn-primary').on('click', function() {
        initUser()

    })


})
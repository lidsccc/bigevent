$(function () {
    //渲染轮播图
    function showswiper() {
        $.ajax({
            type: "get",
            url: "/admin/swipers",
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message, {
                    icon: 5
                })
                var htmlStr = template('swiper_tpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    showswiper()
    //修改状态
    $('tbody').on('click', '.layui-badge', function () {
        const id = $(this).data('change')
        var status = $(this).data('status')
        status == 1 ? status = 1 : status = 2
        $.ajax({
            type: "put",
            url: "/admin/swipers/" + id,
            data: {
                status: status
            },
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message, {
                    icon: 5
                })
                showswiper()
            }
        })
    })
    //点击删除
    $('tbody').on('click', '.delete', function () {
        const id = $(this).data('del')
        layer.confirm('确定要删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: "DELETE",
                url: "/admin/swipers/" + id,
                success: function (res) {
                    if (res.status !== 0) return layui.layer.msg(res.message, {
                        icon: 5
                    })
                    layui.layer.msg(res.message, {
                        icon: 6
                    }, function () {
                        showswiper()
                    })
                }
            })
        })
    })
    //点击上传图片按钮,文件选择框被点击
    $('#uploadSwiper').on('click', function () {
        $('#myfile').click()
    })
    //文件选择框change事件
    $('#myfile').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length == 0) return layui.layer.msg('请选择图片', {
            icon: 5
        })
        var fd = new FormData();
        for (var i = 0; i < filelist.length; i++) {
            fd.append('swipers', filelist[i])
        }
        $.ajax({
            type: "POST",
            url: "/admin/swipers",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message, {
                    icon: 5
                })
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    showswiper()
                })
            }
        })
    })
})
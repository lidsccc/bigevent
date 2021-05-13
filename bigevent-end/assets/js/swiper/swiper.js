$(function () {
    //渲染轮播图
    var q = {
        pagenum: 1, // 获取第x页的数据
        pagesize: 2, // 每页显示多少条数据
    }

    function renderPage(total) {
        // total 数据总条数
        layui.laypage.render({
            elem: 'swiper', // 分页页码的容器id
            count: total, // 数据的总条数
            limit: q.pagesize, // 每页显示的条数
            curr: q.pagenum, // 当前是第几页（哪个页码会高亮）
            limits: [2, 4, 6, 10],
            layout: ['limit', 'prev', 'page', 'next', 'count', 'skip'], // 自定义排版
            //①渲染页码时会触发;②切换分页时触发（单击页码按钮触发）
            jump: function (obj, first) {
                /* 
                    obj，当前分页的选项对象
                    first 是否首次调用
                        true，首次调用（渲染页码时调用的）
                        undefined 单击页码按钮时调用的
                */
                /* 单击页码按钮时才需要执行下面的代码 */
                if (!first) {
                    // 修改参数对象q
                    q.pagesize = obj.limit
                    q.pagenum = obj.curr
                    // 重新获取文章数据
                    showswiper()
                }
            }
        })

    }

    function showswiper() {
        $.ajax({
            type: "get",
            url: "/admin/swipers",
            data: q,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message, {
                    icon: 5
                })
                var htmlStr = template('swiper_tpl', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
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
                    })
                    var num = $('.delete').length
                    if (num === 1) {
                        // q.pagenum--;
                        // 判断当前页是不是第1页
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    showswiper()

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
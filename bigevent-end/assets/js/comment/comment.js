// 入口函数
$(function () {
    //时间过滤器
    template.defaults.imports.dataFormate = function (data) {
        var time = new Date(data)
        var y = time.getFullYear()
        var m = addZero(time.getMonth() + 1)
        var d = addZero(time.getDate())
        var hh = addZero(time.getHours())
        var mm = addZero(time.getMinutes())
        var ss = addZero(time.getSeconds())
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    //定义时间补零函数
    function addZero(n) {
        return n >= 10 ? n : '0' + n
    }
    commentList()

    // 查询评论列表
    function commentList() {
        $.ajax({
            method: 'GET',
            url: '/admin/comments',
            success: function (res) {
                // console.log(res);
                q = res.data.length
                console.log(q);
                if (res.status !== 0) {
                    return layui.layer.msg('获取评论列表失败')
                }
                // 渲染到页面
                var htmlStr = template('list-tpl', res)
                // console.log(htmlStr);
                $('tbody').html(htmlStr)

            }
        })
    }

    // 删除评论   敏感操作,通过事件委托
    $('tbody').on('click', '.delete_comment', function () {
        // 获取被删除文章的id
        var id = $(this).data('id')
        // 询问
        layui.layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            // 调接口,删除评论
            $.ajax({
                method: 'DELETE',
                url: '/admin/comments/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        layui.layer.msg(res.message, { icon: 5 })
                    }
                    layui.layer.msg('删除评论成功', { icon: 6 }, function () {
                        commentList()
                    })
                }
            })

        })
    })


})

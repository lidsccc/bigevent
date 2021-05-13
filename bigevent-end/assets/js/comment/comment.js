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

    // 参数对象
    var query = {
        pagenum: 1,
        pagesize: 2
    }
    commentList()
    // 查询评论列表
    function commentList() {
        $.ajax({
            method: 'GET',
            url: '/admin/comments',
            data: query,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取评论列表失败')
                }
                // 渲染到页面
                var htmlStr = template('list-tpl', res)
                $('tbody').html(htmlStr)
                // 渲染分页的页码
                renderPage(res.total)

            }
        })
    }

    /**** 4-分页 ****/
    function renderPage(total) {
        // total 数据总条数
        layui.laypage.render({
            elem: 'laypage_id', // 分页页码的容器id
            count: total, // 数据的总条数
            limit: query.pagesize, // 每页显示的条数
            curr: query.pagenum, // 当前是第几页（哪个页码会高亮）
            limits: [2, 4, 6, 10],
            layout: ['limit', 'prev', 'page', 'next', 'count', 'skip'], // 自定义排版
            //①渲染页码时会触发;②切换分页时触发（单击页码按钮触发）
            jump: function (obj, first) {
                console.log(obj);
                /* 
                    obj，当前分页的选项对象
                    first 是否首次调用
                        true，首次调用（渲染页码时调用的）
                        undefined 单击页码按钮时调用的
                */
                /* 单击页码按钮时才需要执行下面的代码 */
                if (!first) {
                    // 修改参数对象q
                    query.pagesize = obj.limit
                    query.pagenum = obj.curr
                    // 重新获取文章数据
                    commentList()
                }
            }
        })

    }


    // 删除评论   敏感操作,通过事件委托
    $('tbody').on('click', '.delete_comment', function () {
        // 获取被删除文章的id
        var id = $(this).data('id')
        // 询问
        layui.layer.confirm('确定要删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 调接口,删除评论
            $.ajax({
                method: 'DELETE',
                url: '/admin/comments/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        layui.layer.msg(res.message, {
                            icon: 5
                        })
                    }
                    layui.layer.msg('删除评论成功', {
                        icon: 6
                    })
                    var num = $('.delete').length
                    if (num === 1) {
                        // q.pagenum--;
                        // 判断当前页是不是第1页
                        query.pagenum = query.pagenum === 1 ? 1 : query.pagenum - 1
                    }
                    commentList()

                }
            })

        })
    })


})
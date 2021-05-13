$(function() {
    var q = {
        pagesize: 2,
        pagenum: 2
    }

    function renderPage(total) {
        // total 数据总条数
        layui.laypage.render({
            elem: 'test1', // 分页页码的容器id
            count: total, // 数据的总条数
            limit: q.pagesize, // 每页显示的条数
            curr: q.pagenum, // 当前是第几页（哪个页码会高亮）
            limits: [2, 4, 6, 10],
            layout: ['limit', 'prev', 'page', 'next', 'count', 'skip'], // 自定义排版
            //①渲染页码时会触发;②切换分页时触发（单击页码按钮触发）
            jump: function(obj, first) {
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
                        // showswiper()
                    getlinkNews()
                }
            }
        })

    }


    //获取链接列表
    getlinkNews()

    function getlinkNews() {
        $.ajax({
            method: 'get',
            url: '/admin/links',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // layui.layer.msg(res.message, { icon: 6 })
                getlinkList(res)

            }
        })
    }

    // 获取到的信息渲染进页面
    function getlinkList(res) {
        var htmlStr = template('tpl-link', res)
        $('tbody').html(htmlStr)
            //动态渲染数据时用layui的render方法
        renderPage(res.total)
        layui.form.render()
    }
    // 单机添加弹出模态框
    var indexAdd = null
    $('#add-link').on('click', function() {
            indexAdd = layui.layer.open({
                type: 1,
                area: ['500px', '350px'],
                title: '添加链接',
                content: $('#add-form-tpl').html()
            })
            $('#urlIcon').on('click', function() {
                    $('#linkFile').click()
                })
                //监听change事件
            $('#linkFile').on('change', function() {
                var fileList = $(this)[0].files
                if (fileList.length === 0) return layui.layer.msg('请选择图片')
                var file = fileList[0]
                var newImgURL = URL.createObjectURL(file)
                $('#preIcon').attr('src', newImgURL)
            })
            $('body').on('submit', '#add-form', function(e) {
                    e.preventDefault()
                    var fd = new FormData(this)
                    $.ajax({
                        method: 'post',
                        url: '/admin/links',
                        contentType: false,
                        processData: false,
                        data: fd,
                        success: function(res) {
                            // console.log(res);
                            if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 })
                            layui.layer.msg(res.message, { icon: 6 })
                            getlinkNews()
                            layui.layer.close(indexAdd)
                        }
                    })
                })
                // 点击重置清空当前内容
            $('#reset').on('click', function() {
                $('#preIcon').attr('src', ' ')
            })

        })
        // 删除链接 
    $('tbody').on('click', '#btndelete', function() {
            var id = $(this).data('value');
            layui.layer.confirm('您确定要删除此链接吗?', { icon: 3, title: '提示' }, function(index) {
                $.ajax({
                    method: 'delete',
                    url: '/admin/links/' + id,
                    success: function(res) {
                        console.log(res);
                        if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 })
                        layui.layer.msg(res.message, { icon: 6 }, function() {
                            getlinkNews()
                            layui.layer.close()
                        })
                    }
                })
            })

        })
        // 编辑链接
    var indexedit = null
        // var aaa = null

    $('tbody').on('click', '#btnedit', function() {
            var id = $(this).data('value');
            getOneList(id)
            indexedit = layui.layer.open({
                type: 1,
                area: ['500px', '350px'],
                title: '添加链接',
                content: $('#edit-form-tpl').html()
            })
            $('#urlIcon').on('click', function() {
                    $('#linkFile').click()
                })
                //监听change事件
            var data
            $('#linkFile').on('change', function() {
                var fileList = $(this)[0].files
                if (fileList.length === 0) return layui.layer.msg('请选择图片')
                data = fileList[0]
                console.log(data);

                var file = fileList[0]
                var newImgURL = URL.createObjectURL(file)
                $('#preIcon').attr('src', newImgURL)
            })
            $('#editReset').on('click', function(e) {
                e.preventDefault()
                $.ajax({
                    method: 'get',
                    url: '/admin/links/' + id,
                    success: res => {
                        $('#preIcon').attr('src', 'http://127.0.0.1:8888/uploads/' + res.data.linkicon)
                        layui.form.val('editForm', res.data)
                        layui.form.render()
                    }
                })
            })
            $('body').on('submit', '#edit-form', function(e) {
                e.preventDefault()
                var fd = new FormData(this)
                if (data) {
                    fd.append('linkicon', data)
                }

                $.ajax({
                    method: 'put',
                    url: '/admin/links/' + id,
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layui.layer.msg(res.message, { icon: 5 })
                        }
                        layui.layer.msg('编辑链接信息成功', { icon: 6 })

                        getlinkNews()
                        layui.layer.close(indexedit)
                    }
                })
            })
        })
        // 把内容渲染到编辑id的页面
    function getOneList(id) {
        $.ajax({
            method: 'get',
            url: '/admin/links/' + id,
            success: res => {
                $('#preIcon').attr('src', 'http://127.0.0.1:8888/uploads/' + res.data.linkicon)
                layui.form.val('editForm', res.data)
                layui.form.render()
            }
        })
    }

})
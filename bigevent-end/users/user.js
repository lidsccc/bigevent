$(function() {
    //左右显示移动栏
    function renderPage(total) {
        // total 数据总条数
        layui.laypage.render({
            elem: 'articlePage', // 分页页码的容器id
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
                    initCateList()
                }
            }
        })

    }
    // 参数对象
    var q = {
            pagenum: 1, // 获取第x页的数据
            pagesize: 2, // 每页显示多少条数据
            cate_id: '', // 获取哪些分类下面的文章（默认为空，获取所有分类的文章）
            state: '' // 获取xx状态的文章（默认为空，获取所有状态的文章）
        }
        // alert('ok')
        /**** 1-分类列表（获取所有的分类，渲染到页面） ****/
    initCateList()
        // 获取所有的分类数据
    function initCateList() {
        $.ajax({
            method: 'get',
            url: '/admin/users',
            data: q,
            success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                //template渲染页面
                var htmlStr = template('tpl-table', res)

                $('tbody').html(htmlStr)

                //渲染分页
                renderPage(res.total)



            }

        })
    }
    //跳转到编辑页面，并携带所获取id属性的内容
    $('tbody').on('click', '.link', function() {
            //跳转到edit.html页面,并携带其id
            location.href = '../user/edit.html?id=' + $(this).data('id')

        })
        // 获取被删除分类的id
    $('tbody').on('click', '.delete', function() {
        var id = $(this).attr('data-id')
        layui.layer.confirm('您确定要删除此分类吗?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                type: "DELETE",
                url: "/admin/users/" + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 5 })
                    }
                    layui.layer.msg(res.message, { icon: 6 })
                    var num = $('.delete').length
                    if (num === 1) {
                        // q.pagenum--;
                        // 判断当前页是不是第1页
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    //     // 重新渲染分类列表
                    initCateList()

                    layui.layer.close(index);

                }
            });
        })


    })

    //重置密码
    // 2.1 单击“重置密码”按钮，弹出模态框
    var indexAdd = null
        //托管事件给重置密码绑定点击事件
    $('tbody').on('click', '.resetpwd', function() {
        //弹出模拟框
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '重置密码',
            content: $('#tpl-password').html()
        });
        var id = $(this).attr('data-id')
            //表单提交事件
        $('.layui-form').on('submit', function(e) {
            e.preventDefault()
            var data = $('[name=password]').val()
                // console.log(data)
            $.ajax({
                method: 'PUT',
                url: '/admin/users/' + id,
                data: {
                    password: data
                },
                success: function(res) {
                    // console.log(res)
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 5 })
                    }
                    layui.layer.msg(res.message, { icon: 6 }, function() {
                        // 清空表单
                        $('.layui-form')[0].reset()
                        layui.layer.close(indexAdd)
                    })
                }
            })
        })
    })

    layui.form.verify({
            pwd: [
                /^[\S]{6,12}$/,
                '密码必须是6-12位的非空字符'
            ],
            rePwd: function(value) {
                // value 确认密码
                if (value !== $('[name=password]').val()) {
                    return '两次密码不一致'
                }
            }
        })
        /**** 2-完成密码更改 ****/














})
$(function () {
    // alert('ok')

    getInfo()

    function getInfo() {
        $.ajax({
            method: 'get',
            url: '/api/articles/1/comments',
            success: function (res) {
                console.log(res.data)

                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                var htmlStr = template('tpl-pinglun', res)
                $('#pinglunqu').html(htmlStr)

            }
        })

    }

    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }

    $('#comment-btn').on('click', function (e) {
        e.preventDefault()

        if ($('#info_name').val().trim() == '' || $('#info_content').val().trim() == '') {
            layui.layer.msg('请填写内容')
        }

        $.ajax({
            method: 'post',
            url: '/api/articles/1/comments',
            data: {
                uname: $('#info_name').val(),
                content: $('#info_content').val()
            },
            success: function (res) {
                console.log(res)
            }
        })
        $('#info_name').val('')

        $('#info_content').val('')

        getInfo()
    })



    template.defaults.imports.contentFormat = function (aa) {

        var sen = /[日|激情|花]/g //配置脏话
        console.log(aa)
        return aa.replace(sen, '*')

    }




})
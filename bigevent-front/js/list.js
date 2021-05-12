$(function() {

    var num = 0 //点击次数


    var pagenum = 1 //获取第x页的数据


    // 获取新闻信息
    getNewslist()

    function getNewslist() {

        $.ajax({
            method: 'get',
            url: '/api/articles',
            data: {
                pagenum: 1, //获取第x页的数据
                pagesize: 4, //每页显示多少条数据
            },
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                var htmlStr = template('tpl-news', res)
                $('#news-content').html(htmlStr)

            }

        })
    }

    $('#more').on('click', function() {
        num++
        console.log(pagenum)
        $.ajax({
            method: 'get',
            url: '/api/articles',
            data: {
                pagenum: pagenum + num,
                pagesize: 4
            },
            success: function(res) {
                console.log(res)

                var htmlStr = template('tpl-news', res)
                if (num < 3) {
                    $('#news-content').append(htmlStr)
                } else {
                    $('#news-content2').html(htmlStr)
                }

                $('#seve').css('display', 'block')
                $('#ent').css('display', 'block')
                $('#nine').css('display', 'block')
                $('#ten').css('display', 'block')


            }

        })
        getnews()

    });

    function getnews() {
        $.ajax({
            method: 'get',
            url: '/api/articles',
            data: {
                pagenum: pagenum + num,
                pagesize: 4
            },
            success: function(res) {
                // console.log(res)
                if (num > 2) {

                    $('#pp').html('全部加载完成')
                }


            }

        })
    }













})
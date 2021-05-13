// 入口函数
$(function () {
    // 轮播图列表渲染
    getswpList()

    function getswpList() {
        $.ajax({
            method: 'GET',
            url: '/api/swipers',
            success: function (res) {
                if (res.status !== 0) {
                    return res.message
                }
                // 模板渲染
                var htmlStr = template('swp-tpl', res)
                $('#swp').html(htmlStr)
                layui.form.render()

                // 轮播图的layui格式
                layui.use('carousel', function () {
                    var carousel = layui.carousel;
                    //建造实例
                    carousel.render({
                        elem: '#kr_carousel'
                            // , width: '100%' //设置容器宽度
                            ,
                        height: '100%',
                        arrow: 'always' //始终显示箭头
                        //,anim: 'updown' //切换动画方式
                    });
                });
            }
        })
    }
    // 轮播图


})
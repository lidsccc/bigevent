$(function () {
    //ajax预处理函数
    $.ajaxPrefilter(function (options) {
        //获取url地址,拼接然后传给ajax请求作为url
        options.url = 'http://127.0.0.1:8888' + options.url
        //判断是否为加密接口,如果是加密接口,添加请求头
        if (options.url.indexOf('/admin/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        options.complete = function (res) {
            //console.log(res); //此处为ajax返回对象
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }

    })
})
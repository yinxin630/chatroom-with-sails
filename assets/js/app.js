$('#send').click(function () {
    io.socket.post('/message', { msg: $('#msg').val(), nickName: $('#nickName').val() });
});
$('#message').keydown(function () {
    if (event.keyCode == '13') {
        io.socket.post('/message', { msg: $('#message').val(), nickName: $('#nickName').val() });
        $('#message').val('');
    }
});

/**
 * 客户端初始化连接
 */
(function () {
    io.socket.on('message', function (msg) {
        alert(msg.msg);
    });
    
    $.ajax({
        url: '/session',
        type: 'get',
        error: function (req, err) {
            $.ajax({
                url: '/session',
                type: 'post',
                data: {
                    nickName: '碎碎酱',
                },
                error: function (req, err) {
                    alert('Create session failed');
                },
                success: function (resData) {
                    $('#nickName').val(resData.datas.nickName);
                    io.socket.get('/message');
                }
            });
        },
        success: function (resData) {
            $('#nickName').val(resData.datas.nickName);
            io.socket.get('/message');
        }
    });
})();

/**
 * 页面初始化显示
 */
$(document).ready(function () {
    $('.body').height($(window).height() - $('.header').height() - 23);
    $('.message-form').height($('.body').height() - $('.input-form').height());
    $('.input-area').width($('.input-form').width() - parseInt($('.input-area').css('padding-right')) - parseInt($('.input-area').css('padding-left')));
});
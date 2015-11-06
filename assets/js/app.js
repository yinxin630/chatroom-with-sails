/**
 * 回车发送消息
 */
$('#message').keydown(function () {
    if (event.keyCode == '13') {
        io.socket.post('/message', { msg: $('#message').val(), nickName: $('#nickName').val() });
        $('#message').val('');
    }
});

/**
 * 显示修改昵称窗体
 */
$('#edit-image').click(function () {
    $('.input-nickname').show(1000);
});

/**
 * 修改昵称
 */
$('#input-nickname-button').click(function () {
    
});
$('#nickName').change(function () {
    $('#user-nickname').text($('#nickName').val());
});

/**
 * 客户端初始化连接
 */
(function () {
    /**
     * 注册消息处理函数
     */
    io.socket.on('message', function (msg) {
        var senderDiv = $('<div></div>').attr('class', 'message-sender').text(msg.nickName);
        var contentDiv = $('<div></div>').attr('class', 'message-content').text(msg.msg);
        var messageDiv = $('<div"></div>').attr('class', 'message').append(senderDiv).append(contentDiv);
        $('#message-form').append(messageDiv);
    });
    
    /**
     * 判断用户是否已存在
     * 1. 为存在，调用接口创建会话
     * 2. 已存在，设置页面隐藏域昵称为用户昵称
     */
    $.ajax({
        url: '/session',
        type: 'get',
        error: function (req, err) {
            $.ajax({
                url: '/session',
                type: 'post',
                data: {
                    nickName: '游客',
                },
                error: function (req, err) {
                    alert('Create session failed');
                },
                success: function (resData) {
                    $('#nickName').val(resData.datas.nickName);
                    $('#nickName').change();
                    io.socket.get('/message');
                }
            });
        },
        success: function (resData) {
            $('#nickName').val(resData.datas.nickName);
            $('#nickName').change();
            $('.input-nickname').hide(1000);
            io.socket.get('/message');
        }
    });
})();

/**
 * 页面初始化显示
 */
$(document).ready(function () {
    dynamicResizing();
});
$(window).resize(function () {
    dynamicResizing();
});

function dynamicResizing() {
    $('.body').height($(window).height() - $('.header').outerHeight());
    $('.message-form').outerHeight($('.body').height() - $('.input-form').outerHeight());
    $('.input-area').outerWidth($('.input-form').width());
}
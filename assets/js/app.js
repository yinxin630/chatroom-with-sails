/**
 * 回车发送消息
 */
$('#message').keydown(function (event) {
    if (event.keyCode == 13 && !event.shiftKey) {
        if ($('#message').val() == '') {
            return false;
        }
        io.socket.post('/message', { msg: $('#message').val(), nickName: $('#nickName').val() });
        $('#message').val('');
        return false;
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
    $.ajax({
        url: '/user',
        type: 'put',
        data: {
            nickName: $('#input-nickname-textbox').val(),
        },
        error: function (res) {
            alert(res.responseJSON.msg);
        },
        success: function (resData) {
            $('#nickName').val(resData.nickName);
            $('#nickName').change();
            $('.input-nickname').hide(1000);
        }
    });
    $('#input-nickname-textbox').val('');
});
$('#nickName').change(function () {
    $('#user-nickname').text($('#nickName').val());
});

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
    $('.body').height(window.innerHeight - $('.header').outerHeight());
    $('.message-form').outerHeight($('.body').height() - $('.input-form').outerHeight());
    $('.chatform').width($(window).width() < 900 ? $(window).width() : $('.chatform').width());
    $('.message-form').width($('.chatform').width());
    $('.input-area').outerWidth($('.input-form').width());
    $('.input-area-info').css('right', ($(window).width() - $('.chatform').width()) / 2 + 10);
}

/**
 * 客户端初始化连接
 */
(function () {
    /**
     * 注册消息处理函数
     */
    io.socket.on('message', function (msgData) {
        var nickName = msgData.nickName;
        var msg = msgData.msg;
        var time = msgData.time;
        addNewMessage(nickName, time, msg, 200);
    });

    io.socket.on('connect', function () {
        /**
        * 判断用户是否已存在
        * 1. 若不存在，调用接口创建会话
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
                        nickName: '',
                    },
                    error: function (res) {
                        alert(res.responseJSON.msg);
                    },
                    success: function (resData) {
                        $('#nickName').val(resData.nickName);
                        $('#nickName').change();
                        joinRoomAndGetMessage();
                    }
                });
            },
            success: function (resData) {
                $('#nickName').val(resData.nickName);
                $('#nickName').change();
                $('.input-nickname').hide();
                joinRoomAndGetMessage();
            }
        });
        $('.disconnect-info').hide();
    });

    io.socket.on('disconnect', function () {
        $('.disconnect-info').show();
    });

    $('#disconnect-animation').shCircleLoader();


})();

var prevScrollTop = 0;
function addNewMessage(nickName, time, msg, showSpeed) {
    msg = msg.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u0085\u2029)/g, '<br>');
    msg = msg.replace(/  /g, '&nbsp');
    msg = msg.replace(/\t/g, '&nbsp&nbsp');
    var senderDiv = $('<div></div>').attr('class', 'message-sender').text(nickName).append('<span style="font-size:14px;"> - ' + time + '</span>');
    var contentDiv = $('<div></div>').attr('class', 'message-content').html(msg);
    var messageDiv = $('<div"></div>').attr('class', 'message').append(senderDiv).append(contentDiv);
    $('#message-form').append(messageDiv);
    var moreHeightthanMsgForm = messageDiv.outerHeight() - $('#message-form').outerHeight();
    if ($('#message-form').children().length == 1 || $('#message-form').scrollTop() >= prevScrollTop) {
        $('#message-form').animate({ scrollTop: messageDiv.offset().top - $('#message-form').offset().top + $('#message-form').scrollTop() + moreHeightthanMsgForm }, showSpeed, function () {
            prevScrollTop = $('#message-form').scrollTop();
        });
    }
    else {
        prevScrollTop = messageDiv.offset().top - $('#message-form').offset().top + $('#message-form').scrollTop() + moreHeightthanMsgForm;
    }
}

function joinRoomAndGetMessage() {
    io.socket.get('/message', function (messageData, jwres) {
        var messageTotal = messageData.messageTotal;
        var messages = messageData.messages;
        $('#message-form').empty();
        for (var i = 0; i < messageTotal; i++) {
            addNewMessage(messages[i].nickName, messages[i].time, messages[i].msg, 50);
        }
    });
}
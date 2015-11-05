$('#register').click(function(){
    $.ajax({
        url: '/user',
        type: 'post',
        data: {
            loginName:$('#registerForm').find('input[name=loginName]').val(),
            nickName:$('#registerForm').find('input[name=nickName]').val(),
            password:$('#registerForm').find('input[name=password]').val()
        },
        error: function(req, err) {
            alert(err);
        },
        success: function(resData) {
            $('#welcome').text('Hello ' + resData.nickName + ' ~');
            $('#nickName').val(resData.nickName);
            io.socket.get('/message');
        }
    });
});

$('#send').click(function(){
    io.socket.post('/message', {msg:$('#msg').val(),nickName:$('#nickName').val()});
});

$('#login').click(function(){
    $.ajax({
        url: '/session',
        type: 'post',
        data: {
            loginName:$('#loginForm').find('input[name=loginName]').val(),
            password:$('#loginForm').find('input[name=password]').val()
        },
        error: function(req, err) {
            alert(err);
        },
        success: function(resData) {
            $('#welcome').text('Hello ' + resData.nickName + ' ~');
            $('#nickName').val(resData.nickName);
            io.socket.get('/message');
        }
    });
});

// (function(){
    
//     io.socket.on('message', function(data){
//         $('body').append('<p>' + data.nickName + " : " + data.msg + '<p>');
//     })
    
//     $.ajax({
//         url: '/session',
//         type: 'get',
//         error: function(req, err) {
//             // alert(err);
//         },
//         success: function(resData) {
//             $('#welcome').text('Hello ' + resData.nickName + ' ~');
//             $('#nickName').val(resData.nickName);
//             io.socket.get('/message');
//         }
//     });
// })();

/**
 * 页面初始化显示
 */
$(document).ready(function () {
    $('.body').height($(window).height() - $('.header').height() - 23);
    $('.message-form').height($('.body').height() - $('.input-form').height());
    $('.input-area').width($('.input-form').width() - parseInt($('.input-area').css('padding-right')) - parseInt($('.input-area').css('padding-left')));
});
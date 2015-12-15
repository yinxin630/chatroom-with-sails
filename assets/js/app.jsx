React.render(<MainForm />, document.getElementById('main'));

io.socket.on('connect', function connectServer() {
    io.socket.post('/socket', { nickName: store.nickName }, function (resData, jwres) {
        if (jwres.statusCode == 400) {
            store.nickName += '_';
            console.log(resData);
            connectServer();
            return;
        }

        store.nickName = resData.nickName;
        PubSub.publish('change-nickname', {nickName: store.nickName});

        store.messages = [];
        var messagesTotal = resData.messagesTotal;
        var messages = resData.messages;
        for (var i = 0; i < messagesTotal; i++) {
            store.messages.push({
                type: 'message',
                nickName: messages[i].nickName, 
                time: messages[i].time, 
                msg: handleMessageSymble(messages[i].msg), 
                left: messages[i].nickName !== store.nickName,
            });
        }
        PubSub.publish('messages-update', {messages: store.messages});
    })
});

io.socket.on('message', function (msgData) {
    store.messages.push({
        type: 'message',
        nickName: msgData.nickName,
        msg: handleMessageSymble(msgData.msg),
        time: msgData.time,
        left: msgData.nickName !== store.nickName,
    });
    PubSub.publish('messages-update', {messages: store.messages});
});

io.socket.on('systemMessage', function (msgData) {
    store.messages.push({
        type: 'system',
        msg: handleMessageSymble(msgData.msg),
    });
    PubSub.publish('messages-update', {messages: store.messages});
});

io.socket.on('user-list', function (msgData) {
    var msg = '在线用户:\n';
    msgData.users.map(function(user) {
        msg += user + '\n';
    });
    store.messages.push({
        type: 'message',
        nickName: '系统消息',
        msg: handleMessageSymble(msg),
        time: msgData.time,
        left: true,
    });
    PubSub.publish('messages-update', {messages: store.messages});
});

io.socket.on('change-nick', function (resData) {
    store.nickName = resData.nickName;
    PubSub.publish('change-nickname', {nickName: store.nickName});
});

PubSub.subscribe('setting-ok-button-click', function changeNickname(event, data) {
    io.socket.put('/user', { nickName: data.nickName }, function (resData, jwres) {
        if (jwres.statusCode == 400) {
            data.nickName += '_';
            changeNickname(event, data);
            return;
        }
        
        store.nickName = resData.nickName;
        PubSub.publish('change-nickname', {nickName: store.nickName});
        PubSub.publish('close-setting-form', {});
    });
});

// 消息过滤包装函数
function handleMessageSymble(msg) {
    return filterUrl(filterExpression(filterBlankSymbol(msg)));
}
// 空白符转义
function filterBlankSymbol(msg) {
    msg = msg.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u0085\u2029)/g, '<br>');
    msg = msg.replace(/  /g, '&nbsp');
    msg = msg.replace(/\t/g, '&nbsp&nbsp');
    return msg;
}

// URL转义
function filterUrl(msg) {
    var strRegex = /(https?:\/\/)([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\'\" ])*)/g;
    var re = new RegExp(strRegex);
    msg = msg.replace(re, function (a, b, c) {
        return '<a href="http://' + c + '" target="_blank">' + a + '</a>';
    });
    return msg;
}

// 表情转义
function filterExpression(msg) {
    var strRegex = /#\([0-9]+?\)/g;
    var re = new RegExp(strRegex);
    msg = msg.replace(re, function (a, b, c) {
        return '<img src="../images/expression/' + a.slice(2, a.length - 1) + '.png" style="width:30px;vertical-align: text-bottom;" onerror="this.style.display=\'none\'"></img>';
    });
    return msg;
}
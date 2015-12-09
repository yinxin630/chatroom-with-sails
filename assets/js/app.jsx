React.render(<MainForm />, document.getElementById('main'));

io.socket.on('connect', function connectServer() {
    io.socket.post('/socket', { nickName: store.nickName }, function (resData, jwres) {
        if (jwres.statusCode == 500) {
            store.nickName += '_';
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
                msg: messages[i].msg, 
                left: messages[i].nickName !== store.nickName,
            });
        }
        PubSub.publish('message', {messages: store.messages});
    })
});

io.socket.on('message', function (msgData) {
    store.messages.push({
        type: 'message',
        nickName: msgData.nickName,
        msg: msgData.msg,
        time: msgData.time,
        left: msgData.nickName !== store.nickName,
    });
    PubSub.publish('message', {messages: store.messages});
});

io.socket.on('systemMessage', function (msgData) {
    store.messages.push({
        type: 'system',
        msg: msgData.msg,
    });
    PubSub.publish('message', {messages: store.messages});
});

io.socket.on('user-list', function (msgData) {
    var msg = '在线用户:\n';
    msgData.users.map(function(user) {
        msg += user + '\n';
    });
    store.messages.push({
        type: 'message',
        nickName: '系统消息',
        msg: msg,
        time: msgData.time,
        left: true,
    });
    PubSub.publish('message', {messages: store.messages});
});

io.socket.on('change-nick', function (resData) {
    store.nickName = resData.nickName;
    PubSub.publish('change-nickname', {nickName: store.nickName});
});

PubSub.subscribe('setting-ok-button-click', function changeNickname(event, data) {
    io.socket.put('/user', { nickName: data.nickName }, function (resData, jwres) {
        if (jwres.statusCode == 500) {
            data.nickName += '_';
            changeNickname(event, data);
            return;
        }
        
        store.nickName = resData.nickName;
        PubSub.publish('change-nickname', {nickName: store.nickName});
        PubSub.publish('close-setting-form', {});
    });
});
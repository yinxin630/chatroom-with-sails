var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');
var SecurityUtil = require('../util/SecurityUtil');

var messageCache = [];

var commands = {
    list: function (options, res) {
        return users = User.find().then(function (userResults) {
            var messageData = {
                users: userResults.map(function (user) { return user.nickName; }),
                time: new Date().toTimeString().slice(0, 8),
            }
            sails.sockets.emit(sails.sockets.id(options.socket), 'user-list', messageData);
            return null;
        });
    },

    nick: function (options, res) {
        var nickName = options.msg.split(' ')[1].trim() || '';
        return User.findOne({ socketId: options.socket.id }).exec(function (err, userResult) {
            if (err) {
                sails.log(err.toString());
                return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
            }
            else if (!userResult) {
                return ResponseUtil.responseNotFound(ConstantUtil.USER_NOT_EXISTS, res);
            }

            if (nickName == '' || nickName == userResult.nickName) {
                var resData = {
                    nickName: userResult.nickName,
                }
                return ResponseUtil.responseOk(resData, res);
            }

            var oldNickName = userResult.nickName;
            userResult.nickName = nickName;
            return userResult.save(function (err, newUserResult) {
                if (err) {
                    sails.log(err);
                    return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
                }
                
                options.session.nickName = nickName;
                var resData = {
                    nickName: nickName,
                }
                sails.sockets.emit(sails.sockets.id(options.socket), 'change-nick', resData);
                sails.sockets.broadcast(ConstantUtil.DEFAULT_ROOM, 'systemMessage', { msg: oldNickName + ' 改名为 ' + nickName });
                return ResponseUtil.responseOk(resData, res);
            });
        });
    },
};

module.exports = {
    create: function (options, res) {
        var room = sails.sockets.socketRooms(options.socket)['1'];
        if (room != ConstantUtil.DEFAULT_ROOM) {
            return ResponseUtil.responseBadRequest(ConstantUtil.NOT_JOINED_ROOM, res);
        }

        if (options.msg.startsWith('/')) {
            var command = options.msg.slice(1, options.msg.length).split(' ')[0];

            if (commands.hasOwnProperty(command)) {
                return commands[command](options, res);
            }
        }

        var messageData = {
            msg: SecurityUtil.xssFilter(options.msg),
            nickName: options.nickName,
            time: new Date().toTimeString().slice(0, 8),
        }
        sails.sockets.broadcast(ConstantUtil.DEFAULT_ROOM, 'message', messageData);
        messageCache.push(messageData);
        if (messageCache.length > 50) {
            messageCache.shift();
        }
        return ResponseUtil.responseOk(ConstantUtil.SEND_MESSAGE_SUCCESS, res);
    },

    getMessageCache: function () {
        return messageCache;
    },
}
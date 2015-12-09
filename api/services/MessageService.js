var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');
var SecurityUtil = require('../util/SecurityUtil');

var messageCache = [];

var commands = {
    list: function (socket, res) {
        return users = User.find().then(function (userResults) {
            var messageData = {
                users: userResults.map(function (user) { return user.nickName; }),
                time: new Date().toTimeString().slice(0, 8),
            }
            sails.log.info('send list');
            sails.sockets.emit(sails.sockets.id(socket), 'user-list', messageData);
            return null;
        });
    }
};

module.exports = {
    create: function (options, res) {
        var room = sails.sockets.socketRooms(options.socket)['1'];
        if (room != ConstantUtil.DEFAULT_ROOM) {
            return ResponseUtil.responseBadRequest(ConstantUtil.NOT_JOINED_ROOM, res);
        }

        if (options.msg.startsWith('/')) {
            var command = options.msg.slice(1, options.msg.length);

            if (commands.hasOwnProperty(command)) {
                return commands[command](options.socket, res);
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
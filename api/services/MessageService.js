var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');
var SecurityUtil = require('../util/SecurityUtil');

var messageCache = [];

var commands = {
    list: function () {
        var users = User.find().then(function (userResults) {
            return userResults;
        });
        return {
            users: users,
        };
    }
};

module.exports = {
    create: function (options, res) {
        var room = sails.sockets.socketRooms(options.socket)['1'];
        if (room != ConstantUtil.DEFAULT_ROOM) {
            return ResponseUtil.responseBadRequest(ConstantUtil.NOT_JOINED_ROOM, res);
        }

        if (options.msg[0] === '/') {
            var command = options.msg.slice(1, options.msg.length);

            sails.log.info(command, commands.hasOwnProperty(command));
            if (commands.hasOwnProperty(command)) {
                console.log(commands[command]());
                //return ResponseUtil.responseOk(commands[command], res);
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
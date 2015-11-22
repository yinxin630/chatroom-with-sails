var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');
var SecurityUtil = require('../util/SecurityUtil');

var messageCache = [];

module.exports = {
    create: function (options, res) {
        var room = sails.sockets.socketRooms(options.socket)['1'];
        if (room != ConstantUtil.DEFAULT_ROOM) {
            return ResponseUtil.responseBadRequest(ConstantUtil.NOT_JOINED_ROOM, res);
        }

        var messageData = {
            msg: SecurityUtil.xssFilter(options.msg),
            nickName: options.nickName,
            time: new Date().toTimeString(),
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
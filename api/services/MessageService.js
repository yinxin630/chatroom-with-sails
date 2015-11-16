var ResponseUtil = require('../util/ResponseUtil');
var ResponseInfo = require('../util/ResponseInfo');
var SecurityUtil = require('../util/SecurityUtil');

var DEFAULT_ROOM = 'default'
var messageCache = [];

module.exports = {
    create: function (req, res) {
        if (!req.isSocket) {
            return ResponseUtil.responseBadRequest(ResponseInfo.USE_SOCKET, res);
        }
        var room = sails.sockets.socketRooms(req.socket)['1'];
        if (room != DEFAULT_ROOM) {
            return ResponseUtil.responseBadRequest(ResponseInfo.NOT_JOINED_ROOM, res);
        }

        var messageData = {
            msg: SecurityUtil.xssFilter(req.param('msg')),
            nickName: req.param('nickName'),
            time: new Date().toLocaleTimeString(),
        }
        sails.sockets.broadcast(DEFAULT_ROOM, 'message', messageData);
        messageCache.push(messageData);
        if (messageCache.length > 50) {
            messageCache.shift();
        }
        return ResponseUtil.responseOk(ResponseInfo.SEND_MESSAGE_SUCCESS, res);
    },

    find: function (req, res) {
        if (!req.isSocket) {
            return ResponseUtil.responseBadRequest(ResponseInfo.USE_SOCKET, res);
        }
        sails.sockets.join(req.socket, DEFAULT_ROOM);
        var resData = {
            messageTotal: messageCache.length,
            messages: messageCache
        }
        return ResponseUtil.responseOk(resData, res);
    }
}
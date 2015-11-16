var ResponseUtil = require('../util/ResponseUtil');
var ResponseInfo = require('../util/ResponseInfo');
var SecurityUtil = require('../util/SecurityUtil');

var DEFAULT_ROOM = 'default'

module.exports = {
    create: function (req, res) {
        if (!req.isSocket) {
            return ResponseUtil.responseBadRequest(ResponseInfo.USE_SOCKET, res);
        }
        var room = sails.sockets.socketRooms(req.socket)['1'];
        if (room != DEFAULT_ROOM) {
            return ResponseUtil.responseBadRequest(ResponseInfo.NOT_JOINED_ROOM, res);
        }

        var msg = SecurityUtil.xssFilter(req.param('msg'));
        var nickName = req.param('nickName');
        sails.sockets.broadcast(DEFAULT_ROOM, 'message', { msg: msg, nickName: nickName });
        return ResponseUtil.responseOk(ResponseInfo.SEND_MESSAGE_SUCCESS, res);
    },

    find: function (req, res) {
        if (!req.isSocket) {
            return ResponseUtil.responseBadRequest(ResponseInfo.USE_SOCKET, res);
        }
        sails.sockets.join(req.socket, DEFAULT_ROOM);
        return ResponseUtil.responseOk(ResponseInfo.JOIN_ROOM_SUCCESS, res);
    }
}
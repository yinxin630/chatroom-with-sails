var ResponseUtil = require('../util/ResponseUtil');
var ResponseInfo = require('../util/ResponseInfo');

module.exports = {
    create: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest(ResponseUtil.getBadRequest(ResponseInfo.USE_SOCKET));
        }
        var roomName = sails.sockets.socketRooms(req.socket)['1'];
        if (roomName != 'default') {
            return res.badRequest(ResponseUtil.getBadRequest(ResponseInfo.NOT_JOINED_ROOM));
        }
        
        var msg = req.param('msg').replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var nickName = req.param('nickName');
        sails.sockets.broadcast('default', 'message', { msg: msg, nickName: nickName});
        return res.ok(ResponseUtil.getOk(ResponseInfo.SEND_MESSAGE_SUCCESS));
    },
    
    find: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest(ResponseUtil.getBadRequest(ResponseInfo.USE_SOCKET));
        }
        sails.sockets.join(req.socket, 'default');
        return res.ok(ResponseUtil.getOk(ResponseInfo.JOIN_ROOM_SUCCESS));
    }
}
var ResponseUtil = require('../util/ResponseUtil');

module.exports = {
    create: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest(ResponseUtil.getBadRequest('Please use the socket to access this interface.'));
        }
        var roomName = sails.sockets.socketRooms(req.socket)['1'];
        if (roomName != 'default') {
            return res.badRequest(ResponseUtil.getBadRequest('You have not joined the room.'));
        }
        
        var msg = req.param('msg');
        var nickName = req.param('nickName');
        sails.sockets.broadcast('default', 'message', { msg: msg, nickName: nickName});
        return res.ok(ResponseUtil.getOk('Send message success.'));
    },
    
    find: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest(ResponseUtil.getBadRequest('Please use the socket to access this interface.'));
        }
        var roomName = sails.sockets.socketRooms(req.socket)['1'];
        if (roomName != 'default') {
            return res.badRequest(ResponseUtil.getBadRequest('You have not joined the room.'));
        }
        
        sails.sockets.join(req.socket, 'default');
        return res.ok(ResponseUtil.getOk('Join room success.'));
    }
}
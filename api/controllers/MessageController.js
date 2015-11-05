/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest('please request this interface with socket.');
        }
        var room = sails.sockets.socketRooms(req.socket)['1'];
        if (room != 'default') {
            return res.badRequest('you had not joined room.');
        }
        var msg = req.param('msg');
        var nickName = req.param('nickName');
        sails.sockets.broadcast('default', 'message', { msg: msg, nickName: nickName});
        sails.log('message broadcast.');
        return res.ok('send message success.');
    },
    
    find: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest('please request this interface with socket');
        }
        if (JSON.stringify(sails.sockets.socketRooms(req.socket)) == 'default') {
            return res.badRequest('you had joined room');
        }
        sails.sockets.join(req.socket, 'default');
        return res.ok('join room success.');
    }
};


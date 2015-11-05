/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        if (!req.isSocket) {
            res.badRequest('please request this interface with socket.');
        }
        if (JSON.stringify(sails.sockets.socketRooms(req.socket)) != 'default') {
            res.badRequest('you had not joined room.');
        }
        var msg = req.param('msg');
        sails.boradcast('default', 'message', { msg: msg });
        res.ok('send message success.');
    },
    
    find: function (req, res) {
        if (!req.isSocket) {
            res.badRequest('please request this interface with socket');
        }
        if (JSON.stringify(sails.sockets.socketRooms(req.socket)) == 'default') {
            res.badRequest('you had joined room');
        }
        sails.sockets.join(req.socket, 'default');
        res.ok('join room success.');
    }
};


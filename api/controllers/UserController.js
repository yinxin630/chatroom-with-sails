/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    test: function (req, res) {
        sails.log.info("in test");
        if (req.isSocket) {
            sails.sockets.emit(req.socket, 'message', '');
            sails.log.info('send "message" to req.');
        }
        res.ok();
    }
};


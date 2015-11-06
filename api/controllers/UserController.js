/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    update: function (req, res) {
        var session = req.session;
        var nickName = req.param('nickName', '');
        UserService.update(session, nickName, res);
    },
};


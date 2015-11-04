/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var loginName = req.param('loginName');
        var nickName = req.param('nickName', '');
        var password = req.param('password');
        UserService.create(loginName, nickName, password, res);
    },
    
    update: function (req, res) {
        var loginName = req.param('loginName');
        var nickName = req.param('nickName', '');
        UserService.update(loginName, nickName, res);
    },
};


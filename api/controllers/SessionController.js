/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var session = req.session;
        var loginName = req.param('loginName');
        var password = req.param('password');
        SessionService.create(session, loginName, password, res);
    },
    
    destroy: function (req, res) {
        var session = req.session;
        SessionService.destroy(session, res);
    }
};


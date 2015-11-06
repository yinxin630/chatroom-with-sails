/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var session = req.session;
        var nickName = req.param('nickName');
        SessionService.create(session, nickName, res);
    },
    
    destroy: function (req, res) {
        var session = req.session;
        SessionService.destroy(session, res);
    },
    
    find: function (req, res) {
        var session = req.session;
        SessionService.find(session, res);
    }
};
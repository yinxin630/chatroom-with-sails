/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var session = req.session;
        SessionService.create(session, res);
    },
    
    destroy: function (req, res) {
        var session = req.session;
        SessionService.destroy(session, res);
    },
    
    find: function (req, res) {
        var session = req.session || undefined;
        res.ok({ session: session });
    }
};


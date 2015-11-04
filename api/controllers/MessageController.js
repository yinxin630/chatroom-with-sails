/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var msg = req.param('msg');
        var session = req.session;
        sails.log.info(session.user);
        sails.log.info(msg);
        res.ok();
    },
    
    find: function (req, res) {
        
    }
};


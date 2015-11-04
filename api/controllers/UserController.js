/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    test: function (req, res) {
        sails.log(req.isSocket);
        sails.log.info("test");
        res.ok();
    }
};


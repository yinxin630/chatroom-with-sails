/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        MessageService.create(req, res);
    },
    
    find: function (req, res) {
        MessageService.find(req, res);
    }
};


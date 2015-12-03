/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) { 
		var options = {
			nickName: req.param('nickName', ''),
            socket: req.socket,
			session: req.session,
		}
		SessionService.create(options, res);
	},
	
	destroy: function (req, res) {
		var options = {
            socket: req.socket,
			session: req.session,
		}
		SessionService.destroy(options, res);
	}
};


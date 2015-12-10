/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * 修改昵称
     * @param nickName 修改后的昵称
     */
    update: function (req, res) {
        var options = {
            nickName: req.param('nickName', ''),
            socket: req.socket,
            session: req.session,
        }
        UserService.update(options, res);
    },
};


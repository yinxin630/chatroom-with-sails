/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * 发送消息到所有用户
     * @param msg 要发送的消息
     * @param nickName 发送此消息的用户昵称
     */
    create: function (req, res) {
        var options = {
            socket: req.socket,
            session: req.session,
            msg: req.param('msg', ''),
            nickName: req.param('nickName', ''),
        }
        MessageService.create(options, res);
    },
};


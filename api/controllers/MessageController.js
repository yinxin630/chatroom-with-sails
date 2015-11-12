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
        MessageService.create(req, res);
    },
    
    /**
     * 开始获取房间消息
     */
    find: function (req, res) {
        MessageService.find(req, res);
    }
};


/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * 创建Session信息及相应User信息
     * @param nickName 用户的昵称
     */
    create: function (req, res) {
        var session = req.session;
        var nickName = req.param('nickName', '');
        SessionService.create(session, nickName, res);
    },
    
    /**
     * 注销Session并删除用户信息
     */
    destroy: function (req, res) {
        var session = req.session;
        SessionService.destroy(session, res);
    },
    
    /**
     * 获取Session相对应的信息，若存在则返回User信息
     */
    find: function (req, res) {
        var session = req.session;
        SessionService.find(session, res);
    }
};
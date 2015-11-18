var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');

module.exports = {
    create: function (options, res) {
        if (options.nickName == '') {
            options.nickName = '游客' + Math.round(Math.random() * 100000);
        }

        User.create({ nickName: options.nickName, socketId: options.socket.id }).exec(function (err, userResult) {
            if (err) {
                sails.log(err);
                return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
            }

            sails.sockets.join(options.socket, ConstantUtil.DEFAULT_ROOM);
            var messageCache = MessageService.getMessageCache();
            var resData = {
                nickName: userResult.nickName,
                messagesTotal: messageCache.length,
                messages: messageCache,
            };
            return ResponseUtil.responseCreated(resData, res);
        });
    },

    destroy: function (options, res) {
        User.destroy({ socketId: options.socket.id }).exec(function (err, userResult) {
            if (err) {
                sails.log(err);
                return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
            }
            sails.sockets.leave(options.socket, ConstantUtil.DEFAULT_ROOM);
            return ResponseUtil.responseDeleted(ConstantUtil.DESTROY_SESSION_SUCCESS, res);
        });
    }
}
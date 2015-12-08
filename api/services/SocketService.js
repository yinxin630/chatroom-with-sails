var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');

module.exports = {
    create: function (options, res) {
        if (options.nickName == '') {
            options.nickName = '游客' + Math.round(Math.random() * 100000);
        }

        User.create({ nickName: options.nickName, socketId: options.socket.id }).exec(function (err, userResult) {
            if (err) {
                sails.log(err.toString());
                return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
            }

            var messageCache = MessageService.getMessageCache();
            var resData = {
                nickName: userResult.nickName,
                messagesTotal: messageCache.length,
                messages: messageCache,
            };
            sails.sockets.join(options.socket, ConstantUtil.DEFAULT_ROOM);
            return ResponseUtil.responseCreated(resData, res);
        });
    },

    destroy: function (socket) {
        User.destroy({ socketId: socket.id }).exec(function (err, userResults) {
            if (err) {
                sails.log(err);
                return;
            }
            if (userResults.length == 0) {
                return;
            }
            sails.sockets.leave(socket, ConstantUtil.DEFAULT_ROOM);
        });
    }
}
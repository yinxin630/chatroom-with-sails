var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');

module.exports = {
    create: function (options, res) {
        if (options.nickName == '') {
            options.nickName = options.session.nickName || ('游客' + Math.round(Math.random() * 100000));
        }

        return User.create({ nickName: options.nickName.trim(), socketId: options.socket.id }).then(function (userResult) {
            var messageCache = MessageService.getMessageCache();
            var resData = {
                nickName: userResult.nickName,
                messagesTotal: messageCache.length,
                messages: messageCache,
            };
            sails.sockets.join(options.socket, ConstantUtil.DEFAULT_ROOM);
            return ResponseUtil.responseCreated(resData, res);
        }).catch(function (err) {
            sails.log.error('On socket create interface, catch:\n', err);
            if (err.message.indexOf('A record with that `nickName` already exists') >= 0) {
                return ResponseUtil.responseBadRequest(ConstantUtil.NICK_ALREADY_EXISTS, res);
            }
            return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
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
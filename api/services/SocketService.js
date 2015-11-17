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
            
            sails.socket.join(options.socket, ConstantUtil.DEFAULT_ROOM);
            var resData = {
                nickName: userResult.nickName,
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
            sails.socket.leave(options.socket, ConstantUtil.DEFAULT_ROOM);
            return ResponseUtil.responseDeleted(ConstantUtil.DESTROY_SESSION_SUCCESS, res);
        });
    }
}
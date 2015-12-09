var ResponseUtil = require('../util/ResponseUtil')
var ConstantUtil = require('../util/ConstantUtil');

module.exports = {
    update: function (options, res) {
        User.findOne({ socketId: options.socket.id }).exec(function (err, userResult) {
            if (err) {
                sails.log(err.toString());
                return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
            }
            else if (!userResult) {
                return ResponseUtil.responseNotFound(ConstantUtil.USER_NOT_EXISTS, res);
            }

            options.nickName = options.nickName.trim();
            if (options.nickName == '' || options.nickName == userResult.nickName) {
                var resData = {
                    nickName: userResult.nickName,
                }
                return ResponseUtil.responseOk(resData, res);
            }

            var oldNickName = userResult.nickName;
            userResult.nickName = options.nickName;
            userResult.save(function (err, newUserResult) {
                if (err) {
                    sails.log(err);
                    return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
                }
                var resData = {
                    nickName: options.nickName,
                }
                sails.sockets.broadcast(ConstantUtil.DEFAULT_ROOM, 'systemMessage', { msg: oldNickName + ' 改名为 ' + options.nickName});
                return ResponseUtil.responseOk(resData, res);
            });
        });
    },
}
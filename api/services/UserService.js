var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');

module.exports = {
    update: function (options, res) {
        return User.findOne({ socketId: options.socket.id }).then(function (userResult) {
            if (!userResult) {
                throw new Error('can not find user by socket ID');
            }

            return this.changeNickname(userResult, options.nickName, function (oldNickName) {
                var resData = {
                    nickName: options.nickName,
                }
                sails.sockets.broadcast(ConstantUtil.DEFAULT_ROOM, 'systemMessage', { msg: oldNickName + ' 改名为 ' + options.nickName });
                return ResponseUtil.responseOk(resData, res);
            });
        }.bind(this)).catch(function (err) {
            sails.log.error('On user update interface, catch:\n', err);
            if (err.message === 'can not find user by socket ID') {
                return ResponseUtil.responseBadRequest(ConstantUtil.USE_SOCKET, res);
            }
            else if (err.message.indexOf('A record with that `nickName` already exists') >= 0) {
                return ResponseUtil.responseBadRequest(ConstantUtil.NICK_ALREADY_EXISTS, res);
            }
            return ResponseUtil.responseServerError(ConstantUtil.SERVER_ERROR, res);
        });
    },

    changeNickname: function (user, newNickname, callback) {
        newNickname = newNickname.trim();
        if (newNickname == '' || newNickname == user.nickName) {
            return user.nickName;
        }

        var oldNickName = user.nickName;
        user.nickName = newNickname;
        return user.save().then(function (changedUserResult) {
            return callback(oldNickName);
        }).catch(function (err) {
            sails.log.error('On changeNicakname function catch:\n', err);
            return callback(undefined);
        });
    }
}
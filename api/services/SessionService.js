var ResponseUtil = require('../util/ResponseUtil');
var ConstantUtil = require('../util/ConstantUtil');

module.exports = {
    create: function (options, res) {
		//先判断Session中是否已经包含用户信息
		if (options.session.user) { 
			var user = options.session.user;
			
			if (user.isDisConnect) { 
				user.socket++;
			}
			else {
				user.login++;
				user.socket++;
			}
			
			var messageCache = MessageService.getMessageCache();
			var resData = {
                nickName: user.nickName,
                messagesTotal: messageCache.length,
                messages: messageCache,
            };
            sails.log('老用户加入 ', ' login:', user.login, ' socket', user.socket, ' ', options.session.id);
            sails.sockets.join(options.socket, ConstantUtil.DEFAULT_ROOM);
            return ResponseUtil.responseCreated(resData, res);
		}
		
        if (options.nickName == '') {
            options.nickName = '游客' + Math.round(Math.random() * 100000);
        }

        User.create({ nickName: options.nickName, sessionId: options.session.id }).exec(function (err, userResult) {
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
            
            // sails.sockets.broadcast(ConstantUtil.DEFAULT_ROOM, 'systemMessage', { msg: new Date().toTimeString().slice(0, 8) + ' ' + options.nickName + ' 加入房间' });
            // sails.sockets.join(options.socket, ConstantUtil.DEFAULT_ROOM);
            
            sails.log('新用户加入 ', options.session.id);
            options.session.user = {
                nickName: userResult.nickName,
                login: 1,
                socket: 1,
            };
            sails.log(options.session);
            
            return ResponseUtil.responseCreated(resData, res);
        });
    },

    destroy: function (options, res) {
        // var user = options.session.user;
        sails.log('用户注销 ', options.session.id);
        sails.log(options.session);
        // user.login--;
        // sails.log('用户注销 ', ' login:', user.login, ' socket', user.socket, ' ', options.session.id);
        return ResponseUtil.responseDeleted(ConstantUtil.DESTROY_SESSION_SUCCESS, res);
    }
}
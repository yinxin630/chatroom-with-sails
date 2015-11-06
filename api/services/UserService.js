var ResponseUtil = require('../util/ResponseUtil')

module.exports = {
    update: function (session, nickName, res) {
        nickName = nickName.slice(0, 16);
        Session.findOne({ sessionId: session.id }).populate('user').exec(function (err, sessionResult) {
            if (err) {
                sails.log(err);
                return res.serverError(ResponseUtil.getInternalServerError('A server error occurred , please contact yinxin630@gmail.com.'));
            }
            else if (!sessionResult) {
                var resData = ResponseUtil.getNotFound('Session not exists.');
                return res.notFound(resData);
            }
            
            sessionResult.user.nickName = nickName;
            sessionResult.user.save(function (err, userResult) {
                if (err) {
                    sails.log(err);
                    return res.serverError(ResponseUtil.getInternalServerError('A server error occurred , please contact yinxin630@gmail.com.'));
                }
                var resData = ResponseUtil.getOk('Nick has been modified.');
                resData.datas = {
                    nickName: userResult.nickName,
                }
                return res.ok(resData);
            });
        });
    }
}
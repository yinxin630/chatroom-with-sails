var ResponseUtil = require('../util/ResponseUtil')
var ResponseInfo = require('../util/ResponseInfo');

module.exports = {
    update: function (session, nickName, res) {
        Session.findOne({ sessionId: session.id }).populate('user').exec(function (err, sessionResult) {
            if (err) {
                sails.log(err);
                return ResponseUtil.responseServerError(ResponseInfo.SERVER_ERROR, res);
            }
            else if (!sessionResult) {
                return ResponseUtil.responseNotFound(ResponseInfo.SESSION_NOT_EXISTS, res);
            }
            
            if (nickName == '') {
                var resData = {
                    nickName: sessionResult.user.nickName,
                }
                return ResponseUtil.responseOk(resData, res);
            }
            
            sessionResult.user.nickName = nickName;
            sessionResult.user.save(function (err, userResult) {
                if (err) {
                    sails.log(err);
                    return ResponseUtil.responseServerError(ResponseInfo.SERVER_ERROR, res);
                }
                var resData = {
                    nickName: userResult.nickName,
                }
                return ResponseUtil.responseOk(resData, res);
            });
        });
    }
}
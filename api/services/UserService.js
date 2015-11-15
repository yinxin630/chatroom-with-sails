var ResponseUtil = require('../util/ResponseUtil')
var ResponseInfo = require('../util/ResponseInfo');

module.exports = {
    update: function (session, nickName, res) {
        Session.findOne({ sessionId: session.id }).populate('user').exec(function (err, sessionResult) {
            if (err) {
                sails.log(err);
                return res.serverError(ResponseUtil.getInternalServerError(ResponseInfo.SERVER_ERROR));
            }
            else if (!sessionResult) {
                var resData = ResponseUtil.getNotFound(ResponseInfo.SESSION_NOT_EXISTS);
                return res.notFound(resData);
            }
            
            if (nickName == '') {
                var resData = ResponseUtil.getOk(ResponseInfo.NICK_MODIFIED_SUCCESS);
                resData.datas = {
                    nickName: sessionResult.user.nickName,
                }
                return res.ok(resData);
            }
            
            sessionResult.user.nickName = nickName;
            sessionResult.user.save(function (err, userResult) {
                if (err) {
                    sails.log(err);
                    return res.serverError(ResponseUtil.getInternalServerError(ResponseInfo.SERVER_ERROR));
                }
                var resData = ResponseUtil.getOk(ResponseInfo.NICK_MODIFIED_SUCCESS);
                resData.datas = {
                    nickName: userResult.nickName,
                }
                return res.ok(resData);
            });
        });
    }
}
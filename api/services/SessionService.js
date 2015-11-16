var ResponseUtil = require('../util/ResponseUtil');
var ResponseInfo = require('../util/ResponseInfo');

module.exports = {
    create: function (session, nickName, res) {
        if (nickName == '') {
            nickName = '游客' + Math.round(Math.random() * 100000);
        }
        User.create({ nickName: nickName }).exec(function (err, userResult) {
            if (err) {
                sails.log(err);
                return ResponseUtil.responseServerError(ResponseInfo.SERVER_ERROR, res);
            }
            Session.create({ sessionId: session.id, user: userResult.id }).exec(function (err, sessionResult) {
                if (err) {
                    sails.log(err);
                    return ResponseUtil.responseServerError(ResponseInfo.SERVER_ERROR, res);
                }

                var resData = {
                    nickName: userResult.nickName,
                };
                return ResponseUtil.responseCreated(resData, res);
            })
        });
    },

    destroy: function (session, res) {
        Session.destroy({ sessionId: session.id }).populate('user').exec(function (err, sessionResults) {
            if (err) {
                sails.log(err);
                return ResponseUtil.responseServerError(ResponseInfo.SERVER_ERROR, res);
            }
            else if (sessionResults.length == 0) {
                return ResponseUtil.responseNotFound(ResponseInfo.SESSION_NOT_EXISTS, res);
            }

            User.destroy({ id: sessionResults[0].user.id }).exec(function (err, userResult) {
                if (err) {
                    sails.log(err);
                    return ResponseUtil.responseServerError(ResponseInfo.SERVER_ERROR, res);
                }
                return ResponseUtil.responseDeleted(ResponseInfo.DESTROY_SESSION_SUCCESS, res);
            });
        })
    },

    find: function (session, res) {
        Session.findOne({ sessionId: session.id }).populate('user').exec(function (err, sessionResult) {
            if (err) {
                sails.log(err);
                return ResponseUtil.responseServerError(ResponseInfo.SERVER_ERROR, res);
            }
            else if (!sessionResult) {
                return ResponseUtil.responseNotFound(ResponseInfo.SESSION_NOT_EXISTS, res);
            }

            var resData = {
                nickName: sessionResult.user.nickName,
            };
            return ResponseUtil.responseOk(resData, res);
        })
    }
}
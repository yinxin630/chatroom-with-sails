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
                res.serverError(ResponseUtil.getInternalServerError(ResponseInfo.SERVER_ERROR));
            }
            Session.create({ sessionId: session.id, user: userResult.id }).exec(function (err, sessionResult) {
                if (err) {
                    sails.log(err);
                    res.serverError(ResponseUtil.getInternalServerError(ResponseInfo.SERVER_ERROR));
                }

                var resData = ResponseUtil.getCreate(ResponseInfo.CREATE_SESSION_SUCCESS);
                resData.datas = {
                    nickName: userResult.nickName,
                };
                return res.ok(resData);
            })
        });
    },

    destroy: function (session, res) {
        Session.destroy({ sessionId: session.id }).populate('user').exec(function (err, sessionResults) {
            if (err) {
                sails.log(err);
                res.serverError(ResponseUtil.getInternalServerError(ResponseInfo.SERVER_ERROR));
            }
            else if (sessionResults.length == 0) {
                var resData = ResponseUtil.getNotFound(ResponseInfo.SESSION_NOT_EXISTS)
                return res.notFound(resData);
            }

            User.destroy({ id: sessionResults[0].user.id }).exec(function (err, userResult) {
                if (err) {
                    sails.log(err);
                    res.serverError(ResponseUtil.getInternalServerError(ResponseInfo.SERVER_ERROR));
                }
                
                var resData = ResponseUtil.getOk(ResponseInfo.DESTROY_SESSION_SUCCESS)
                resData.datas = {
                    nickName: userResult.nickName,
                };
                return res.ok(resData);
            });
        })
    },

    find: function (session, res) {
        Session.findOne({ sessionId: session.id }).populate('user').exec(function (err, sessionResult) {
            if (err) {
                sails.log(err);
                res.serverError(ResponseUtil.getInternalServerError(ResponseInfo.SERVER_ERROR));
            }
            else if (!sessionResult) {
                var resData = ResponseUtil.getNotFound(ResponseInfo.SESSION_NOT_EXISTS);
                return res.notFound(resData);
            }

            var resData = ResponseUtil.getOk(ResponseInfo.GET_SESSION_SUCCESS);
            resData.datas = {
                nickName: sessionResult.user.nickName,
            };
            return res.ok(resData);
        })
    }
}
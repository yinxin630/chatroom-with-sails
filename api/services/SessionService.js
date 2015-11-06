var ResponseUtil = require('../util/ResponseUtil');

module.exports = {
    create: function (session, nickName, res) {
        if (nickName == '') {
            nickName = '游客' + Math.round(Math.random() * 100000);
        }
        User.create({ nickName: nickName }).exec(function (err, userResult) {
            if (err) {
                sails.log(typeof (err));
                return res.negotiate(err);
            }
            Session.create({ sessionId: session.id, user: userResult.id }).exec(function (err, sessionResult) {
                if (err) {
                    sails.log(typeof (err));
                    return res.negotiate(err);
                }

                var resData = ResponseUtil.getCreate('Create session success.');
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
                sails.log(typeof (err));
                return res.negotiate(err);
            }
            else if (sessionResults.length == 0) {
                var resData = ResponseUtil.getNotFound('Session not exists.')
                return res.notFound(resData);
            }

            User.destroy({ id: sessionResult.user.id }).exec(function (err, userResult) {
                if (err) {
                    sails.log(typeof (err));
                    return res.negotiate(err);
                }
                
                var resData = ResponseUtil.getOk('Session has been destroyed.')
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
                sails.log(typeof (err));
                return res.negotiate(err);
            }
            else if (!sessionResult) {
                var resData = ResponseUtil.getNotFound('Session not exists.')
                return res.notFound(resData);
            }

            var resData = ResponseUtil.getOk('Get session success.');
            resData.datas = {
                nickName: sessionResult.user.nickName,
            };
            return res.ok(resData);
        })
    }
}
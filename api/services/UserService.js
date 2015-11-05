var resUtil = require('../util/ResponseUtil')

module.exports = {
    create: function (loginName, nickName, password, session, res) {
        User.create({ loginName: loginName, nickName: nickName, password: password }).exec(function (err, record) {
            if (err) {
                return res.negotiate(err);
            }
            var user = {};
            user.nickName = record.nickName;
            session.user = user;
            SessionService.sessionBuffer.push(session.id);
            return res.json(user);
        });
    }
}
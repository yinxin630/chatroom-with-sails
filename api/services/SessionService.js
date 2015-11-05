module.exports = {
    sessionBuffer: [],

    create: function (session, loginName, password, res) {
        if (this.sessionBuffer.indexOf(session.id) < 0) {
            User.findOne({ loginName: loginName }).exec(function (err, record) {
                if (err) {
                    return res.negotiate(err);
                }
                if (record[0].password != password) {
                    return res.badRequest("wrong password.");
                }
                var user = {};
                user.nickName = record[0].nickName;
                session.user = user;
                this.sessionBuffer.push(session.id);
                return res.ok(user);
            });
        }
        return res.ok('user already logged.');
    },

    destroy: function (session, res) {
        var index = -1;
        if ((index = this.sessionBuffer.indexOf(session.id)) < 0) {
            return res.badRequest("you don't logged.");
        }
        this.sessionBuffer.remove(index);
        return res.ok('logout success');
    },
    
    find: function (session, res) {
        var index = -1;
        if ((index = this.sessionBuffer.indexOf(session.id)) < 0) {
            return res.badRequest("you don't logged.");
        }
        return res.ok(session.user);
    }
}
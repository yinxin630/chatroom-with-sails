module.exports = {
    sessionBuffer: [],

    create: function (session, loginName, password, res) {
        User.find({ loginName: loginName }).exec(function (err, record) {
            if (err) {
                return res.negotiate(err);
            }
            if (record.password != password) {
                return res.badRequest("wrong password.");
            }
            session.user = record;
            sessionBuffer.push(session);
            return res.ok();
        });
    },

    destroy: function (session, res) {
        var index = -1;
        if ((index = sessionBuffer.indexOf(session)) < 0) {
            return res.serverError("you don't logged.");
        }
        sessionBuffer.remove(index);
        return res.ok();
    }
}
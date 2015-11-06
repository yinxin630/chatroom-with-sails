module.exports = {
    create: function (session, nickName, res) {
        User.create({ nickName: nickName, session: { id: session.id } }).exec(function (err, record) {
            if (err) {
                res.negotiate(err);
            }
        });
        return res.ok();
    },

    destroy: function (session, res) {
        return res.ok();
    },
    
    find: function (session, res) {
        return res.ok();
    }
}
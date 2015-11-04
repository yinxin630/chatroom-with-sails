module.exports = {
    create: function (loginName, nickName, password, res) {
        User.create({ loginName: loginName, nickName: nickName, password: password }).exec(function (err, record) {
            if (err) {
                return res.badRequest(err);
            }
            return res.json(record);
        });
    },
    
    update: function (loginName, nickName, res) {
        User.update({ loginName: loginName }, { nickName: nickName }).exec(function (err, record) {
            if (err) {
                return res.badRequest(err);
            }
            return res.json(record);
        });
    }
}
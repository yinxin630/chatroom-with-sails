var resUtil = require('../util/ResponseUtil')

module.exports = {
    create: function (loginName, nickName, password, res) {
        User.create({ loginName: loginName, nickName: nickName, password: password }).exec(function (err, record) {
            resUtil.handleCommonResponse(err, record);
        });
    },
    
    update: function (loginName, nickName, res) {
        User.update({ loginName: loginName }, { nickName: nickName }).exec(function (err, record) {
            resUtil.handleCommonResponse(err, record);
        });
    }
}
module.exports = {
    handleCommonResponse: function (err, record) {
        if (err) {
            return res.negotiate(err);
        }
        return res.json(record);
    }
}
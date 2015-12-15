/**
 * HTTP协议标准返回码
 * 200 OK GET获取资源、PUT修改资源
 * 201 Created POST创建资源
 * 204 No Content DELETE删除资源
 * 400 Bad Request 请求包含错误，例如参数错误
 * 403 Forbidden 请求已经收到但是请求者不具备权限
 * 404 Not Found 请求的内容不存在
 * 500 Internal Server Error 服务器存在错误
 */

module.exports = {
    responseOk: function (data, res) {
        res.status(200);
        return res.json(data);
    },

    responseCreated: function (data, res) {
        res.status(201);
        return res.json(data);
    },

    responseDeleted: function (msg, res) {
        res.status(204);
        return res.json({ msg: msg });
    },

    responseBadRequest: function (msg, res) {
        res.status(400);
        return res.json({ msg: msg });
    },

    responseForbidden: function (msg, res) {
        res.status(403);
        return res.json({ msg: msg });
    },

    responseNotFound: function (msg, res) {
        res.status(404);
        return res.json({ msg: msg });
    },

    responseServerError: function (msg, res) {
        res.status(500);
        return res.json({ msg: msg });
    },
}
/**
 * HTTP协议标准返回码
 * 200 OK 请求处理成功并成功返回请求数据
 * 201 Created 请求创建的新资源已处理完成并返回新创建资源数据
 * 204 No Content 请求已被处理但是无需返回信息
 * 400 Bad Request 请求包含错误，例如参数错误
 * 403 Forbidden 请求已经收到但是请求者不具备权限
 * 404 Not Found 请求的内容不存在
 * 500 Internal Server Error 服务器存在错误，请联系服务提供者获取更多信息
 */

module.exports = {
    getOk: function (msg) {
        return { msg: { msg_code: 200, msg_info: msg } };
    },

    getCreate: function (msg) {
        return { msg: { msg_code: 201, msg_info: msg } };
    },

    getNoContent: function () {
        return {};
    },

    getBadRequest: function (msg) {
        return { msg: { msg_code: 400, msg_info: msg } };
    },

    getForbidden: function (msg) {
        return { msg: { msg_code: 403, msg_info: msg } };
    },
    
    getNotFound: function (msg) {
        return { msg: { msg_code: 404, msg_info: msg } };
    },
    
    getInternalServerError: function (msg) {
        return { msg: { msg_code: 500, msg_info: msg } };
    },
}
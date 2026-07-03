class HttpException extends Error {
    constructor(code = 500, msg = "操作失败", data = null,) {
        super();
        this.code = code;
        this.msg = msg;
        this.data = data
    }
}
module.exports = {
    HttpException,
};
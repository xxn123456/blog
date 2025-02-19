module.exports = function (ctx, next) {
    const errorMsg = {
        400: {
            code: "400",
            msg: "参数缺失或者异常"
        },
        403: {
            code: "403",
            msg: "用户无此模块无权限"
        },
        500: {
            code: "500",
            msg: "操作失败"
        },
    }
    // console.log("中间件得到数据",ctx)
    let status = ctx.response.status;
    try {
        if(status!=200){
            ctx.body = {
                code: errorMsg[status].code,
                msg: errorMsg[status].msg
            };
        }
      
    } catch (error) {
        throw (error)
    }
}
const { HttpException } = require("../../middleware/httpException.js")
const request = require('koa2-request');
const gaodeKey = "f563e9be6d035665b6aa46c0d26b29cd"
class sdkController {
    static async queryAdcodeByIp(ctx) {
        let req = ctx.request.body;
        const publicIp = require('public-ip')
        const ip = await publicIp.v4()
        const res = await request.get(`https://restapi.amap.com/v3/ip?ip=${ip}&key=${gaodeKey}`)
        if (!res.body) {
            throw new HttpException("500", "调用高德地图ip归属地api异常", '');
        }
        const info = JSON.parse(res.body)
        if (info.status == "1") {
            // 获取省市区编码
            const adcode = info.adcode
            const weather = await request.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${gaodeKey}`)
            if (!weather.body) {
              throw new HttpException("500", "调用高德地图天气api异常", '');
            }
            const weatherInfo = JSON.parse(weather.body)
            ctx.body = {
                code: 200,
                msg: '查询天气成功',
                data: weatherInfo.lives
            }
        } else {
            throw new HttpException("500", "调用高德地图sdk失败", info);
        }
    }
}

module.exports = sdkController;
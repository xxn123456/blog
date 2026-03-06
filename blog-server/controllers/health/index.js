const Mock = require('mockjs')

const schedule = require('node-schedule')

console.log("模拟放到")
const rule = '*/3 * * * * *';

exports.hisSocket = (io, socket) => {
    socket.on("his", (data) => {
        console.log("服务器接受到消息", data)
    })
    const job = schedule.scheduleJob(rule, () => {
        let hisData = Mock.mock({
            'serverTotal|1': [{
                'x': ["2023", "2024", "2025", "2026", "2027", "2028"],
                'y1|6': ["@integer(30000, 60000)"],
                'y2|6': ["@integer(30000, 60000)"],
                'y3|6': ["@integer(30000, 60000)"],
                'y4|6': ["@integer(30000, 60000)"]
            }],
            'radiation|1': [{
                'x': ["2023", "2024", "2025", "2026", "2027", "2028"],
                'y1|6': ["@integer(10000, 30000)"],
                'y2|6': ["@integer(10000, 30000)"]
            }],
            'ecg|1': [{
                'x': ["2023", "2024", "2025", "2026", "2027", "2028"],
                'y1|6': ["@integer(10000, 30000)"],
                'y2|6': ["@integer(10000, 30000)"]
            }],
            'diagnosisYang|1': [{
                'num': "@integer(1, 30)",
                'total': 1000
            }],
            'diagnosisYing|1': [{
                'num': "@integer(30, 1000)",
                'total': 1000
            }],
            diagnosisRadio: [{
                value: "@integer(30, 1000)",
                name: "阴性",
            },
            {
                value: "@integer(10, 100)",
                name: "阳性",
            },
            {
                value: "@integer(1000, 2000)",
                name: "待检测",
            }],
            'patient|1': [{
                'x': ["门诊", "急诊", "体检", "住院", "其他"],
                'y1|5': ["@integer(1000, 8000)"],
            }],
            orginenters: [100, 200, 300],
            work: {
                one: [
                    {
                        name: "超声诊断数",
                        "sl": "12000",
                    },
                    {
                        name: "超声诊断用户数",
                        "sl":"@integer(2000, 2400)",
                    },
                ],
                two: [
                    {
                        name: "心电诊断数",
                        "sl": "8020",
                    },
                    {
                        name: "心电检测用户数",
                        "sl": "@integer(500, 1000)",
                    },
                ],
                three: [
                    {
                        name: "放射治疗数",
                        "sl": "10110",
                    },
                    {
                        name: "放射治疗用户数",
                        "sl": "@integer(2000, 3000)",
                    },
                ],
                four: [
                    {
                        name: "远程诊断数",
                        "sl": "10200",
                    },
                    {
                        name: "远程诊断用户数",
                        "sl": "@integer(1000, 3000)",
                    },
                ]
            },

            shadowColud: [{
                "name": "江岸区",
                "value": "@integer(1000, 3000)"
            },
            {
                "name": "硚口区",
                "value": "@integer(1000, 3000)"
            },
            {
                "name": "东湖高新区",
                "value": "@integer(1000, 3000)"
            },
            {
                "name": "武昌区",
                "value": "@integer(1000, 3000)"
            },
            {
                "name": "江汉区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "汉阳区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "江岸区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "武昌区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "青山区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "洪山区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "蔡甸区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "江夏区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "黄陂区",
                "value": "@integer(1000, 3000)"
            }, {
                "name": "新洲区",
                "value": "@integer(1000, 3000)"
            },
            {
                "name": "经接开发区",
                "value": "@integer(1000, 3000)"
            },
            {
                "name": "汉南区",
                "value": "@integer(1000, 3000)"
            }
            ],
        });
        socket.emit("his_push", hisData);
    });

    socket.on("disconnect", () => {
        job.cancel();
    })


}
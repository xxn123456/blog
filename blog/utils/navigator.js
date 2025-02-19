
export function detectDevice() {
    // 获取userAgent字符串
    var userAgent = navigator.userAgent || navigator.vendor || window.opera

    // 使用正则表达式来检查userAgent字符串中是否包含某些关键字
    // 这些关键字通常与移动设备相关
    var mobile = /windows phone|iphone|ipad|ipod|android|blackberry|mini|windows ce|palm/i.test(
        userAgent.toLowerCase()
    )

    if (mobile) {
        window.location.href = '/phone'
        return 'mobile'
        // 如果userAgent包含上述关键字之一，则认为是在移动设备上
        console.log('访问设备是移动设备')
    } else {

        return 'pc'
        // 否则，认为是在PC（桌面设备）上
        console.log('访问设备是PC（桌面设备）')

    }

}
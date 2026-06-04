
export function detectDevice() {
    // 获取userAgent字符串
    var userAgent = navigator.userAgent || navigator.vendor || window.opera

    // 使用正则表达式来检查userAgent字符串中是否包含某些关键字
    // 这些关键字通常与移动设备相关
    var mobile = /windows phone|iphone|ipad|ipod|android|blackberry|mini|windows ce|palm/i.test(
        userAgent.toLowerCase()
    )
    if (mobile) {
        return 'mobile'
    } else {
        return 'pc'
    }

}
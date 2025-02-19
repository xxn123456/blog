function Text(x, y, rand,content) {
    this.x = x;
    this.y = y;
    this.rand = rand;
    this.content = content
}
Text.prototype.create = function (_this) {
    let body = document.body;

   
    _this.innerHTML = this.content[this.rand - 1];


    _this.className = 'text'
    _this.style.top = this.y - 20 + 'px'
    _this.style.left = this.x - 50 + 'px'
    _this.style.animation = 'remove 2s'
    body.appendChild(_this);
    let i = 0
    setInterval(() => {
        _this.style.top = this.y - 20 - i + 'px'
        i++
    }, 10);
}
Text.prototype.out = function (_this) {
    _this.remove()
}
//设置随机颜色
Text.prototype.getRandom = function () {
    let allType = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f'; //16进制颜色
    let allTypeArr = allType.split(','); //通过','分割为数组
    let color = '#';
    for (var i = 0; i < 6; i++) {
        //随机生成一个0-16的数
        var random = parseInt(Math.random() * allTypeArr.length);
        color += allTypeArr[random];
    }
    return color; //返回随机生成的颜色
}

export {Text}
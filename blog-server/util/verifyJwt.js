const jwt = require('jsonwebtoken')
const expireTime = '2h'
const jwtUtil = {
    getToken(info) {
        const token = jwt.sign({
            id: info.id,
            user: info.username
        }, '123456', {
            expiresIn: expireTime
        });
        return token
    },
    verify(token) {
        return new Promise((resolve, rejece) => {
            const info = jwt.verify(token.split(' ')[1], "123456");
            resolve(info);
        })
    }
}


module.exports = jwtUtil
const { verify, sign } = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')


function generateJWTToken(data) {
    return sign(data, JWT_SECRET)
}

function validateJWTToken (token) {
    try {
        return verify(token, JWT_SECRET)
    } catch (error) {
        return false
    }
}

module.exports = {
    generateJWTToken, validateJWTToken
}
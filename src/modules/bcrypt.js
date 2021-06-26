const bcrypt = require('bcrypt')
const SALT_SIZE = 10

async function generateHash (data) {
    return await bcrypt.hash(data, bcrypt.genSalt(SALT_SIZE))
}

async function compareHash (data, hash) {
    return await bcrypt.compare(data, hash)
}

module.exports = {
    compareHash, generateHash
}
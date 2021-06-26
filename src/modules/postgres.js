const { Sequelize } = require('sequelize')
const { PG_CONNECTION_STRING } = require('../../config')
const { UserModel } = require('./models')

const sequelize = new Sequelize(PG_CONNECTION_STRING)

async function postgres () {

    let db = {}

    db.users = await UserModel(Sequelize, sequelize)

    await sequelize.authenticate()

    return db
}

module.exports = postgres
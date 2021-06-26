const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const morgan = require('morgan')

const { PORT } = require('../config')
const postgres = require('./modules/postgres')

const server = http.createServer(app)

const io = new Server(server)

async function start () {
    server.listen(PORT)
    let db = await postgres()

    app.use(morgan("dev"))

    

}


start()
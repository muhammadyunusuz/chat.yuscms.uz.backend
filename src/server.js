const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')

const { PORT } = require('../config')
const postgres = require('./modules/postgres')

const server = http.createServer(app)

const io = new Server(server)

async function start () {
    server.listen(PORT)
    let db = await postgres()

    app.use(morgan("dev"))

    app.use(helmet())
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use((req, res, next) => {
        req.db = db
        next()
    })

    const routesPath = path.join(__dirname, "routes")
    const routeFiles = fs.readdir(routesPath, (err, files) => {
        if(err) throw new Error(err)

        files.forEach(file => {
            const routePath = path.join(__dirname, "routes", file)
            const route = require(routePath)
            if(route.router && route.path) {
                app.use(route.path, route.router)
            }
        })
    })



}


start()
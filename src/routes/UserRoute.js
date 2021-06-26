const UserController = require('../controllers/UserController')

const router = require('express').Router()

router.get('/', UserController.UserGetController)

module.exports = {
    router,
    path: "/users"
}
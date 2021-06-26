const UserController = require('../controllers/UserController')

const router = require('express').Router()

router.post('/login', UserController.UserPostLoginController)
router.post('/sign_up', UserController.UserPostSignUpController)

module.exports = {
    router,
    path: "/users"
}
const {
    generateHash,
    compareHash
} = require("../modules/bcrypt")
const {
    generateJWTToken
} = require("../modules/jwt")
const Validations = require("../modules/validation")

module.exports = class UserController {
    static async UserPostLoginController(req, res) {
        try {
            const {
                username,
                password
            } = await Validations.UserSignUpValidation().validateAsync(req.body)

            const user = await req.db.users.findOne({
                where: {
                    user_name: username
                }
            })

            if (!user) throw new Error("User is not defined")

            if (!compareHash(password, user.dataValues.user_password)) throw new Error("Password is incorrect")

            res.status(201).json({
                ok: true,
                token: generateJWTToken(user.dataValues.user_id),
                data: {
                    name: username
                }
            })


        } catch (error) {
            res.status(401).json({
                ok: false,
                message: error + ""
            })
        }
    }
    static async UserPostSignUpController(req, res) {
        try {
            const {
                username,
                password
            } = await Validations.UserSignUpValidation().validateAsync(req.body)

            const user = await req.db.users.create({
                user_password: await generateHash(password),
                user_name: username
            })

            res.status(201).json({
                ok: true,
                token: generateJWTToken(user.dataValues.user_id),
                data: {
                    name: username
                }
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}
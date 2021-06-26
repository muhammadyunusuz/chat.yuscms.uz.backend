module.exports = class UserController {
    static async UserGetController (req, res) {
        res.json({
            ok: "server working"
        })
    }
}
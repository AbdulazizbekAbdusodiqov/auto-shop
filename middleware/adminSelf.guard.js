const errorHandler = require("../helpers/errorHandler")

module.exports = async function (req, res, next) {
    try {

        const id = req.params.id

        if (id != req.admin.id) {
            return res.status(401).send({ message: "Unauthorized" })
        }

        next()

    } catch (error) {
        errorHandler(error, res)
    }
}
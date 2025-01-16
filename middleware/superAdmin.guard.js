const errorHandler = require("../helpers/errorHandler")

module.exports = async function (req, res, next) {
    try {
        
        if (!req.admin.is_creator) {
            return res.status(401).send({ message: "Unauthorized" })
        }

        next()
    } catch (error) {
        errorHandler(error, res)
    }
}
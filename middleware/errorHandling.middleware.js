// const ApiError = require("../errors/apiError");
// const logger = require("../services/logger.service");

module.exports = function (err, req, res, next) {
    // logger.error(err.message)
    // if (err instanceof ApiError) {
    //     return res.status(err.status).send({ message: err.message })
    // }

    if (err instanceof SyntaxError) {
        return res.status(err.status).send({ message: err.message })
    }

    return res.status(500).send({ message: "nazarda tutilmagan xatolik" })
}

import errorHandler from "../helpers/errorHandler.js"

export default async function (req, res, next) {
    try {
        
        if (!req.admin.is_creator) {
            return res.status(401).send({ message: "Unauthorized" })
        }

        next()
    } catch (error) {
        errorHandler(error, res)
    }
}
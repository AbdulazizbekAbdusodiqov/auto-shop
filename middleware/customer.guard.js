import errorHandler from "../helpers/errorHandler.js"
import { CustomerJwt } from "../service/jwt.service.js"

export default async function (req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(401).send({message: "Unauthorized"})
        }
        const [bearer, token] = authorization.split(" ")

        if(bearer !== "Bearer" || !token){
            return res.status(401).send({message: "Unauthorized"})
        }
        try {
            const decoodedToken = await CustomerJwt.verifyAccessToken(token)
            
            req.customer = decoodedToken

        } catch (error) {
            return errorHandler(error, res)
        }
        next()
    } catch (error) {
        errorHandler(error, res)
    }
}
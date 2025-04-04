import errorHandler from "../helpers/errorHandler.js"
import { AdminJwt } from "../service/jwt.service.js"

export default async function (req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(401).send({message: "Unauthorized1"})
        }
        const [bearer, token] = authorization.split(" ")

        if(bearer !== "Bearer" || !token){
            return res.status(401).send({message: "Unauthorized2"})
        }
        try {
            const decoodedToken = await AdminJwt.verifyAccessToken(token)
            
            if(decoodedToken.role != "admin"){
                return res.status(401).send({message: "Unauthorized3"})
            }

            req.admin = decoodedToken

        } catch (error) {
            return errorHandler(error, res)
        }
        next()
    } catch (error) {
        errorHandler(error, res)
    }
}
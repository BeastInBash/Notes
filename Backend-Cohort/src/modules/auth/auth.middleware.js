// auth Middleware
import User from './auth.model.js'
import ApiError from "../../common/utils/api-error.js"
import { verifyAccessToken } from "../../common/utils/jwt.uitls.js"

const isLoggedIn = async (req, _, next) => {
    console.log("Token",req.headers.authorization)
    try {
        if (req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) throw ApiError.unAuthorized("Unauthorization")

            const decoded = verifyAccessToken(token)
            const user = await User.findById(decoded.id)
            if (!user) {
                throw ApiError.unAuthorized("User Not found")
            }
            req.user = {
                id: decoded.id
            }
            next()

        }
    } catch (error) {
        console.log("Error", error.message)
    }
}
export default isLoggedIn

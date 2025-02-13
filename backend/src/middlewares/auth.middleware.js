import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401)
            .json({message: "Unauthorized no token access"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            return res.status(401)
            .json({message: "Unauthorized user"})
        }
        const user = await User.findById(decodedToken?.userId).select("-password")

        if (!user) {
            return res.status(401).json({message: "User not found"})
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in auth middleware: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {protectedRoute}
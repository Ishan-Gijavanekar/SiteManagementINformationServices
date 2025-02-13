import { User } from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import { userToken } from "../utils/tokenGeneration.js"


const registerUser = async(req, res) => {
    try {
        const {username, password, email} = req.body

        if (!username || !password || !email) {
            return res.status(401
                .json({message: "All fields are compulsory"})
            )
        }

        const userExists = await User.findOne({
            $or: [{username}, {email}]
        })

        if (userExists) {
            return res.status(401)
            .json("User already exists")
        }

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        })

        if (newUser) {
            await newUser.save()

            return res.status(200)
            .json({
                newUser,
                message: "User registered successfully"
            })
        } else {
            return res.status(401)
            .json({message: "Problem while storing the data"})
        }

    } catch (error) {
        console.log("Error in register user: ", error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

const login = async(req, res) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

        const userExists = await User.findOne({username})

        if(!userExists) {
            return res.status(200)
            .json({message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
        if (!isPasswordCorrect) {
            return res.status(200)
            .json({message: "Invalid credentials"})
        }

        const token = userToken(userExists._id, res)

        return res.status(200)
        .json({
            user: userExists,
            message: "Login Successfull"
        })

    } catch (error) {
        console.log("Error in login controller: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const logout = async(req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })

        return res.status(200)
        .json({message: "Logged out Successfully"})
    } catch (error) {
        console.log("Error in logout controller")
        return res.status(500).json({message: "Internal server error"})
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(401)
            .json({message: "Some error occured"})
        }
        return res.status(200)
        .json({
            users,
            message: "User fetched successfully"
        })
    } catch (error) {
        console.log("Error in getUsers controller")
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(401)
            .json({message: "Id is required"})
        }
        await User.findByIdAndDelete(id)
        return res.status(200)
        .json({message: "User deleted successfully"})
    } catch (error) {
        console.log("Error in deleteUser controller")
        return res.status(500).json({message: "Internal server error"})
    }
}


export {registerUser, login, logout, getUsers, deleteUser}
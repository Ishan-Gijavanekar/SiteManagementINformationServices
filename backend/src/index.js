import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from './database/connection.js'
import path from 'path'

const __dirname = path.resolve()


const port = process.env.PORT
const app = express()

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE']
}))
app.use(express.json({limit:"20mb"}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true, limit:"20mb"}))


// Routes
import userRoutes from './routes/user.routes.js'
import FormDetailsRoutes from './routes/FormDetails.routes.js'
import StateMasterRoutes from './routes/StateMaster.routes.js'
import FormRightRoutes from './routes/UserRightsForForm.routes.js'


app.use('/api/v1/users', userRoutes)
app.use('/api/v1/FormDetails', FormDetailsRoutes)
app.use("/api/v1/State", StateMasterRoutes)
app.use("/api/v1/FormRights", FormRightRoutes)




if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}



// Server on
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
    connectDb()
})